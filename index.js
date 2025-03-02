// require("dotenv").config(); // Ensure environment variables are loaded
// const express = require("express");
// const cors = require("cors");
// const sequelize = require("./config/database");
// const cookieParser = require("cookie-parser");

// // Import Routes
// // const userRoutes = require("./routes/userRoutes");
// const adminUserRoutes = require("./routes/admin/adminUserRoutes");
// const adminPermissions = require("./routes/admin/permissionsRoutes");
// const adminRoles = require("./routes/admin/roleRoutes");
// const adminLocationRoutes = require("./routes/admin/adminLocationRoutes");
// const adminSegmentRoutes = require("./routes/admin/adminSegmentRoutes");
// const adminCategoryRoutes = require("./routes/admin/adminCategoryRoutes");
// // const locationRoutes = require("./routes/locationRoutes");
// // const categoryRoutes = require("./routes/categoryRoutes");
// // const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
// // const locationCategoryRoutes = require("./routes/locationCategoryRoutes");
// // const subCategoryRoutes = require("./routes/subCategoryRoutes");

// const logRoutes = require("./middlewares/routeLogger");
// const errorMiddleware = require("./middlewares/errorMiddleware");

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors({ origin: "*" })); // Allow all origins
// app.use(express.json()); // Add decryption middleware
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(cookieParser()); // ✅ Enables cookie parsing

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running" });
// });

// // Register API Routes
// app.use("/api/admin/admin-user", adminUserRoutes);
// app.use("/api/admin/permission", adminPermissions);
// app.use("/api/admin/role", adminRoles);
// app.use("/api/admin/locations", adminLocationRoutes);
// app.use("/api/admin/segment", adminSegmentRoutes);
// app.use("/api/admin/category", adminCategoryRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/admin", locationRoutes);
// // app.use("/api/admin", serviceCategoryRoutes);
// // app.use("/api", categoryRoutes);
// // app.use("/api", locationCategoryRoutes);
// // app.use("/api", subCategoryRoutes);

// // Add encryption middleware after routes

// // Error Middleware (should be placed last)
// app.use(errorMiddleware);

// // Database Sync and Server Start
// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully");

//     await sequelize.sync(); // Ensure models sync with DB
//     console.log("Database synced successfully");

//     app.listen(port, () => {
//       console.log(`Server running at http://localhost:${port}`);
//       logRoutes(app); // Ensure logging happens after server starts
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//     process.exit(1); // Exit process if there is a critical error
//   }
// };

// startServer();

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");

const encryptionMiddleware = require("./middlewares/encryptionMiddleware");
const decryptionMiddleware = require("./middlewares/decryptionMiddleware");
const rawBodyMiddleware = require("./middlewares/rawBodyMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const logRoutes = require("./middlewares/routeLogger");

const adminUserRoutes = require("./routes/admin/adminUserRoutes");
const adminPermissions = require("./routes/admin/permissionsRoutes");
const adminRoles = require("./routes/admin/roleRoutes");
const adminLocationRoutes = require("./routes/admin/adminLocationRoutes");
const adminSegmentRoutes = require("./routes/admin/adminSegmentRoutes");
const adminCategoryRoutes = require("./routes/admin/adminCategoryRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(rawBodyMiddleware);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// 🛠 Apply Decryption Middleware for JSON & FormData
app.use(decryptionMiddleware);
app.use(encryptionMiddleware);

app.get("/", (req, res) => {
  res.encryptResponse({ message: "Server is running" });
});

app.use("/api/admin/admin-user", adminUserRoutes);
app.use("/api/admin/permission", adminPermissions);
app.use("/api/admin/role", adminRoles);
app.use("/api/admin/locations", adminLocationRoutes);
app.use("/api/admin/segment", adminSegmentRoutes);
app.use("/api/admin/category", adminCategoryRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      logRoutes(app);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
