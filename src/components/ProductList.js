import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

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
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/products/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image || "/no-image.png"}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <h4>{product.name}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
