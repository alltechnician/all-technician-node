require("dotenv").config(); // Ensure environment variables are loaded
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Import Routes
// const userRoutes = require("./routes/userRoutes");
const adminUserRoutes = require("./routes/admin/adminUserRoutes");
// const locationRoutes = require("./routes/locationRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
// const locationCategoryRoutes = require("./routes/locationCategoryRoutes");
// const subCategoryRoutes = require("./routes/subCategoryRoutes");

const logRoutes = require("./middlewares/routeLogger");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Register API Routes
app.use("/api/admin/admin-user", adminUserRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/admin", locationRoutes);
// app.use("/api/admin", serviceCategoryRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", locationCategoryRoutes);
// app.use("/api", subCategoryRoutes);

// Error Middleware (should be placed last)
app.use(errorMiddleware);

// Database Sync and Server Start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ force: true, alter: true }); // Ensure models sync with DB
    console.log("Database synced successfully");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      logRoutes(app); // Ensure logging happens after server starts
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process if there is a critical error
  }
};

startServer();
