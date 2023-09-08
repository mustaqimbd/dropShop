const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const passport = require("passport");
const User = require("../model/user.model");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.token;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const projection = {
      name: 1,
      email: 1,
      isAdmin: 1,
    };
    const user = await User.findOne({ _id: jwt_payload.id }, projection);
    console.log(user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
