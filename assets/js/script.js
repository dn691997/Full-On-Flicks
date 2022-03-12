var movieTitleEl = document.getElementById("movie-title");

var getMediaInfo = function (searchTerm) {
    var apiURL = "https://imdb-api.com/en/API/SearchTitle/pk_m6u8tbzjtv90dh6f4/the batman";

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);

        } else {
            console.log("Error: There was a problem with your request");
        }
    })
}

getMediaInfo("words");