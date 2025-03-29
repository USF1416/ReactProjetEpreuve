import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error("Erreur handleLogout:", err);
    }
  };

  if (!user) {
    return (
      <div>
        <Link to="/" className="site-title">
          <h1>Application Ecommerce CRUD</h1>
        </Link>

        <Register setUser={setUser} setToken={setToken} />
        <Login setUser={setUser} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Application Ecommerce CRUD</h1>
        <nav>
          <Link to="/products">Produits</Link>
          {" | "}
          <Link to="/profile">Mon Profil</Link>
          {" | "}
          <Link to="/cart">Mon Panier</Link>
          {" | "}
          <button onClick={handleLogout}>Déconnexion</button>
        </nav>
      </header>
      <Routes>
        <Route
          path="/products"
          element={
            <div>
              <SearchBar onSearch={setSearchQuery} />
              <ProductList products={products} onDelete={handleDelete} />
            </div>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route path="/cart" element={<Cart token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
