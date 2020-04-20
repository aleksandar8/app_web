const express = require('express');
const bookRouter = express.Router();


function route(nav){
  books = [
    {
      title: 'kniga1',
      author: 'fbfgbb',
      gander: 'horor',
      read: false,
    },
    {
      title: 'kniga3',
      author: 'gbhnjmmj',
      gander: 'horor',
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
    }
  ];
  bookRouter.route('/')
    .get((req, res) => {
      res.render('booksListView',
        {
          nav,
          title: 'Novo',
          books
        }
      );
    });
  
  bookRouter.route('/:id')

  .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Novo',
          book: books[id]
        }
      );
    });
 return bookRouter;
}



  



module.exports = route;