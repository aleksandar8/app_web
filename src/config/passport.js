const passport = require('passport');
require('./strategies/local.strategies')();



module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  //Store user in sesion
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //Retrives user from sesion
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};