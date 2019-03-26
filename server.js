var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');

var axios = require('axios');
var cheerio = require('cheerio');

// require all models
var db = require('./models');

var PORT = 3000;

// initialize express
var app = express();

// configure middleware

// use morgan for logging requests
app.use(logger('dev'));
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make public a static folder
app.use(express.static('public'));

// connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// routes
// a GET route for scraping the Toronto Star website
app.get('/scrape', function(req, res) {
    // grab the body of the html with axios
    axios.get('https://www.thestar.com/news/canada.html/').then(function(response) {
        // load into cheerio save to $ for shorthand selector
        var $ = cheerio.load(response.data);

        // grab story class with anchor tag
        $('.story a').each(function(i, element) {
            // save an empty result object
            var result = {};
            // add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .text();
            result.link = $(this)
                .attr("href");
            

            // create a new article using the 'result' object built from srcaping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // view the added result in the console
                    console.log(dbArticle)
                })
                .catch(function(err) {
                    console.log(err);
                });
        });

        // send a message to the client
        res.send('Scrape Complete');
    });
});

// route for getting all Articles from the db
app.get('/articles', function(req, res) {
    // grab every document in the Articles collection
    db.Article.find({})
        .then(function(dbArticle) {
            // if successful, send results to client
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// route for getting notes
app.get('/articles/:id', function(req, res) {
    db.Article.findById(req.params.id)
        .then(function(dbArticle) {
            res.json(dbArticle);
        });
});

app.post('/articles/:id', function(req, res) {
    db.Article.findById(req.params.id)
        .then(function(dbArticle) {
            dbArticle.note.push({title: req.body.title, body: req.body.body});
            dbArticle.save().then(function() {
                res.status(200).end();
            });
        });
});

// start the server
app.listen(PORT, function() {
    console.log('App running on port ' + PORT);
});