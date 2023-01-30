// DOM selectors
const stars = document.getElementById("stars");
const starsCtx = stars.getContext("2d");
const output = document.querySelector("#speed");

// global variables
let screen,
  starsElements,
  starsParams = { speed: 1, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// update stars on resize to keep them centered
window.onresize = function () {
  setupStars();
};

// star constructor
function Star() {
  this.x = Math.random() * stars.width;
  this.y = Math.random() * stars.height;
  this.z = Math.random() * stars.width;

  this.move = function () {
    this.z -= starsParams.speed;
    if (this.z <= 0) {
      this.z = stars.width;
    }
  };

  this.show = function () {
    let x, y, rad, opacity;
    x = (this.x - screen.c[0]) * (stars.width / this.z);
    x = x + screen.c[0];
    y = (this.y - screen.c[1]) * (stars.width / this.z);
    y = y + screen.c[1];
    rad = stars.width / this.z;
    opacity =
      rad > starsParams.extinction
        ? 1.5 * (2 - rad / starsParams.extinction)
        : 1;

    starsCtx.beginPath();
    starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    starsCtx.arc(x, y, rad, 0, Math.PI * 2);
    starsCtx.fill();
  };
}

// setup <canvas>, create all the starts
function setupStars() {
  screen = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  };
  window.cancelAnimationFrame(updateStars);
  stars.width = screen.w;
  stars.height = screen.h;
  starsElements = [];
  for (let i = 0; i < starsParams.number; i++) {
    starsElements[i] = new Star();
  }
}

// redraw the frame
function updateStars() {
  starsCtx.fillStyle = "black";
  starsCtx.fillRect(0, 0, stars.width, stars.height);
  starsElements.forEach(function (s) {
    s.show();
    s.move();
  });
  window.requestAnimationFrame(updateStars);
}

// set up text to print, each item in array is new line
var aText = new Array(
  `a software engineering student based in`,
  `detroit, michigan</span>`
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ""; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
  sContents = " ";
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + `<br /><span id="my-location">`;
  }
  destination.innerHTML =
    sContents +
    aText[iIndex].substring(0, iTextPos) +
    `<span id="blinker">_</span>`;
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 500);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
  // blinker animation forever
  setInterval(function () {
    $("#blinker").fadeToggle(500);
  }, 500);
}

// global variable to store gifs
let gifs;

// fetch gifs
fetch("http://localhost:5000/api/gifs")
  .then((response) => response.json())
  .then((data) => {
    gifs = data[0];
  })
  .catch((error) => {
    console.error("Error:", error);
  });

jQuery(function () {
  // Scroll to section
  $("a[href*=\\#]").on("click", function (e) {
    e.preventDefault();
    // increase starsparms.speed for 1 seconds then slowly decrease it by 5 until it reaches 1
    starsParams.speed = 100;
    setTimeout(function () {
      let interval = setInterval(function () {
        starsParams.speed -= 5;
        if (starsParams.speed <= 1) {
          starsParams.speed = 3;
          clearInterval(interval);
        }
      }, 100);
    }, 1000);

    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top },
      500,
      "linear"
    );
  });

  $(document)
    .on("mouseenter", "#my-location", function () {
      // if gifs array is undefined, return
      if (gifs === undefined) return;

      // pick a random gif
      const gif_url = gifs[Math.floor(Math.random() * gifs.length)];

      // add an img tag with id mich-gif and the random gif
      $(this).append(
        `<img id="mich-gif" src="../imgs/michigan-gifs/${gif_url}" />`
      );
    })
    .on("mouseleave", "#my-location", function () {
      // remove the img tag with id mich-gif
      $("#mich-gif").remove();
    });

  typewriter();
});
