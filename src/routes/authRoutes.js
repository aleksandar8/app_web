const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app: authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {

  authRouter.route('/singUp')

    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libaryAPP';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });
          debug('Connect to the server');

          const db = client.db(dbName);

          const col = db.collection('users');

          const user = { username, password };
          const result = await col.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });

        } catch (err) {

          debug(err);
        }
      }());

    });

  authRouter.route('/singin')
    .get((req,res) => {
      res.render('singin', {
        nav,
        title: 'Sing In'

      });   
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'

    }));
  
  authRouter.route('/profile')
    .all((req,res, next) =>{
      if(req.user){
        next();
      }else{
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

/* For logout */
/* authRouter.route('/logout')
.post((req, res) => {
  const { username, password } = req.body;
  const url = 'mongodb://localhost:27017';
  const dbName = 'libaryAPP';

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true });
      debug('Connect to the server');

      const db = client.db(dbName);

      const col = db.collection('users');

      const user = { username, password };
      const result = await col.findOne(user);
      debug(result);
      req.logout(result.ops[0], () => {
        res.redirect('/');
      });

    } catch (err) {

      debug(err);
    }
  }());

}); */


module.exports = router;

