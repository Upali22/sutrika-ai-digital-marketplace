const express = require("express");
const router = express.Router();

const {
    addToCart
} = require("../controllers/cartController");

// Add product to cart
router.post("/add", addToCart);

module.exports = router;