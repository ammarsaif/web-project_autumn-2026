import './App.css'
import Home from "./components/Home";
import Menu from "./components/Menu";
import Map from "./components/Map"
import Contact from "./components/Contact";
import Login from "./components/Login";
import Cart from "./components/Cart"
import {BrowserRouter, Routes, Route, Link} from "react-router";


function App() {
  return (
    <BrowserRouter>
      <div >
        <header className="header">
          <Link to="/" className="logo">Restaurant <span> & </span> Cafe</Link>

          <nav className="navbar">
            <li><Link to="/">Home</Link></li>
            <Link to="/menu">Menu</Link>
            <Link to="/map">Map</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/cart" className="cart-icon">Cart</Link>
        </header>
        



        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/map" element={<Map />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
