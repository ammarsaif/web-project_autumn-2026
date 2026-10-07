import { useEffect, useState } from "react";
import "./userPage.css";

function UserPage() {
  const [burgers, setBurgers] = useState([]);
  const [cart, setCart] = useState([]);

  // Get burgers from backend
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/menu-items")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch burgers");
        }

        return response.json();
      })
      .then((data) => {
        // If your API returns { data: [...] }, use data.data instead
        setBurgers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Add burger to cart
  const addToCart = (burger) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.menu_item_id === burger.menu_item_id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.menu_item_id === burger.menu_item_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...burger,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.menu_item_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.menu_item_id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.menu_item_id !== id),
    );
  };

  // Calculate total
  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  // Number of products in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="user-page">
      {/* HEADER */}
      <header className="user-header">
        <div className="user-logo">🍔 My Restaurant</div>

        <nav>
          <a href="#burgers">Burgers</a>
          <a href="#cart">🛒 Cart ({cartCount})</a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <section className="welcome-section">
          <h1>Welcome to My Restaurant</h1>
          <p>Choose your favourite burger and add it to your cart.</p>
        </section>

        {/* BURGERS */}
        <section id="burgers" className="burgers-section">
          <h2>🍔 Our Burgers</h2>

          <div className="burger-grid">
            {burgers
              .filter((burger) => burger.product_type === "burger")
              .map((burger) => (
                <div className="burger-card" key={burger.menu_item_id}>
                  {burger.image_url && (
                    <img src={burger.image_url} alt={burger.name} />
                  )}

                  <div className="burger-info">
                    <h3>{burger.name}</h3>

                    <p className="description">{burger.description}</p>

                    <p className="price">€{Number(burger.price).toFixed(2)}</p>

                    <button onClick={() => addToCart(burger)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* SHOPPING CART */}
        <section id="cart" className="cart-section">
          <h2>🛒 Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <p>Add some delicious burgers!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.menu_item_id}>
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>

                      <p>€{Number(item.price).toFixed(2)} each</p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        onClick={() => decreaseQuantity(item.menu_item_id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.menu_item_id)}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      €{(Number(item.price) * item.quantity).toFixed(2)}
                    </div>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.menu_item_id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* CART SUMMARY */}
              <div className="cart-summary">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Items</span>
                  <span>{cartCount}</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-button"
                  onClick={() => alert("Checkout will be implemented next.")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserPage;
