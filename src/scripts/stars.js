import { starsParams } from "./starsState.js";

export function initStars() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  let renderW = 0;
  let renderH = 0;
  let center = [0, 0];
  let starsElements = [];

  class Star {
    constructor() {
      this.x = Math.random() * renderW;
      this.y = Math.random() * renderH;
      this.z = Math.random() * renderW;
    }

    move() {
      this.z -= starsParams.speed;
      if (this.z <= 0) this.z = renderW;
    }

    show() {
      const x = (this.x - center[0]) * (renderW / this.z) + center[0];
      const y = (this.y - center[1]) * (renderW / this.z) + center[1];
      const rad = renderW / this.z;
      const opacity =
        rad > starsParams.extinction
          ? 1.5 * (2 - rad / starsParams.extinction)
          : 1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function setupCanvas() {
    // Backing store is scaled to devicePixelRatio so the field renders
    // sharp on retina displays; star math stays in CSS-pixel space via
    // ctx.setTransform so the visuals are unchanged from a 1x display.
    const dpr = window.devicePixelRatio || 1;
    renderW = window.innerWidth;
    renderH = window.innerHeight;
    center = [renderW * 0.5, renderH * 0.5];

    canvas.width = renderW * dpr;
    canvas.height = renderH * dpr;
    canvas.style.width = `${renderW}px`;
    canvas.style.height = `${renderH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    starsElements = Array.from(
      { length: starsParams.number },
      () => new Star()
    );
  }

  function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, renderW, renderH);
    starsElements.forEach((star) => {
      star.show();
      star.move();
    });
    window.requestAnimationFrame(draw);
  }

  setupCanvas();
  draw();
  window.addEventListener("resize", setupCanvas);
}
