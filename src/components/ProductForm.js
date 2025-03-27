// frontend/src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import "../styles/ProductForm.css";

const ProductForm = ({ onSubmit, product }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price, category });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product ? "Modifier Produit" : "Ajouter Produit"}</h2>
      <div>
        <label>Nom : </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description : </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Prix : </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Catégorie : </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit">{product ? "Modifier" : "Ajouter"}</button>
    </form>
  );
};

export default ProductForm;
