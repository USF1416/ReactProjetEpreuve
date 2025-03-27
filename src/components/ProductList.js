import "../styles/ProductList.css";

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Liste des produits</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "200px",
                borderRadius: "8px",
              }}
            >
              <h4>{product.nom}</h4>
              <h4>{product.categorie}</h4>
              <p>{product.description}</p>
              <p>
                <strong>{product.prix} €</strong>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
