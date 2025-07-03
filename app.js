const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes")
const cartRoutes = require("./routes/cartRoutes.js")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log("Failed to Connect",err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Listening to Port",PORT );
});

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.use("/cart", cartRoutes);

