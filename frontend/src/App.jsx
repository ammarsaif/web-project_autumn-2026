import "./App.css";

import Home from "./components/Home";
import Menu from "./components/Menu";
import Map from "./components/Map";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Admin from "./components/AdminPage";

import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router";

import { useState } from "react";
import AdminPage from "./components/AdminPage";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppContent open={open} setOpen={setOpen} />
    </BrowserRouter>
  );
}

function AppContent({ open, setOpen }) {
  const location = useLocation();

  // Don't show customer header on admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* CUSTOMER HEADER */}
      {!isAdminPage && (
        <header className="header">
          <Link to="/" className="logo">
            Burger <span>Hut</span>
          </Link>

          <nav className={open ? "navbar active" : "navbar"}>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>

            <Link to="/menu" onClick={() => setOpen(false)}>
              Menu
            </Link>

            <Link to="/map" onClick={() => setOpen(false)}>
              Map
            </Link>

            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>

            <Link to="/register" onClick={() => setOpen(false)}>
              Register
            </Link>
          </nav>

          <div className="header-icons">
            <Link
              to="/cart"
              className="fa-solid fa-cart-shopping"
              id="cart-icon"
            ></Link>

            <i
              className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
              id="menu-icon"
              onClick={() => setOpen(!open)}
            ></i>
          </div>
        </header>
      )}

      {/* PAGES */}
      <main className={isAdminPage ? "admin-section" : "section"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/map" element={<Map />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
