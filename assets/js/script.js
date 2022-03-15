// regular api key = k_ix11kdvq

// dom variables
var movieTitleEl = document.getElementById("movie-title");
var posterEl = document.getElementById("poster");
var taglineEl = document.getElementById("tagline")
var plotEl = document.getElementById("plot");
var castListEl = document.getElementById("cast-list");
var searchInputEl = document.getElementById("search-bar");
var searchBtn = document.getElementById("search-btn");
var randomizerBtn = document.getElementById("randomizer-btn");
var directorsList = document.getElementById("directors-list");
var writersEl = document.getElementById("writers-list");
var ratingEl = document.getElementById("rating");
var runtimeEl = document.getElementById("runtime");
var metacriticEl = document.getElementById("metacritic");
var buttonsContainer = document.getElementById("btn-container");
var directionTitle = document.getElementById("direction");
var writerTitle = document.getElementById("writers");
var metaCritic = document.getElementById("meta-critic");
var runtimeTitle = document.getElementById("run-time");

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
            response.json().then(function (data) {
                var titleId = data.results[0].id
                getTitleInfo(titleId);
            })
        } else {
            console.log("Error: There was a problem with your request");
        }
            
    })
}

var getTitleInfo = function (titleId) {
    var apiUrl = "https://imdb-api.com/en/API/Title/k_ix11kdvq/" + titleId;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // clear out last movie
                castListEl.innerHTML = "";
                directorsList.innerHTML = "";
                writersEl.innerHTML = "";
                // fill out values
                posterEl.setAttribute("src", data.image)
                movieTitleEl.textContent = data.fullTitle;
                plotEl.textContent = data.plot;
                taglineEl.textContent = '"' + data.tagline + '"';
                

                
                if (data.actorList[0]) {
                    for (var i = 0; i < 6; i++) {
                        if (data.actorList[i]) {
                            var castMemberName = data.actorList[i].name;
                            var castMemberId = data.actorList[i].id;
                            var castMemberImage = data.actorList[i].image;
                            // tool to split up name
                            var formattedName = castMemberName.replaceAll(" ", "<br/>");
    
                            // create anchor element with it's inner html elements
                            var castAnchorEl = document.createElement("a");
                            castAnchorEl.setAttribute("src", "https://www.imdb.com/name/" + castMemberId + "/");
                            castAnchorEl.setAttribute("target", "_blank");
                            castAnchorEl.innerHTML = "<figure><img src='" + castMemberImage + "' alt='" + castMemberName + "' width='128px'/><figcaption>" + formattedName + "</figcaption></figure>";
                            castListEl.appendChild(castAnchorEl);
                        } else {
                            return;
                        }
                    } 
                } else {
                    castListEl.textContent = "No cast to display";
                }
                // directors list
                if (data.directorList[0]) {
                    for (var i = 0; i < data.directorList.length; i++) {
                        var directorListEl = document.createElement("li");
                        directorListEl.classList.add("has-text-white-bis", "is-size-6");
                        directorListEl.textContent = data.directorList[i].name;
                        directorsList.appendChild(directorListEl);
                    }
                } else {
                    directionTitle.classList.add("is-invisible")
                }
                // writers list
                if (data.writerList[0]) {
                    for (var i=0; i<data.writerList;i++) {
                        var writer = document.createElement("li");
                        writer.classList.add("has-text-white-bis", "is-size-6");
                        writer.textContent = data.writerList[i].name;
                        writersEl.appendChild(writer);
                    }
                } else {
                    writerTitle.classList.add("is-invisible");
                }

                if (data.contentRating) {
                    ratingEl.textContent = "Rated: " + data.contentRating
                } else {
                    ratingEl.classList.add("is-invisble")
                }

                if (data.runtimeStr) {
                    runtimeEl.textContent = data.runtimeStr
                } else {
                    runtimeTitle.classList.add("is-invisible")
                }

                if (data.metacriticRating) {
                    metacriticEl.textContent = data.metacriticRating
                } else {
                    metaCritic.classList.add("is-invisible");
                }
            })
        }
    })
}

var randomNumber = function () {
    // random number up to 250
    var arrayNumber = Math.floor(Math.random() * 250);
    if (arrayNumber === 0) {
        arrayNumber = 1;
    }
    // if even, random movie
    if (arrayNumber % 2 == 0) {
        getRandomMovie(arrayNumber);
    } else {
        getRandomTV(arrayNumber);
    }
}

var getRandomMovie = function (number) {
    fetch("https://imdb-api.com/en/API/Top250Movies/k_ix11kdvq")
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var movieId = data.items[number].id;
                getTitleInfo(movieId);
            })
        } else {
            alert("There was a problem with your request, please try again")
        }
    })
}

var getRandomTV = function (number) {
    fetch("https://imdb-api.com/en/API/Top250TVs/k_ix11kdvq")
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var showId = data.items[number].id;
                getTitleInfo(showId);
            })
        } else {
            alert("There was a problem with your request, please try again")
        }
    })
}

// event listeners
randomizerBtn.addEventListener("click", randomNumber);
searchBtn.addEventListener("click", getSearchTerm);

searchInputEl.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
        getSearchTerm();
    }
})
