import "../styles/ProductList.css";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div>
      <h2>Liste des produits</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
            >
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>
                <strong>{product.price} €</strong>
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
