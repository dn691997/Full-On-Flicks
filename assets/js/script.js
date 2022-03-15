// imdb regular api key = k_ix11kdvq
// watchmode api key = XtDVqWrPdNevd0HMRCFzh8nSvnBpjdpVoazNV42f

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
                console.log(data);
                // clear out last movie
                castListEl.innerHTML = "";
                directorsList.innerHTML = "";
                writersEl.innerHTML = "";
                // fill out values
                posterEl.setAttribute("src", data.image)
                movieTitleEl.textContent = data.fullTitle;
                plotEl.textContent = data.plot;
                if (data.tagline) {
                    taglineEl.textContent = '"' + data.tagline + '"';
                } else {
                    taglineEl.textContent = "";
                }
                

                
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
                    directionTitle.classList.remove("is-invisible")
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
                if (data.writerList.length > 0) {
                    writerTitle.classList.remove("is-invisible")
                    for (var i=0; i<data.writerList.length;i++) {
                        var writer = document.createElement("li");
                        writer.classList.add("has-text-white-bis", "is-size-6");
                        writer.textContent = data.writerList[i].name;
                        writersEl.appendChild(writer);
                    }
                } else {
                    writerTitle.classList.add("is-invisible");
                }

                if (data.contentRating) {
                    ratingEl.classList.remove("is-invisible")
                    ratingEl.textContent = "Rated: " + data.contentRating
                } else {
                    ratingEl.classList.add("is-invisble")
                }

                if (data.runtimeStr) {
                    runtimeTitle.classList.remove("is-invisible")
                    runtimeEl.textContent = data.runtimeStr
                } else {
                    runtimeTitle.classList.add("is-invisible")
                }

                if (data.metacriticRating) {
                    metaCritic.classList.remove("is-invisible")
                    metacriticEl.textContent = data.metacriticRating
                } else {
                    metaCritic.classList.add("is-invisible");
                }

                getTitleBtns(titleId)
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
    // https://www.programiz.com/javascript/examples/even-odd
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

var getTitleBtns = function (titleId) {
    var apiUrl = "https://api.watchmode.com/v1/title/" + titleId + "/sources/?apiKey=XtDVqWrPdNevd0HMRCFzh8nSvnBpjdpVoazNV42f";

    fetch(apiUrl)
    .then(function (response) {
        if(response.ok) {
            response.json().then(function (data) {
                console.log(data);
                buttonsContainer.innerHTML = "";
                for (var i=0;i<data.length;i++) {
                    // disney btn
                    if (data[i].name == "Disney+" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "Disney+";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "disney");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    // hulu btn
                    } else if (data[i].name == "Hulu" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "Hulu";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "hulu");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    // netflix btn
                    } else if (data[i].name == "Netflix" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "Netflix";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "netflix");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    // paramount button
                    } else if (data[i].name == "Paramount+" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "Paramount+";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "paramount");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    // prime btn
                    } else if (data[i].name == "Amazon Prime" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "Prime";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "prime");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    // hbo btn
                    } else if (data[i].name == "HBO MAX" && data[i].region == "US") {
                        var btnAnchor = document.createElement("a");
                        if (navigator.userAgentData.platform == "Android") {
                            btnAnchor.setAttribute("href", data[i].android_url);
                        } else if (navigator.userAgentData.platform == "iOS") {
                            btnAnchor.setAttribute("href", data[i].ios_url);
                        } else {
                            btnAnchor.setAttribute("href", data[i].web_url);
                        }
                        btnAnchor.setAttribute("target", "_blank");
                        var createdBtn = document.createElement("div");
                        createdBtn.textContent = "HBO Max";
                        btnAnchor.classList.add("column", "button", "is-2", "has-text-weight-bold", "is-size-5", "hbo");
                        btnAnchor.appendChild(createdBtn);
                        buttonsContainer.appendChild(btnAnchor);
                    }
                }
                if (buttonsContainer.innerHTML == "") {
                    var sorryDiv = document.createElement("div");
                    sorryDiv.textContent = "Sorry, we were unable to find a streaming service for this title. 😞"
                    sorryDiv.classList.add("column", "subtitle", "has-text-grey-lighter");
                    buttonsContainer.appendChild(sorryDiv);
                }
            })
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

// https://api.watchmode.com/v1/status/?apiKey=XtDVqWrPdNevd0HMRCFzh8nSvnBpjdpVoazNV42f