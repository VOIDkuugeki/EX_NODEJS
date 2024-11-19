const categoryRoutes = require('./category.router');

module.exports = (app) => {
    app.use('/api/categories', categoryRoutes);
}