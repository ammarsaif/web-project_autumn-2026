import { useState } from "react";
import { useNavigate } from "react-router";
import "./AdminPage.css";

function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo">🍔 My Restaurant</div>

        <nav className="admin-nav">
          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={activePage === "menu" ? "active" : ""}
            onClick={() => setActivePage("menu")}
          >
            🍔 Menu
          </button>

          <button
            className={activePage === "categories" ? "active" : ""}
            onClick={() => setActivePage("categories")}
          >
            📂 Categories
          </button>

          <button
            className={activePage === "schedule" ? "active" : ""}
            onClick={() => setActivePage("schedule")}
          >
            📅 Menu Schedule
          </button>

          <button
            className={activePage === "orders" ? "active" : ""}
            onClick={() => setActivePage("orders")}
          >
            🧾 Orders
          </button>

          <button
            className={activePage === "users" ? "active" : ""}
            onClick={() => setActivePage("users")}
          >
            👥 Users
          </button>

          <button
            className={activePage === "announcements" ? "active" : ""}
            onClick={() => setActivePage("announcements")}
          >
            📢 Announcements
          </button>

          <button
            className={activePage === "notifications" ? "active" : ""}
            onClick={() => setActivePage("notifications")}
          >
            🔔 Notifications
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your restaurant</p>
          </div>

          <div className="admin-user">👤 Administrator</div>
        </header>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <section>
            <h2>Dashboard</h2>

            <div className="dashboard-cards">
              <div className="dashboard-card">
                <span className="card-icon">🍔</span>
                <div>
                  <p>Menu Items</p>
                  <h3>24</h3>
                </div>
              </div>

              <div className="dashboard-card">
                <span className="card-icon">🧾</span>
                <div>
                  <p>Today's Orders</p>
                  <h3>18</h3>
                </div>
              </div>

              <div className="dashboard-card">
                <span className="card-icon">👥</span>
                <div>
                  <p>Customers</p>
                  <h3>152</h3>
                </div>
              </div>

              <div className="dashboard-card">
                <span className="card-icon">💰</span>
                <div>
                  <p>Today's Sales</p>
                  <h3>€438</h3>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2>Recent Orders</h2>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>#1001</td>
                    <td>Ahmed</td>
                    <td>Pickup</td>
                    <td>
                      <span className="status preparing">Preparing</span>
                    </td>
                    <td>€24.50</td>
                  </tr>

                  <tr>
                    <td>#1002</td>
                    <td>Maria</td>
                    <td>Delivery</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                    <td>€18.90</td>
                  </tr>

                  <tr>
                    <td>#1003</td>
                    <td>John</td>
                    <td>Pickup</td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                    <td>€31.20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* MENU */}
        {activePage === "menu" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Menu Items</h2>
                <p>Manage restaurant food and drinks.</p>
              </div>

              <button className="primary-button">+ Add Menu Item</button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Classic Burger</td>
                  <td>Burgers</td>
                  <td>€8.50</td>
                  <td>Yes</td>
                  <td>
                    <button className="edit-button">Edit</button>

                    <button className="delete-button">Delete</button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Chicken Burger</td>
                  <td>Burgers</td>
                  <td>€9.50</td>
                  <td>Yes</td>
                  <td>
                    <button className="edit-button">Edit</button>

                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* CATEGORIES */}
        {activePage === "categories" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Categories</h2>
                <p>Manage menu categories.</p>
              </div>

              <button className="primary-button">+ Add Category</button>
            </div>

            <div className="category-grid">
              <div className="category-card">
                <h3>🍔 Burgers</h3>
                <p>8 menu items</p>
                <button className="edit-button">Edit</button>
              </div>

              <div className="category-card">
                <h3>🍱 Lunch</h3>
                <p>6 menu items</p>
                <button className="edit-button">Edit</button>
              </div>

              <div className="category-card">
                <h3>🍟 Sides</h3>
                <p>5 menu items</p>
                <button className="edit-button">Edit</button>
              </div>

              <div className="category-card">
                <h3>🥤 Drinks</h3>
                <p>5 menu items</p>
                <button className="edit-button">Edit</button>
              </div>
            </div>
          </section>
        )}

        {/* ORDERS */}
        {activePage === "orders" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Orders</h2>
                <p>Manage customer orders.</p>
              </div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Order Type</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1001</td>
                  <td>Ahmed</td>
                  <td>Pickup</td>

                  <td>
                    <select defaultValue="preparing">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td>€24.50</td>

                  <td>
                    <button className="edit-button">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* USERS */}
        {activePage === "users" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Users</h2>
                <p>Manage customers and administrators.</p>
              </div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Active</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Admin</td>
                  <td>admin@restaurant.com</td>
                  <td>Admin</td>
                  <td>Yes</td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Customer</td>
                  <td>customer@example.com</td>
                  <td>Customer</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {/* SCHEDULE */}
        {activePage === "schedule" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Menu Schedule</h2>
                <p>Manage daily and weekly lunch menus.</p>
              </div>

              <button className="primary-button">+ Add Schedule</button>
            </div>

            <div className="schedule-grid">
              <div>
                <strong>Monday</strong>
                <p>Classic Burger + Fries</p>
              </div>

              <div>
                <strong>Tuesday</strong>
                <p>Chicken Burger + Drink</p>
              </div>

              <div>
                <strong>Wednesday</strong>
                <p>Beef Lunch Special</p>
              </div>

              <div>
                <strong>Thursday</strong>
                <p>Premium Burger</p>
              </div>

              <div>
                <strong>Friday</strong>
                <p>Friday Lunch Deal</p>
              </div>
            </div>
          </section>
        )}

        {/* ANNOUNCEMENTS */}
        {activePage === "announcements" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Announcements</h2>
                <p>Manage restaurant announcements.</p>
              </div>

              <button className="primary-button">+ Add Announcement</button>
            </div>

            <div className="announcement-card">
              <h3>Friday Special</h3>

              <p>Get 20% discount on selected burgers this Friday.</p>

              <div>
                <button className="edit-button">Edit</button>

                <button className="delete-button">Delete</button>
              </div>
            </div>
          </section>
        )}

        {/* NOTIFICATIONS */}
        {activePage === "notifications" && (
          <section>
            <div className="page-title">
              <div>
                <h2>Notifications</h2>
                <p>Send notifications to customers.</p>
              </div>

              <button className="primary-button">+ Create Notification</button>
            </div>

            <div className="announcement-card">
              <h3>Restaurant Announcement</h3>

              <p>The restaurant will close at 18:00 today.</p>

              <span className="status completed">Sent</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
