const categoryRoutes = require('./category.router');
const foodRoutes = require('./food.router');

module.exports = (app) => {
    app.use('/api/categories', categoryRoutes);
    app.use('/api/foods', foodRoutes);
}