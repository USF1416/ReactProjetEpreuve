// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [view, setView] = useState('products'); // 'products' ou 'profile'

  const fetchProducts = async (query = '') => {
    try {
      const res = await axios.get(`/api/products?search=${query}`);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // On récupère les produits dès que la recherche change
  React.useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  const handleCreate = async (product) => {
    try {
      await axios.post('/api/products', product);
      fetchProducts(searchQuery);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, product) => {
    try {
      await axios.put(`/api/products/${id}`, product);
      fetchProducts(searchQuery);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(searchQuery);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout'); // facultatif, la déconnexion se fait surtout côté client
      setUser(null);
      setToken('');
      localStorage.removeItem('token');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Application Ecommerce CRUD</h1>
        <Register setUser={setUser} setToken={setToken} />
        <Login setUser={setUser} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Application Ecommerce CRUD</h1>
        <button onClick={() => setView('products')}>Produits</button>
        <button onClick={() => setView('profile')}>Mon Profil</button>
        <button onClick={handleLogout}>Déconnexion</button>
      </header>
      {view === 'profile' ? (
        <Profile token={token} />
      ) : (
        <div>
          <SearchBar onSearch={setSearchQuery} />
          <ProductForm
            onSubmit={selectedProduct ? (prod) => handleUpdate(selectedProduct.id, prod) : handleCreate}
            product={selectedProduct}
          />
          <ProductList
            products={products}
            onEdit={(product) => setSelectedProduct(product)}
            onDelete={handleDelete}
          />
          <Cart token={token} />
        </div>
      )}
    </div>
  );
}

export default App;
