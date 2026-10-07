import "../App.css";
import { useEffect, useState } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/menu-items");

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await response.json();

        const formattedData = data.map((item) => ({
          ...item,
          price: parseFloat(item.price),
        }));

        setMenuItems(formattedData);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setError("Could not load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="restaurants" id="restaurants">
      <h1>Our Menu</h1>

      <div className="restaurant-box">
        {menuItems.map((item) => (
          <div className="menu-card" key={item.menu_item_id}>
            <img src={item.image_url} alt={item.name} />

            <div className="card-content">
              <h3>{item.name}</h3>

              <p className="description">{item.description}</p>

              <div className="allergens">
                {item.allergens &&
                  item.allergens.split(",").map((allergen) => (
                    <div className="allergen" key={allergen.trim()}>
                      {allergen.trim()}
                    </div>
                  ))}
              </div>

              <div className="card-line"></div>

              <div className="card-bottom">
                <h3 className="price">{item.price.toFixed(2)} €</h3>

                <button className="btn">
                  <i className="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
