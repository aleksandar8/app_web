const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app: bookRoutes');

const bookRouter = express.Router();


function route(nav) {

  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libaryAPP';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect to the server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render('booksListView',
            {
              nav,
              title: 'Novo',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());

    });

  bookRouter.route('/:id')

    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libaryAPP';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connect to the server');

          const db = client.db(dbName);

          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });

            debug (book);          

          res.render(
            'bookView',
            {
              nav,
              title: 'Novo',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }


      }())


    });
  return bookRouter;
}







module.exports = route;