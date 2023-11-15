const {
  highlightProducts,
  productByPagination,
  productBySlug,
  getProductsByCategory,
  getProductDetails,
} = require("../controller/products.controller");

const productRoute = require("express").Router();

//get 3 products base on ratings
//  /api/products/highlight-products
productRoute.get("/highlight-products", highlightProducts);

//get products by pagination
//  /api/products/products-by-pagination
productRoute.get("/products-by-pagination", productByPagination);

// get products by category
// /api/products/
productRoute.get("/:slug", getProductsByCategory);

//get product details
// /api/products/details
productRoute.get("/details/:productSlug", getProductDetails);

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

//filter products by category
productRoute.get("/product-by-category-slug/:slug", productsByCategorySlug);

module.exports = productRoute;
