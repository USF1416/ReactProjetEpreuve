import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Cart.css";

const Cart = ({ token }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const handleRemove = async (product_id) => {
    try {
      await axios.delete(`/api/cart/${product_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `/api/cart/${cartItemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "/api/cart/checkout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la finalisation de la commande");
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2>
        🛒 Mon Panier ({totalItems} article{totalItems > 1 ? "s" : ""})
      </h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img
                  src={item.image || "/no-image.png"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>
                  <strong>{item.price} €</strong>
                </p>
                <div className="quantity-control">
                  <button
                    onClick={() => handleUpdate(item.cart_item_id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdate(item.cart_item_id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-section">
            <p>
              <strong>Total à payer : {totalPrice} €</strong>
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Finaliser la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
