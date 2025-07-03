const express = require("express");
const router = express.Router();
const {getCart, addtoCart, deletefromCart} = require("../controllers/cartController.js");


router.get("/", getCart);
router.post("/", addtoCart);
router.delete("/", deletefromCart)
module.exports = router;