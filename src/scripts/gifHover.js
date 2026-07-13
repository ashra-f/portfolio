const GIFS = [
  "Animated-Flag-Michigan.gif",
  "byebyebye.gif",
  "det-pizza.gif",
  "det-steel.gif",
  "em-fire.gif",
  "idek-man.gif",
  "lion-go-spin.gif",
  "nonono.gif",
  "num1-michigan.gif",
  "ohhhhhhh.gif",
  "pisstons.gif",
  "protect-democracy-protect-the-vote.gif",
];

// #my-location is re-created by the typewriter as it types, and
// mouseenter/mouseleave don't bubble, so delegate from document in the
// capture phase (capture-phase listeners still fire on the way down to
// the target regardless of the event's bubbling behavior).
export function initGifHover() {
  document.addEventListener(
    "mouseenter",
    (event) => {
      const target = event.target.closest?.("#my-location");
      if (!target) return;

      const gif = GIFS[Math.floor(Math.random() * GIFS.length)];
      const img = document.createElement("img");
      img.id = "mich-gif";
      img.src = `/imgs/michigan-gifs/${gif}`;
      target.appendChild(img);
    },
    true
  );

  document.addEventListener(
    "mouseleave",
    (event) => {
      const target = event.target.closest?.("#my-location");
      if (!target) return;

      document.getElementById("mich-gif")?.remove();
    },
    true
  );
}
