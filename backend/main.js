import express from "express";

import userRoutes from "./src/routes/user-routes.js"; // import user-routes file
import restaurantsRoutes from "./src/routes/restaurants-routes.js"; // import restaurants table routes
import categoriesRoutes from "./src/routes/categories-routes.js"; // import categories table routes

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
