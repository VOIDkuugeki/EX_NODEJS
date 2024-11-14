const express = require('express');							
const bodyParser = require('body-parser');							
const rectangleRoutes = require('./routes/rectangleRoutes');							
							
const app = express();							
const PORT = process.env.PORT || 5000;							
							
// Sử dụng EJS làm view engine							
app.set('view engine', 'ejs');							
app.set('views', './views');							
							
// Middleware							
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { perimeter: null, area: null });
})
							
// Sử dụng routes							
app.use('/rectangle', rectangleRoutes);							
							
// Chạy ứng dụng							
app.listen(PORT, () => {							
console.log(`Server is running on http://localhost:${PORT}`);							
});							