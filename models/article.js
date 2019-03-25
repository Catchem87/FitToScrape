var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); 

// create schema for database
const Schema = mongoose.Schema;

// create article schema
const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    // notes is an array of reference ids
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note",
        required: false
    }]
});

// plugin to make articles unique
ArticleSchema.plugin(uniqueValidator);

//create article model
const Article = mongoose.model('Article', ArticleSchema);

// export Article
module.exports = Article;