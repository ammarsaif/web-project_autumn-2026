import express from "express";

import userRoutes from "./src/routes/user-routes.js"; // import user-routes file
import restaurantsRoutes from "./src/routes/restaurants-routes.js"; // import restaurants table routes
import categoriesRoutes from "./src/routes/categories-routes.js"; // import categories table routes
import menuItemsRoutes from "./src/routes/menu_items-routes.js"; // import menu_items table routes
import ordersRoutes from "./src/routes/orders-routes.js"; // import orders table routes
import orderStatusHistoryRoutes from "./src/routes/order_status_history-routes.js"; // import order_status_history table routes
import orderItemsRoutes from "./src/routes/order_items-routes.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/menu-items", menuItemsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/orders-history", orderStatusHistoryRoutes);
app.use("/api/order-items", orderItemsRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
