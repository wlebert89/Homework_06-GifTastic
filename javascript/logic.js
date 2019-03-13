var keywordArray = ["The Who", "The Beatles", "Radiohead", "Neil Young"];

function displayGifInfo(){

  var gifName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=9";

  $.ajax({
    url: queryURL,
    method: "GET" 
  }).then(function(response){
    console.log(response);

    // empties the existing gif-display section before populating it.
    $("#gif-display").empty();
    
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
      gifDiv.append("<hr>");
      $("#gif-display").append(gifDiv); //I'm choosing to clear the div and then append so the results load faster.
    }
  });
}

function renderButtons(){

  $("#button-display").empty();

  for (var i = 0; i < keywordArray.length; i++){
    var button = $("<button>");
    button.addClass("gif-button");
    button.attr("data-name", keywordArray[i]);
    button.text(keywordArray[i]);
    $("#button-display").append(button);
  }
}

$("#add-button").on("click", function(event){

  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  keywordArray.push(gif);

  renderButtons();
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