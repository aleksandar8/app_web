const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookContreller');


function bookController(bookService, nav) {
  function getIndex(req, res) {

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

  }
  function getById(req, res) {
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
        debug(book);
        book.details = await bookService.getBookById(book.bookId);
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
  }
  function middlewer(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/singin');
    }
  }
  return {
    getIndex,
    getById,
    middlewer
  };
};

module.exports = bookController;