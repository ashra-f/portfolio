import { starsParams } from "./starsState.js";

const Z_SPACING = -3500;
const PERSPECTIVE = 300;
const MAX_HEIGHT = 4666;
const MID_HEIGHT = MAX_HEIGHT / 2;

// Reloads/back-forward navigations used to force a hard redirect to "/" to
// reset scroll + frame state, since the browser restores scroll position
// before our JS re-derives frame transforms from it. `scrollRestoration`
// is the standards-based fix (Safari has supported it reliably for a few
// years now); keep the old redirect as a fallback for anything that doesn't.
function resetScrollState() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  } else if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    location.replace("/");
  }
}

export function initScrollCinema() {
  resetScrollState();

  const frames = Array.from(document.querySelectorAll(".frame"));
  const zVals = [Z_SPACING * 2, Z_SPACING * 1, Z_SPACING * 0];
  let lastPos = window.scrollY;

  const goToAbout = document.getElementById("go-to-about");
  const goToSkills = document.getElementById("go-to-skills");
  const goToProjs = document.getElementById("go-to-projs");
  const aboutFrame = document.getElementById("about-frame");
  const skillsFrame = document.getElementById("skills-frame");
  const projectsFrame = document.getElementById("projects-frame");

  goToAbout.addEventListener("click", () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });

  goToSkills.addEventListener("click", () => {
    const delta =
      aboutFrame.style.display === "block" ? MID_HEIGHT : MID_HEIGHT * -1;
    window.scrollBy({ top: delta, behavior: "smooth" });
    setTimeout(() => {
      skillsFrame.style.transform = "translateZ(0px)";
    }, 1000);
  });

  goToProjs.addEventListener("click", () => {
    const delta =
      aboutFrame.style.display === "block" ? MAX_HEIGHT : MID_HEIGHT;
    window.scrollBy({ top: delta, left: 0, behavior: "smooth" });
    setTimeout(() => {
      projectsFrame.style.transform = "translateZ(0px)";
    }, 1000);
  });

  window.addEventListener("scroll", () => {
    goToSkills.disabled = true;
    goToProjs.disabled = true;
    goToAbout.disabled = true;

    const top = window.scrollY;
    const delta = lastPos - top;
    lastPos = top;

    // Spike the starfield speed on scroll, then ease it back down; once
    // it settles, re-enable whichever nav buttons make sense for the
    // frame we landed on.
    starsParams.speed = 120;
    setTimeout(() => {
      const interval = setInterval(() => {
        starsParams.speed -= 5;
        if (starsParams.speed <= 1) {
          starsParams.speed = 3;
          clearInterval(interval);

          if (aboutFrame.style.display === "block") {
            goToProjs.disabled = false;
            goToSkills.disabled = false;
          } else if (skillsFrame.style.display === "block") {
            goToAbout.disabled = false;
            goToProjs.disabled = false;
          } else {
            goToAbout.disabled = false;
            goToSkills.disabled = false;
          }
        }
      }, 100);
    });

    frames.forEach((frame, i) => {
      const newZVal = (zVals[i] += delta * -1.5);
      const transform = `translateZ(${newZVal}px)`;
      const opacity =
        newZVal < 200
          ? 1
          : 1 - parseInt(((newZVal - 200) / (PERSPECTIVE - 200)) * 10) / 10;
      let display = newZVal > PERSPECTIVE ? "none" : "block";

      if (newZVal < -3000) display = "none";

      frame.setAttribute(
        "style",
        `transform:${transform};display:${display};opacity:${opacity}`
      );
    });
  });
}
