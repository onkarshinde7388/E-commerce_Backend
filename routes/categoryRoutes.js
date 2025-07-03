const express = require("express");
const { getAllCategory, postCategory } = require("../controllers/categoryController");
const router = express.Router();

router.get('/', getAllCategory);
router.post("/", postCategory);

module.exports = router;