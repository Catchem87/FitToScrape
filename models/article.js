var mongoose = require('mongoose');

// save a reference to the Schema constructor
var Schema = mongoose.Schema;

// using the constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// this creates our model from the above schema, using mongoose's model method
var Article = mongoose.model('Article', ArticleSchema);

// export the Article model
module.exports = Article;