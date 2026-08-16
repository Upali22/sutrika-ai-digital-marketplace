// const express = require("express");
//const router = express.Router();

//console.log("✅ Product Routes Loaded");

//const {
//    getProducts
//} = require("../controllers/productController");

//router.get("/", (req, res) => {
//    console.log("🔥 Product Route Hit");
//    getProducts(req, res);
//});

//module.exports = router;

//const express = require("express");
//const router = express.Router();

//console.log("✅ Product Routes Loaded");

//const { getProducts } = require("../controllers/productController");

//router.get("/", (req, res) => {
//    console.log("🔥 Product Route Hit");
//    getProducts(req, res);
//});

//module.exports = router;

//const express = require("express");
//const router = express.Router();

//console.log("✅ Product Routes Loaded");

//const { getProducts } = require("../controllers/productController");

//router.get("/", getProducts);

//module.exports = router;

const express = require("express");
const router = express.Router();

console.log("✅ Product Routes Loaded");

const { getProducts } = require("../controllers/productController");

router.get("/", (req, res) => {

    console.log("🔥 Product Route Hit");

    getProducts(req, res);

});

module.exports = router;