const { highlightProducts } = require("../controller/products.controller");

const productRoute = require("express").Router();

//get 3 products base on ratings
productRoute.get("/highlight-products", highlightProducts);

module.exports = productRoute;
