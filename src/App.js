import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const fetchProducts = async (query = "") => {
    try {
      const res = await axios.get(`/api/products?search=${query}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Erreur fetchProducts:", error);
    }
  };

  const fetchUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Erreur fetchUser:", err);
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    fetchUser();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(searchQuery);
    } catch (error) {
      console.error("Erreur handleDelete:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div>
      {!user ? (
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/register"
              element={<Register setUser={setUser} setToken={setToken} />}
            />
            <Route
              path="/login"
              element={<Login setUser={setUser} setToken={setToken} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      ) : (
        <div>
          <header>
            <nav>
              <h1 style={{ cursor: "pointer" }}>
                <Link to="/" className="site-title">
                  Application Ecommerce CRUD
                </Link>
              </h1>
              <SearchBar onSearch={setSearchQuery} />

              <Link to="/products">
                <button>Produits</button>
              </Link>

              <Link to="/profile">
                <button>Mon Profil</button>
              </Link>

              <Link to="/cart">
                <button>Mon Panier</button>
              </Link>

              <button onClick={handleLogout}>Déconnexion</button>
            </nav>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>Bienvenue {user?.name} 👋</h2>
                  <ProductList products={products} onDelete={handleDelete} />
                </div>
              }
            />
            <Route
              path="/products"
              element={
                <div>
                  <ProductList products={products} onDelete={handleDelete} />
                </div>
              }
            />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="/cart" element={<Cart token={token} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
