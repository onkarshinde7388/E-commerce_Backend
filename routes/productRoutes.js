const express = require("express");
const router = express.Router();
const {getProduct, getAllProduct, createProduct, deleteProduct, updateProduct} = require("../controllers/productController.js");

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put('/', updateProduct);
router.delete("/", deleteProduct);

module.exports = router;