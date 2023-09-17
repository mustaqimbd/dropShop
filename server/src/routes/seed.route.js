const { userSeed } = require("../controller/seed.controller");

const seedRoute = require("express").Router();

//user collection seed
seedRoute.post("/user", userSeed);

module.exports = seedRoute;
