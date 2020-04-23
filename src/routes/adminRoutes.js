const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app: adminRoutes');

const adminRouter = express.Router();

books = [
  {
    title: 'kniga1',
    author: 'fbfgbb',
    gander: 'horor',
    read: false,
  },
  {
    title: 'kniga2',
    author: 'gbhnjmmj',
    gander: 'horor',
    read: false,
  },
  {
    title: 'kniga3',
    author: 'gbhnjmmj',
    gander: 'drama',
    read: false,
  },
  {
    title: 'kniga4',
    author: 'gbhnjmmj',
    gander: 'drama',
    read: false,
  },
  {
    title: 'kniga5',
    author: 'gbhnjmmj',
    gander: 'drama',
    read: false,
  },
  {
    title: 'kniga6',
    author: 'gbhnjmmj',
    gander: 'drama',
    read: false,
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {

      const url = 'mongodb://localhost:27017';
      const dbName = 'libaryAPP';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect to the server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}


module.exports = router;