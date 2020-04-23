const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

function route(nav) {
  const { getIndex, getById, middlewer } = bookController(bookService, nav);
  bookRouter.use(middlewer);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = route;