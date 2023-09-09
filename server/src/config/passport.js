const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;
const opts = {};
const passport = require("passport");
const User = require("../model/user.model");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.jwt.token;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.findOne({ _id: jwt_payload.id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
