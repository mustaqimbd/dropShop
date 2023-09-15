const { accessTokenSecret } = require("../secret");
const JwtStrategy = require("passport-jwt").Strategy;
const opts = {};
const passport = require("passport");
const User = require("../model/user.model");
const findById = require("../services/findById");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = accessTokenSecret;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const id = { _id: jwt_payload.id };
    const user = await findById(User, id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
