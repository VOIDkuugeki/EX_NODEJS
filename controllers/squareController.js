const Square = require('../models/square');

exports.calculatePerimeter = (req, res) => {
    const { length } = req.body;
    const square = new Square(Number(length));
    const perimeter = square.getPerimeter();
    const area = square.getArea();

    res.render('index', { perimeter, area });
};