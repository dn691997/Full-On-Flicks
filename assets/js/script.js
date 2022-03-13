// regular api key = k_ix11kdvq

var movieTitleEl = document.getElementById("movie-title");
var posterEl = document.getElementById("poster");
var plotEl = document.getElementById("plot");
var castListEl = document.getElementById("cast-list");
var searchInputEl = document.getElementById("search-bar");
var searchBtn = document.getElementById("search-btn");
var randomizerBtn = document.getElementById("random-btn");

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
                console.log(data.image);
                posterEl.setAttribute("src", data.image)
                movieTitleEl.textContent = data.fullTitle;
                plotEl.textContent = data.plot;

            })
        }
    })
}

// "name" external link for <a> https://www.imdb.com/name/ nm0229694 /
// <img src="https://imdb-api.com/images/original/MV5BMjI0MTg3MzI0M15BMl5BanBnXkFtZTcwMzQyODU2Mw@@._V1_Ratio1.0000_AL_.jpg" alt="Leonardo DiCaprio" width="128px"/>

// getTitleId("Inception");