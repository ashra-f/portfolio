// To prevent Firefox FOUC, this must be here
let FF_FOUC_FIX;

// If refresh is true, click the home button (fixes navigation bug)
if (performance.getEntriesByType("navigation")[0].type === "reload") {
  location.replace("/");
}

// Function that keeps track of css transform value of frame box
function getTransformValue(el, prop) {
  var transform =
    el.css("-webkit-transform") ||
    el.css("-moz-transform") ||
    el.css("transform");
  var matrix = transform.replace(/[^0-9\-.,]/g, "").split(",");
  var value = matrix[14];
  return parseInt(value);
}

// Function to set transform value of frame box
function setTransformValue(el, value) {
  el.css("-webkit-transform", "translateZ(" + value + "px)");
  el.css("-moz-transform", "translateZ(" + value + "px)");
  el.css("transform", "translateZ(" + value + "px)");
  // console.log("set transform value to " + value);
}

// Set about-frame's display to none
$("#go-to-about").prop("disabled", true);

/* STARS BACKGROUND */
const stars = document.getElementById("stars");
const starsCtx = stars.getContext("2d");
const output = document.querySelector("#speed");

let screen,
  starsElements,
  starsParams = { speed: 1.5, number: 300, extinction: 4 };

// // Run stars
setupStars();
updateStars();

// // Update stars on resize to keep them centered
window.onresize = function () {
  setupStars();
};

// Star constructor
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

// Setup <canvas>, create all the starts
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

// Redraw the frame
function updateStars() {
  starsCtx.fillStyle = "black";
  starsCtx.fillRect(0, 0, stars.width, stars.height);
  starsElements.forEach(function (s) {
    s.show();
    s.move();
  });
  window.requestAnimationFrame(updateStars);
}

/* TYEPWRITER */
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

/* FETCH GIFS */
let gifs;

fetch("http://localhost:5000/api/gifs")
  .then((response) => response.json())
  .then((data) => {
    gifs = data[0];
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/* SCROLL ANIMATION */
var lastPos = document.body.scrollTop || document.documentElement.scrollTop,
  perspective = 300,
  zSpacing = -3500;
(zVals = []), ($frames = $(".frame")), (frames = $frames.toArray());
numFrames = $frames.length;

// print the z height of each frame

zVals.push(zSpacing * 2);
zVals.push(zSpacing * 1);
zVals.push(zSpacing * 0);

$(window).on("scroll", function (d, e) {
  // disable all navigation buttons
  $("#go-to-skills").prop("disabled", true);
  $("#go-to-projs").prop("disabled", true);
  $("#go-to-about").prop("disabled", true);

  // e.preventDefault();
  var top = document.body.scrollTop || document.documentElement.scrollTop,
    delta = lastPos - top;
  lastPos = top;

  // increase starsparms.speed for 1 seconds then slowly decrease it by 5 until it reaches 1
  starsParams.speed = 120;
  setTimeout(function () {
    let interval = setInterval(function () {
      starsParams.speed -= 5;
      if (starsParams.speed <= 1) {
        starsParams.speed = 3;
        clearInterval(interval);
        // get about frame's display property
        let aboutDisplay = $("#about-frame").css("display");
        let skillsDisplay = $("#skills-frame").css("display");
        // let projectsDisplay = $("#projects-frame").css("display");

        if (aboutDisplay === "block") {
          $("#go-to-projs").prop("disabled", false);
          $("#go-to-skills").prop("disabled", false);
        } else if (skillsDisplay === "block") {
          $("#go-to-about").prop("disabled", false);
          $("#go-to-projs").prop("disabled", false);
        } else {
          $("#go-to-about").prop("disabled", false);
          $("#go-to-skills").prop("disabled", false);
        }
      }
    }, 100);
  });

  for (var i = 0; i < numFrames; i++) {
    var newZVal = (zVals[i] += delta * -1.5),
      frame = frames[i],
      transform = "translateZ(" + newZVal + "px)",
      opacity =
        newZVal < 200
          ? 1
          : 1 - parseInt(((newZVal - 200) / (perspective - 200)) * 10) / 10,
      display = newZVal > perspective ? "none" : "block";

    // set display to none if newZVal is less -3000
    if (newZVal < -3000) {
      display = "none";
    }

    frame.setAttribute(
      "style",
      "transform:" +
        transform +
        "-webkit-transform:" +
        transform +
        ";-moz-transform:" +
        transform +
        ";display:" +
        display +
        ";opacity:" +
        opacity
    );
  }
});

/* SECTION NAVIGATION */
// Go to About Section
$("#go-to-about").on("click", function () {
  // scroll to the top slowly by 100 until reach top of page
  var interval = setInterval(function () {
    // clear interval if already at top
    if ($(window).scrollTop() === 0) {
      clearInterval(interval);
    }
    $(window).scrollTop($(window).scrollTop() - 200);
  }, 100);
});

// Go to Skills Section
$("#go-to-skills").on("click", function () {
  // if already there return

  // check if about section is visible, if so scroll down, else scroll up
  var aboutDisplayType = $("#about-frame").css("display");
  if (aboutDisplayType !== "none") {
    // keep scrolling until #skills-frame transform value is 0
    var interval = setInterval(function () {
      var transform = getTransformValue($("#skills-frame"));
      if (transform > -200 && transform < -150) {
        // wait 1 second then set the transform value to 0, -webkit-transform to 0, -moz-transform to 0
        setTimeout(function () {
          $("#skills-frame").css({
            transform: "translateZ(0px)",
            "-webkit-transform": "translateZ(0px)",
            "-moz-transform": "translateZ(0px)",
          });
        }, 1000);

        clearInterval(interval);
      } else {
        // scroll DOWN by 150
        $(window).scrollTop($(window).scrollTop() + 150);
      }
    });
  } else {
    // keep scrolling until #skills-frame transform value is 0
    var interval = setInterval(function () {
      var transform = getTransformValue($("#skills-frame"));
      if (transform > 50 && transform < 200) {
        // wait 1 second then set the transform value to 0, -webkit-transform to 0, -moz-transform to 0
        setTimeout(function () {
          $("#skills-frame").css({
            transform: "translateZ(0px)",
            "-webkit-transform": "translateZ(0px)",
            "-moz-transform": "translateZ(0px)",
          });
        }, 1000);

        clearInterval(interval);
      } else {
        // scroll UP by 10
        $(window).scrollTop($(window).scrollTop() - 150);
      }
    });
  }
});

// Go to Projects Section
$("#go-to-projs").on("click", function () {
  // if already there return
  var projsTransform = getTransformValue($("#projects-frame"));
  if (projsTransform > -400 && projsTransform < 300) return;

  // keep scrolling until #projs-frame transform value is 0
  var interval = setInterval(function () {
    var transform = getTransformValue($("#projects-frame"));
    if (transform > -150 && transform < 50) {
      // wait 1 second then set the transform value to 0, -webkit-transform to 0, -moz-transform to 0
      setTimeout(function () {
        $("#projects-frame").css({
          transform: "translateZ(0px)",
          "-webkit-transform": "translateZ(0px)",
          "-moz-transform": "translateZ(0px)",
        });
      }, 1000);

      clearInterval(interval);
    } else {
      // scroll down by 100
      // console.log("scrolling down");
      $(window).scrollTop($(window).scrollTop() + 100);
    }
  });
});

jQuery(function () {
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
