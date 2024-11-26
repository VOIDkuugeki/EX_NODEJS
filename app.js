const express = require("express");
const app = express();
const connectDB = require("./configs/database");
const router = require("./routers");
const path = require("path");
const methodOverride = require('method-override');
const foodModel = require("./models/food.model");
const categoryModel = require("./models/category.model");
const foodRouter = require('./routers/food.router');
const categoryRouter = require('./routers/category.router');

const PORT = 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "public")));

connectDB();
router(app);

app.get("/", async (req, res) => {
  const products = await foodModel.find().populate("category_id"); // Fetch products from the database
  const categories = await categoryModel.find(); // Fetch categories from the database
  res.render("index", { categories, products }); // Render the view with the products data
});

app.use('/foods', foodRouter);
app.use('/categories', categoryRouter);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});