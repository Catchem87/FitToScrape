'use strict';

// dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

// setup express app
const PORT = process.env.PORT || 8000;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json '}));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(require('./controllers'));

// configure mongoose and start the server
mongoose.Promise = Promise;

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/newsArticles';

// database configuration with mongoose
mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true });

const db = mongoose.connection;

// show any mongoose errors
db.on('error', function(error) {
    console.log('Mongoose Error: ', error);
});

// once logged into the database, log a success message
db.once('open', function() {
    console.log('Mongoose connection successful.');
    // start server
    app.listen(PORT, function() {
        console.log('App running on port ' + PORT);
    });
});

module.exports = app;
