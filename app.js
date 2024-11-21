const express = require("express");
const app = express();
const connectDB = require("./configs/database");
const router = require("./routers");

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
router(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
