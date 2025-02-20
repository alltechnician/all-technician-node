const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const adminUserRoutes = require('./routes/admin/adminUserRoutes');
const locationRoutes = require('./routes/locationRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const locationCategoryRoutes = require('./routes/locationCategoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const logRoutes = require('./middlewares/routeLogger');
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.json('running server');
});
app.use('/api/admin/admin-user', adminUserRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', locationRoutes);
app.use('/api', categoryRoutes);
app.use('/api', locationCategoryRoutes);
app.use('/api', subCategoryRoutes);
app.use(errorMiddleware);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    logRoutes(app)
  });
});
