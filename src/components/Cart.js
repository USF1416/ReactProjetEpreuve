// frontend/src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Cart.css";

const Cart = ({ token }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleRemove = async (product_id) => {
    try {
      await axios.delete(`/api/cart/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (cartItemId, quantity) => {
    try {
      await axios.put(`/api/cart/${cartItemId}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post('/api/cart/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la finalisation de la commande');
    }
  };

  return (
    <div>
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.description} - {item.price} €
                <br />
                Quantité : 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={e => handleUpdate(item.id, e.target.value)} 
                  min="1"
                />
                <button onClick={() => handleRemove(item.id)}>Retirer</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Finaliser la commande</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
