const express = require("express");
const app = express();
const connectDB = require("./configs/database");
const router = require("./routers");
const path = require("path");
const foodModel = require("./models/food.model");

const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

connectDB();
router(app);

app.get("/", async (req, res) => {
    const products = await foodModel.find(); // Fetch products from the database
    res.render("products/index", { products }); // Render the view with the products data
});

app.get("/products/:id/edit", async (req, res) => {
    const product = await foodModel.findById(req.params.id); // Fetch the product by ID from the database
    res.render("products/edit", { product }); // Render the edit view with the product data
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
