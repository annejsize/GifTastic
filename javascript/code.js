$(document).ready(function() {

// ------------- GLOBAL VARIABLES ----------------
// ===============================================
// Arrays and variables for holding data
// Create an array with Halloween topics for the API pull
  topics = ["halloween", "ghosts", "pumpkins", "zombies", "scary", "haunted", "monsters", "spirits", "friday the 13th",
    "black cats", "skeletons"];

// ------------- FUNCTIONS ---------------
// ===============================================
//
// First load the buttons to the screen;
  function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic btn btn-lg");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonsGoHere").append(a);
    }
  }
// ------------- MAIN PROCESSES ---------------//
// ===============================================
//

  renderButtons();

  $(document).on("click", ".the-image", function() {
      var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    });
  $(document).on("click", ".topic", function() {
// $(".topic").on("click", function() {
  //Clear screen of previous gifs
    $(".item").empty();
    var type = $(this).attr("data-name");
    //Using the variable w/ the data name, pull in the corresponding data from the
    //Gify API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      type + "&api_key=JbdCgCuYx29OdjjjdH2ozJXykAlzj45g&limit=10";
    // Do the AJAX dance!
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {

          var results = response.data;
          console.log(results);
          // Now for every array within the object
          for (var j = 0; j < results.length; j++) {
              var gifDiv = $("<div class='item'>");
              var rating = results[j].rating;
              var p = $("<p>").text("Rating: " + rating);
              var topicImage = $("<img>");
              topicImage.addClass("the-image");
              topicImage.attr("src", results[j].images.fixed_height_still.url);
              topicImage.attr("data-still", results[j].images.fixed_height_still.url);
              topicImage.attr("data-animate", results[j].images.fixed_height.url);
              topicImage.attr("data-state", "still");
              gifDiv.append(topicImage);
              gifDiv.append(p);
              $("#buttonsGoHere").append(gifDiv);
        }
    });
});

    $("#searchSubmit").on("click", function() {
        var searchTerm = $("input#searchTerm").val();
        // alert(searchTerm);
        $("#buttonsGoHere").empty();
        topics.push(searchTerm);
        renderButtons();
    // Now with the search term, run it through the AJAX function;




    });
});
