const listEndpoints = require('express-list-endpoints');

const logRoutes = (app) => {
  const routes = listEndpoints(app);
  routes.forEach((route) => {
    console.log(`${route.methods.join(', ')} ${route.path}`);
  });
};

module.exports = logRoutes;
