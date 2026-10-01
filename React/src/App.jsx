import "./App.css";
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
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <Link to="/login" class="login-btn">Login</Link>
        <Link to="/cart" class="cart-icon">Cart</Link>


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
