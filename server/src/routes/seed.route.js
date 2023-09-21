const { userSeed, orderSeed } = require("../controller/seed.controller");

const seedRoute = require("express").Router();

//user collection seed
seedRoute.post("/user", userSeed);
seedRoute.post("/orders", orderSeed);

module.exports = seedRoute;
