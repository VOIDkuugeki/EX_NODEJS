const express = require("express");
const app = express();
const connectDB = require("./configs/database.js");
const router = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
router(app);

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

app.listen(5000, ()=>{
    console.log("Server run at port 5000");
})