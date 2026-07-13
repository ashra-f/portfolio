export function initOrbitResize() {
  const orbitWrap = document.querySelector(".orbit-wrap");
  const myLinks = document.getElementById("my-links");
  const planetDescription = document.getElementById("planet-description");

  function handleResize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let scaleValueOrbit = 1;
    let scaleValueLinks = 1;
    let scaleValueDescription = 1;
    let descriptionPos = 23;
    let marginBottomLinks = 16;

    if (viewportWidth <= 300) {
      scaleValueOrbit = 0.5;
      if (viewportHeight <= 640) {
        scaleValueLinks = 0.8;
        marginBottomLinks = 0;
      }
    } else if (viewportWidth <= 350) {
      scaleValueOrbit = 0.55;
      if (viewportHeight <= 640) {
        scaleValueLinks = 0.75;
        marginBottomLinks = 0;
      }
    } else if (viewportWidth <= 380) {
      scaleValueOrbit = 0.6;
    } else if (viewportWidth <= 430) {
      scaleValueOrbit = 0.65;
      if (viewportHeight <= 640) {
        scaleValueLinks = 0.8;
        marginBottomLinks = 0;
      }
    } else if (viewportWidth <= 480) {
      scaleValueOrbit = 0.75;
      if (viewportHeight <= 640) {
        scaleValueLinks = 0.8;
        marginBottomLinks = 0;
      }
    } else if (viewportWidth <= 580) {
      scaleValueOrbit = 0.85;
    } else {
      scaleValueOrbit = 1;
    }

    if (viewportHeight <= 858 && viewportWidth <= 733) {
      scaleValueDescription = 0.8;
      descriptionPos = 0;
    }

    orbitWrap.style.transform = `scale(${scaleValueOrbit})`;
    myLinks.style.transform = `scale(${scaleValueLinks})`;
    planetDescription.style.transform = `scale(${scaleValueDescription})`;
    planetDescription.style.left = `${descriptionPos}px`;
    planetDescription.style.bottom = `${descriptionPos}px`;
    myLinks.style.marginBottom = `${marginBottomLinks}px`;
  }

  handleResize();
  window.addEventListener("resize", handleResize);
}
