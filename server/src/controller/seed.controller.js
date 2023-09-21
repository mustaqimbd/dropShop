const userData = require("../seed_data/dropShopDB.users.json");
const orderedData = require("../seed_data/dropShopDB.orders.json");
const User = require("../model/user.model");
const Orders = require("../model/orders.model");

const userSeed = async (req, res, next) => {
  try {
    await User.deleteMany();
    await User.insertMany(userData);
    return res.send(["success"]);
  } catch (error) {
    next(error);
  }
};

const orderSeed = async (req, res, next) => {
  try {
    await Orders.deleteMany();
    await Orders.insertMany(orderedData);
    res.send(["Success"]);
  } catch (error) {
    next(error);
  }
};

module.exports = { userSeed, orderSeed };
