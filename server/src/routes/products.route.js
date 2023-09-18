const {
  highlightProducts,
  productByPagination,
  totalProductsCount,
  productBySlug,
} = require("../controller/products.controller");

const productRoute = require("express").Router();

//get 3 products base on ratings
//  /api/products/highlight-products
productRoute.get("/highlight-products", highlightProducts);

//get total products count
//  /api/products/total-product-count
productRoute.get("/total-product-count", totalProductsCount);

//get products by pagination
//  /api/products/products-by-pagination
productRoute.get("/products-by-pagination", productByPagination);
/**
  @params 
  /api/products/products-by-pagination?page=${1}&limit=${20} 
  @default parameter ={
    page:1,
    limit:20,
  }
 **/

//get single product by slug
productRoute.get("/product-by-slug/:slug", productBySlug);
module.exports = productRoute;
