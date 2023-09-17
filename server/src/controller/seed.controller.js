const userData = require("../seed_data/dropShopDB.users.json");
const User = require("../model/user.model");
const { successResponse } = require("./responseHandler");

const userSeed = async (req, res, next) => {
  try {
    await User.deleteMany();
    await User.insertMany(userData);
    return res.send(["success"]);
  } catch (error) {
    next(error);
  }
};

module.exports = { userSeed };
