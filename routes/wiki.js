const express = require('express');
const nunjucks = require('nunjucks');
const models = require('../models');
const router = express();
const Page = models.Page;
const User = models.User;

router.engine('html', nunjucks.render); // how to render html templates
router.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true });

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/add', function(req, res, next) {
  res.render('addpage.html');
});

router.post('/add', function(req, res, next) {
  console.log();
  var page = Page.build({
    title: req.body.title,
    urlTitle: Page.route,
    content: req.body.content
  });

  // console.log(page);

  page.save(()=>console.log('saved')).then(function() {
    console.log()
    res.redirect('/');
  })
  .catch((err) => console.error.bind(console))
});


module.exports = router;
