
// grab the articles as a JSON
$.getJSON('/articles', function(data) {
    // for each one
    for (var i = 0; i < data.length; i ++) {
        //display the apropos information on the page
        $('#articles').append("<p data-id='" + data[i]._id + "'<h4>" + data[i].title + "</h4><br /><a href='https://www.thestar.com" + data[i].link + "'>Link to Article</a></p>");
    }
});

// whenever someone clicks a p tag
$(document).on('click', 'p', function() {
    // empty the notes from the note section
    // $('#notes').empty();
    // save the id from the p tag
    var thisId = $(this).attr('data-id');

    // now make an axios call for the Article
    $.get('/articles/' + thisId).then(function(data) {
        console.log(data);
        // title of article
        $('#notes').html("<h4>" + data.title + "</h4>");
        // enter a new title
        $('#notes').append("<input id='titleinput' name='title' placeholder='Title'>");
        // textarea to add new note body
        $('#notes').append("<textarea id='bodyinput' name='body'>Note</textarea>");
        // a button to submit a new note, with the id of the article saved to it
        $('#notes').append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // if there's a note in the article
        for (var i = 0; i < data.note.length; i++) {
            $('#notes').append("<br />" + data.note[i].title + "<br />");
            

        }
    });
});

// when you click the savenote button 
$(document).on('click', '#savenote', function() {
    // grad the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // run a post request to change the note, using what's entered in the inputs
    $.post('/articles/' + thisId, {
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