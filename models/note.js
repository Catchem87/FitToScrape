var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// create schema Class
const Schema = mongoose.Schema;

// create note schema
const NoteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

// add unique-validator plugin
NoteSchema.plugin(uniqueValidator);

// create the Note model with the NoteSchema
const Note = mongoose.model('Note', NoteSchema);

// export the model
model.exports = Note;