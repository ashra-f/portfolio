const TEXT_LINES = [
  "a software engineer based in",
  `detroit, michigan</span>`,
];

const TYPE_SPEED = 100;
const SCROLL_AT = 20;

export function initTypewriter() {
  const destination = document.getElementById("typedtext");
  let index = 0;
  let charPos = 0;
  let lineLength = TEXT_LINES[0].length;

  function tick() {
    let row = Math.max(0, index - SCROLL_AT);
    let contents = " ";

    while (row < index) {
      contents += TEXT_LINES[row++] + `<br /><span id="my-location">`;
    }

    destination.innerHTML =
      contents +
      TEXT_LINES[index].substring(0, charPos) +
      `<span id="blinker">_</span>`;

    if (charPos++ === lineLength) {
      charPos = 0;
      index++;
      if (index !== TEXT_LINES.length) {
        lineLength = TEXT_LINES[index].length;
        setTimeout(tick, 500);
      }
    } else {
      setTimeout(tick, TYPE_SPEED);
    }
  }

  tick();

  setInterval(() => {
    document.getElementById("blinker")?.classList.toggle("blinker-hidden");
  }, 500);
}
