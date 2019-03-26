import { threadId } from "worker_threads";

// grab the articles as a JSON
$.getJSON('/articles', function(data) {
    // for each one
    for (var i = 0; i < data.length; i ++) {
        //display the apropos information on the page
        $('#articles').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// whenever someone clicks a p tag
$(document).on('click', 'p', function() {
    // empty the notes from the note section
    $('#notes').empty();
    // save the id from the p tag
    var thisId = $(this).attr('data-id');

    // now make an axios call for the Article
    axios.get('/articles/' + thisId).then(function(data) {
        console.log(data);
        // title of article
        $('#notes').append("<h2>" + data.title + "</h2>");
        // enter a new title
        $('#notes').append("<input id='titleinput' name='title' >");
        // textarea to add new note body
        $('#notes').append("<textarea id='bodyinput' name='body'></textarea>");
        // a button to submit a new note, with the id of the article saved to it
        $('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // if there's a note in the article
        if (data.note) {
            // place the title of the note in the title input
            $('#titleinput').val(data.note.title);
            // place the body of the note in the body textarea
            $('#bodyinput').val(data.note.body);
        }
    });
});

// when you click the savenote button 
$(document).on('click', '#savenote', function() {
    // grad the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // run a post request to change the note, using what's entered in the inputs
    axios.post('/articles/' + threadId, {
        title: $('#titleinput').val(),
        body: $('#bodyinput').val()
    }).then((res) => {
        console.log(res)
        // empty the notes section
        $('#notes').empty();
    });

    // remove the values entered in the input and textarea for note entry
    $('#titleinput').val("");
    $('#bodyinput').val("");
});