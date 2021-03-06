'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var makesRouter = require('./routes');
var bodyParser = require('body-parser');
var models = require('./models');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// module.exports = app;

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


app.use('/', makesRouter)

// app.use(express.static(path.join(__dirname, '/public')));

models.db.sync({force: true}).then(function(){
  app.listen(3000, function(){
    console.log("Server is listening on port 3000!")
  })
})
  .catch(console.error.bind(console));

// models.User.sync({})
// .then(function () {
//     return models.Page.sync({})
// })
// .then(function () {
//     // make sure to replace the name below with your express app
//     app.listen(3000, function () {
//         console.log('Server is listening on port 3000!');
//     });
// })
// .catch(console.error);

// start the server
// var server = app.listen(3000, function(){
//   console.log('listening on port 3000');
// });
