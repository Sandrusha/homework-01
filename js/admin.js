function mousePosition(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("mousePos").innerHTML = "Click anywhere to display the coordinates of the mouse: " + "<span>" + coords + "</span>";
    

  }

  //resize
  window.onresize = displayWindowSize;
  window.onload = displayWindowSize;
  var dimensions = document.getElementById("dimensions");


  function displayWindowSize() {
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
      dimensions.innerHTML = myWidth + " x " + myHeight;
  };

  var returnToHomePage = document.getElementById("closeBtn");
  returnToHomePage.addEventListener("click", returnToHp)
  function returnToHp() {
    window.open("index.html", "_self");
  }