import React from "react";
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
  // 1. Grouper les produits par catégorie
  const groupedByCategory = products.reduce((acc, product) => {
    const cat = product.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="product-list">
      <h2>Liste des produits</h2>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category}>
          <h3 style={{ marginTop: "2rem" }}>{category}</h3>
          <div className="product-grid">
            {items.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p style={{ fontWeight: "bold" }}>
                    {product.price} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
