const passport = require('passport');
const  Stategy  = require ('passport-local').Strategy;
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy() {
  passport.use(new Stategy(
    {
      userNameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {

      const url = 'mongodb://localhost:27017';
      const dbName = 'libaryAPP';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);

          debug('Connect to the server');

          const db = client.db(dbName);

          const col = db.collection('users');

          const user = await col.findOne({ username });

          if (user.password === password) {

            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    }));
};
