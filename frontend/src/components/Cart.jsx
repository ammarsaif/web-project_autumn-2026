import { useState } from "react";
import { Link } from "react-router";
import "./Cart.css";

const DELIVERY_FEE = 3;

const Cart = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [orderType, setOrderType] = useState("pickup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const user = localStorage.getItem("user");

  const saveCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const increase = (id) => {
    const newItems = items.map((item) => {
      if (item.menu_item_id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    saveCart(newItems);
  };

  const decrease = (id) => {
    const newItems = items.map((item) => {
      if (item.menu_item_id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    saveCart(newItems.filter((item) => item.quantity > 0));
  };

  const removeItem = (id) => {
    saveCart(items.filter((item) => item.menu_item_id !== id));
  };

  let subtotal = 0;
  for (const item of items) {
    subtotal = subtotal + Number(item.price) * item.quantity;
  }

  let deliveryFee = 0;
  if (orderType === "delivery") {
    deliveryFee = DELIVERY_FEE;
  }

  const total = subtotal + deliveryFee;
  const handlePlaceOrder = async () => {
    if (name === "" || phone === "") {
      setError("Please enter your name and phone number.");
      return;
    }

    if (orderType === "delivery") {
      if (
        street === "" ||
        houseNumber === "" ||
        postalCode === "" ||
        city === ""
      ) {
        setError("Please fill in all the address fields.");
        return;
      }
      if (postalCode.length !== 5) {
        setError("Postal code must have 5 digits.");
        return;
      }
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    const order = {
      user_id: savedUser.user_id,
      restaurant_id: 2,
      order_type: orderType,
      status: "pending",
      total_price: Number(total.toFixed(2)),
      pickup_time: null,
      delivery_time: null,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not place the order");
        return;
      }

      console.log("Order saved, id:", data.order_id);

      saveCart([]);
      setName("");
      setPhone("");
      setEmail("");
      setStreet("");
      setHouseNumber("");
      setPostalCode("");
      setCity("");
      setError("");
      setOrderPlaced(true);
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server");
    }
  };

  return (
    <div className="cart-page">
      {orderPlaced && (
        <div className="cart-card">
          <p className="cart-success">Thank you! Your order has been placed.</p>
        </div>
      )}

      <div className="cart-card">
        <h1>Your Cart</h1>

        {items.length === 0 && (
          <p className="cart-empty">
            Your cart is empty. <Link to="/menu">Go to the menu</Link>
          </p>
        )}

        {items.map((item) => (
          <div className="cart-item" key={item.menu_item_id}>
            <div>
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">
                {Number(item.price).toFixed(2)} € each
              </p>
            </div>

            <div className="cart-item-controls">
              <button
                className="cart-qty-btn"
                onClick={() => decrease(item.menu_item_id)}
              >
                -
              </button>
              <p className="cart-qty">{item.quantity}</p>
              <button
                className="cart-qty-btn"
                onClick={() => increase(item.menu_item_id)}
              >
                +
              </button>
            </div>

            <p className="cart-line-total">
              {(Number(item.price) * item.quantity).toFixed(2)} €
            </p>

            <button
              className="cart-remove-btn"
              onClick={() => removeItem(item.menu_item_id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div>
          <div className="cart-card">
            <h2>Order Type</h2>
            <div className="cart-type-buttons">
              <button
                className={
                  orderType === "pickup"
                    ? "cart-type-btn cart-type-active"
                    : "cart-type-btn"
                }
                onClick={() => setOrderType("pickup")}
              >
                Pickup
              </button>
              <button
                className={
                  orderType === "delivery"
                    ? "cart-type-btn cart-type-active"
                    : "cart-type-btn"
                }
                onClick={() => setOrderType("delivery")}
              >
                Delivery
              </button>
              <button
                className={
                  orderType === "dine_in"
                    ? "cart-type-btn cart-type-active"
                    : "cart-type-btn"
                }
                onClick={() => setOrderType("dine_in")}
              >
                Dine in
              </button>
            </div>
          </div>

          <div className="cart-card">
            <h2>Your Details</h2>

            <div className="cart-form-row">
              <div>
                <label className="cart-label">Name *</label>
                <input
                  className="cart-input"
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className="cart-label">Phone *</label>
                <input
                  className="cart-input"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>

            <label className="cart-label">Email (optional)</label>
            <input
              className="cart-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            {orderType === "delivery" && (
              <div>
                <div className="cart-form-row">
                  <div>
                    <label className="cart-label">Street *</label>
                    <input
                      className="cart-input"
                      type="text"
                      value={street}
                      onChange={(event) => setStreet(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="cart-label">House number *</label>
                    <input
                      className="cart-input"
                      type="text"
                      value={houseNumber}
                      onChange={(event) => setHouseNumber(event.target.value)}
                    />
                  </div>
                </div>

                <div className="cart-form-row">
                  <div>
                    <label className="cart-label">Postal code *</label>
                    <input
                      className="cart-input"
                      type="text"
                      maxLength={5}
                      value={postalCode}
                      onChange={(event) => setPostalCode(event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="cart-label">City *</label>
                    <input
                      className="cart-input"
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="cart-card">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <p>Subtotal</p>
              <p>{subtotal.toFixed(2)} €</p>
            </div>

            {orderType === "delivery" && (
              <div className="cart-summary-row">
                <p>Delivery fee</p>
                <p>{deliveryFee.toFixed(2)} €</p>
              </div>
            )}

            <div className="cart-summary-row cart-summary-total">
              <p>Total</p>
              <p>{total.toFixed(2)} €</p>
            </div>
          </div>

          <div className="cart-card">
            {user ? (
              <div>
                {error && <p className="cart-error">{error}</p>}
                <button className="cart-place-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            ) : (
              <p className="cart-login-message">
                Please log in to order. <Link to="/login">Go to login</Link>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
