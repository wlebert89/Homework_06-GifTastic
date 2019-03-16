var keywordArray = [
  "Night of the Living Dead", 
  "Nightmare on Elm Street",
  "The Shining", 
  "Susperia", 
  "Evil Dead",
  "Rosemary's Baby",
  "The Silence of The Lambs",
  "In The Mouth of Madness",
  "The Mist",
];

keywordArray.reverse();

$("#gif-display").addClass("hide")

function displayGifInfo(){

  var gifName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=9";

  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response){
    console.log(response);

    // empties the existing gif-display section before populating it.
    // I'm choosing to clear the div and then append so the results pertain 
    // only to the button that was most recently clicked.
    $("#gif-display").empty();

    $("#gif-display").removeClass("hide");
    
    var results = response.data;

    // prints the gifs to the screen.
    for (var i = 0; i < results.length; i++){
      var gifDiv = $("<div>").addClass("gif-container");
      var pRating = $("<p>").text("Rating: " + results[i].rating);
      var gif = $("<img>");
      gif.attr("data-state", "still");
      gif.attr("data-animated", results[i].images.fixed_height.url);
      gif.attr("data-still", results[i].images.fixed_height_still.url);
      gif.attr("src", results[i].images.fixed_height_still.url);
      gif.addClass("gif");
      gifDiv.append(gif);
      gifDiv.append(pRating);
      // gifDiv.append("<hr>");
      $("#gif-display").append(gifDiv);
    }
  });
}

function renderButtons(){

  $("#button-display").empty();

  for (var i = 0; i < keywordArray.length; i++){
    var button = $("<button>");
    button.addClass("gif-button");
    button.attr("data-name", keywordArray[i]);
    button.text(keywordArray[i].toUpperCase());
    // I'm prepending the buttons so that the one that gets added shows up first in the list.
    // I did this in order to keep the buttons on one line so that the gif-display div can be
    // set to a fixed-height.
    $("#button-display").prepend(button);
  }
}

$("#add-button").on("click", function(event){

  event.preventDefault();

  var gif = $("#gif-input").val().trim().toUpperCase();

  keywordArray.push(gif);

  renderButtons();

  $("#gif-input").val("");
});

$(document).on("click", ".gif-button", displayGifInfo);

renderButtons();

$("#gif-display").on("click", ".gif", function(){

    var state = $(this).attr("data-state");

    console.log(state);

    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});