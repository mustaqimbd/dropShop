const mongoose = require("mongoose");
const createErrors = require("http-errors");

const findById = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);
    if (!item)
      throw createErrors(404, `${Model.modelName} is not exist with this ID.`);
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createErrors(400, "Invalid item Id.");
    }
    throw error;
  }
};

module.exports = findById;
