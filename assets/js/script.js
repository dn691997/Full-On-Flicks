// regular api key = k_ix11kdvq

var movieTitleEl = document.getElementById("movie-title");
var posterEl = document.getElementById("poster");
var taglineEl = document.getElementById("tagline")
var plotEl = document.getElementById("plot");
var castListEl = document.getElementById("cast-list");
var searchInputEl = document.getElementById("search-bar");
var searchBtn = document.getElementById("search-btn");
var randomizerBtn = document.getElementById("random-btn");
var directorsEl = document.getElementById("directors-list");
var writersEl = document.getElementById("writers-list");
var ratingEl = document.getElementById("rating");
var runtimeEl = document.getElementById("runtime");
var metacriticEl = document.getElementById("metacritic");
var buttonsContainer = document.getElementById("btn-container");

var getSearchTerm = function () {
    var searchTerm = searchInputEl.value;
    searchInputEl.value = "";
    if (searchTerm) {
        getTitleId(searchTerm)
    } else {
        alert("Please enter a valid search")
    }
}

var getTitleId = function (searchTerm) {
    var apiURL = "https://imdb-api.com/en/API/SearchTitle/k_ix11kdvq/" + searchTerm;

    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                var titleId = data.results[0].id
                console.log(titleId);
                getMovieInfo(titleId);
            })
        } else {
            console.log("Error: There was a problem with your request");
        }
            
    })
}

var getMovieInfo = function (titleId) {
    var apiUrl = "https://imdb-api.com/en/API/Title/k_ix11kdvq/" + titleId;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                castListEl.innerHTML = "";
                posterEl.setAttribute("src", data.image)
                movieTitleEl.textContent = data.fullTitle;
                plotEl.textContent = data.plot;
                taglineEl.textContent = data.tagline;
                
                if (data.actorList[0]) {
                    for (var i = 0; i < 6; i++) {
                        var castMemberName = data.actorList[i].name;
                        var castMemberId = data.actorList[i].id;
                        var castMemberImage = data.actorList[i].image;

                        // create anchor element with it's inner html elements
                        var castAnchorEl = document.createElement("a");
                        castAnchorEl.setAttribute("src", "https://www.imdb.com/name/" + castMemberId + "/");
                        castAnchorEl.setAttribute("target", "_blank");
                        castAnchorEl.innerHTML = "<figure><img src='" + castMemberImage + "' alt='" + castMemberName + "' width='128px'/><figcaption>Leonardo<br/>DiCaprio</figcaption></figure>";
                        castListEl.appendChild(castAnchorEl);
                    } 
                } else {
                    castListEl.textContent = "No cast to display";
                }
            })
        }
    })
}

// "name" external link for <a> https://www.imdb.com/name/ nm0229694 /
// <img src="https://imdb-api.com/images/original/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_Ratio1.0000_AL_.jpg" alt="Leonardo DiCaprio" width="128px"/>

// getTitleId("Inception");