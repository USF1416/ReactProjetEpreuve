import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduct(res.data);
      } catch (err) {
        setError("Erreur de récupération du produit.");
        console.error(err);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Vous devez être connecté pour ajouter au panier.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/cart",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'ajout au panier.");
    }
  };

  if (error) return <div>Erreur : {error}</div>;
  if (!product) return <div>Chargement du produit...</div>;

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>
        <strong>Prix :</strong> {product.price} €
      </p>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductDetails;
