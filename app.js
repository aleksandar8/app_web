var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');

 var app = express();

 app.use(morgan('tiny'));

 app.get('/', function(req, res){
   res.send('This a WEB APP');
 });

 app.listen(7777, function(){
   debug(`Server listening on port ${chalk.green('5000')}`);
 });
