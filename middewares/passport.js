const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user'); 
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const secret = process.env.JWT_SECRET;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

module.exports = (passport) => {
  passport.use(
    new Strategy(params, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (!user) {
            return done(new Error('User not found'));
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    })
  );
};
