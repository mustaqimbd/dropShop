const Products = require("../model/products.model");
const generateUniqueId = require("generate-unique-id");
const { successResponse } = require("./responseHandler");

const addProduct = async (req, res, next) => {
  try {
    const {
      product_name,
      image,
      ratings,
      reseller_price,
      suggested_price,
      warranty,
      available_quantity,
      description,
    } = req.body;
    const newProduct = new Products({
      product_name,
      product_id: generateUniqueId({
        length: 8,
      }).toUpperCase(),
      images: [
        {
          link: image,
        },
      ],
      ratings: parseFloat(ratings),
      reseller_price: parseFloat(reseller_price),
      suggested_price: parseFloat(suggested_price),
      warranty,
      available_quantity: parseInt(available_quantity),
      description,
    });
    await newProduct.save();
    return successResponse(res, {
      statusCode: 201,
      message: "Product created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addProduct };
