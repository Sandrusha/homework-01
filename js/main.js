var movies = [];

class movie {
    constructor(title, rating) {
        this.title = title;
        this.rating = rating;
        this.maxRating = 5;
        this.minRating = 1;
    }
}

var movie01 = new movie("Shazam!", Math.floor(Math.random() * 5) + 1);
var movie02 = new movie("Dumbo", Math.floor(Math.random() * 5) + 1);
var movie03 = new movie("Joker", Math.floor(Math.random() * 5) + 1);
var movie04 = new movie("The Lion King", Math.floor(Math.random() * 5) + 1);

movies.push(movie01);
movies.push(movie02);
movies.push(movie03);
movies.push(movie04);

document.addEventListener("DOMContentLoaded", function() {
    var table = document.getElementById("moviesContainer");
    for (let i = 0; i < movies.length; i++) {
        let moviesIn = movies[i];

    addNewMovieInput(table, moviesIn);
    }

    statisticsNOM();
    statisticsBRM();
    statisticsWM();
    statisticsMR();
});

function setRating(ev) {
    let span = ev.currentTarget;
    let cloneSpan = span.nextSibling;
    while(span) {
        span.classList.add("rated");
        span = span.previousSibling;
    }
    while(cloneSpan) {
        cloneSpan.classList.remove("rated");
        cloneSpan = cloneSpan.nextSibling;
    }

    var num = ev.currentTarget.parentNode.getElementsByClassName("rated").length;
    this.parentElement.setAttribute("data-rating", num);
    ev.currentTarget.parentElement.nextElementSibling.firstElementChild.innerHTML = num;

    var movieTitle = ev.currentTarget.parentElement.previousElementSibling.textContent;
    for(i = 0; i < movies.length; i++) {
        if(movies[i].title === movieTitle) {
            movies[i].rating = num;
            break;
        }
    }

    reset();
    startStop();
    statisticsBRM();
    statisticsWM();
    statisticsMR();
}

//add new movie
var container =  document.getElementsByClassName("container")[0];
var headerRow = document.getElementsByTagName("table")[0];
var addDiv = document.createElement("div");
container.insertBefore(addDiv, container.childNodes[0]);
addDiv.setAttribute("class", "addDiv")

var addMovies = document.createElement("input");
addDiv.appendChild(addMovies);
addMovies.setAttribute("id", "addMovie");
document.getElementById("addMovie").placeholder = "Enter a new movie..";

var addButton = document.createElement("button");
addDiv.appendChild(addButton);
addButton.setAttribute("id", "addMovieBtn");
addButton.innerHTML = "Add Movie";
addButton.addEventListener("click", addMovie);

function addNewMovieInput(table, moviesIn) {
    var tableRow = document.createElement("tr");
    headerRow.appendChild(tableRow);

    var row = table.insertRow();
    var cellTitle = row.insertCell();
    cellTitle.innerHTML = moviesIn.title;
    tableRow.appendChild(cellTitle);

    var cellStars = row.insertCell();
    for (var i = 0; i < moviesIn.maxRating; i++) {
        var star = document.createElement("span");
        star.setAttribute("class", "star");
        star.innerHTML = "&nbsp;"
        if(i < moviesIn.rating) {
            star.classList.add("rated");
        }
        star.addEventListener("click", setRating);
        cellStars.appendChild(star);
    }
    tableRow.appendChild(cellStars);
    
    var rating = row.insertCell();
    tableRow.appendChild(rating);

    var spanRating = document.createElement("span");
    rating.appendChild(spanRating);
    spanRating.innerHTML = moviesIn.rating;

    var spanMaxRating = document.createElement("span");
    rating.appendChild(spanMaxRating);
    spanMaxRating.innerHTML = " / " + moviesIn.maxRating;
}

function addMovie() {
    var filmTitle = document.getElementById("addMovie").value;
    var movieNew = new movie(filmTitle, Math.floor(Math.random() * 5) + 1);
    movies.push(movieNew);
    var table = document.getElementById("moviesContainer");
    addNewMovieInput(table, movieNew);
    document.getElementById("addMovie").value = "";

    statisticsNOM();
    statisticsBRM();
    statisticsWM();
    statisticsMR();
}

//create StopWatch
var secondDiv = document.createElement("div");
addDiv.insertBefore(secondDiv, addDiv[0]);
secondDiv.setAttribute("id", "secondDiv");

var displayStopWatch = document.createElement("div");
secondDiv.appendChild(displayStopWatch);
displayStopWatch.setAttribute("id", "display");
displayStopWatch.innerHTML = "Time passed from the last rating: 00:00";

//define vars to hold time values
let seconds = 0;
let minutes = 0;

//define vars to hold display values
let displaySeconds = 0;
let displayMinutes = 0;

//define var to hold setInterval()
let interval = null;

//define var to hold stopWatch status
let status = "stopped";

function stopWatch() {
    seconds ++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes ++;
    }

    if(seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = "Time passed from the last rating: " + "<span>" + displayMinutes + ":" + displaySeconds + "</span>";
}

function startStop() {
    interval = window.setInterval(stopWatch, 1000);
}

function reset() {
    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;

    document.getElementById("display").innerHTML = "Time passed from the last rating: 00:00";
}

//sorting
var sortAZ = document.createElement("button");
secondDiv.appendChild(sortAZ);
sortAZ.setAttribute("id", "sortAZ");
sortAZ.addEventListener("click", sortMoviesAZ);
sortAZ.innerHTML = "Sort A-Z";

var sortZA = document.createElement("button");
secondDiv.appendChild(sortZA);
sortZA.setAttribute("id", "sortZA");
sortZA.addEventListener("click", sortMoviesZA);
sortZA.innerHTML = "Sort Z-A";

var sortLowHigh = document.createElement("button");
secondDiv.appendChild(sortLowHigh);
sortLowHigh.setAttribute("id", "sortLowHigh");
sortLowHigh.addEventListener("click", sortNumericalLH);
sortLowHigh.innerHTML = "Sort ASC after Rating";

var sortHighLow = document.createElement("button");
secondDiv.appendChild(sortHighLow);
sortHighLow.setAttribute("id", "sortHighLow");
sortHighLow.addEventListener("click", sortNumericalHL);
sortHighLow.innerHTML = "Sort DESC after Rating";

function replaceTable(){
    var table = document.getElementById("moviesContainer");
    var rows = table.rows;
    var rowsLength = rows.length;
    for (i = 1; i < rowsLength; i++) {
        table.deleteRow(1);
    }
    for (i = 0; i < movies.length; i++) {
        addNewMovieInput(table, movies[i]);
    }

    statisticsNOM();
}

function sortMoviesAZ(){
    movies.sort(function(a,b){
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();

        if(aTitle < bTitle) {
            return -1;
        } else if(aTitle === bTitle) {
            return 0;
        } else {
            return 1;
        }
    });
    replaceTable();
}

function sortMoviesZA(){
    movies.sort(function(a,b){
        var aTitle = a.title.toLowerCase();
        var bTitle = b.title.toLowerCase();

        if(aTitle < bTitle) {
            return 1;
        } else if(aTitle === bTitle) {
            return 0;
        } else {
            return -1;
        }
    });
    replaceTable();
}

function sortNumericalLH(){
    movies.sort(function(a,b){
        var aRating = a.rating;
        var bRating = b.rating;

        if(aRating < bRating) {
            return -1;
        } else if(aRating === bRating) {
            return 0;
        } else {
            return 1;
        }
    });
    replaceTable();
}

function sortNumericalHL(){
    movies.sort(function(a,b){
        var aRating = a.rating;
        var bRating = b.rating;

        if(aRating < bRating) {
            return 1;
        } else if(aRating === bRating) {
            return 0;
        } else {
            return -1;
        }
    });
    replaceTable();
}


//statistics
function statisticsNOM() {
    document.getElementById("nom").innerHTML = movies.length;
}

function statisticsBRM() {
    var movieTitle = "";
    var maxRating = 0;
    for (i = 0; i < movies.length; i++) {
        if(movies[i].rating > maxRating) {
            maxRating = movies[i].rating;
            movieTitle = movies[i].title;
        }
    }
    document.getElementById("brm").innerHTML = movieTitle;
}

function statisticsWM() {
    var movieTitle = "";
    var minRating = i;
    for (i = 0; i < movies.length; i++) {
        if(movies[i].rating < minRating) {
            minRating = movies[i].rating;
            movieTitle = movies[i].title;
        }
    }
    document.getElementById("wm").innerHTML = movieTitle;
}

function statisticsMR() {
    var mediumRating = 0;
    for (i = 0; i < movies.length; i++) {
        mediumRating += movies[i].rating;
    }
    mediumRating = mediumRating / movies.length;
    document.getElementById("mr").innerHTML = mediumRating;
}

//admin
var admin = document.getElementById("admin");
admin.addEventListener("click", adminMode);

function adminMode(){
    window.open("admin.html", "_self");
}