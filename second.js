(function () {
  "use strict";

  function randomBetween(minimum, maximum) {
    return minimum + Math.random() * (maximum - minimum);
  }

  function createHearts() {
    const layer = document.getElementById("heart-layer");
    if (!layer) {
      return;
    }

    const landscape = window.innerWidth >= window.innerHeight;
    const count = landscape ? 38 : 28;
    const safeLeft = landscape ? 15 : 8;
    const safeRight = landscape ? 85 : 92;
    const safeTop = landscape ? 9 : 28;
    const safeBottom = landscape ? 91 : 72;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < count; index += 1) {
      const heart = document.createElement("span");
      const useSideZone = landscape && index % 3 === 1;
      let x;
      let y;

      if (useSideZone) {
        const useLeftSide = index % 2 === 0;
        x = useLeftSide
          ? randomBetween(1.5, safeLeft - 2)
          : randomBetween(safeRight + 2, 98.5);
        y = randomBetween(5, 95);
      } else {
        const useTopZone = index % 2 === 0;
        x = randomBetween(3, 97);
        y = useTopZone
          ? randomBetween(1.5, safeTop - 2)
          : randomBetween(safeBottom + 2, 98.5);
      }

      heart.className = "heart";
      heart.textContent = "❤️";
      heart.setAttribute("aria-hidden", "true");
      heart.style.setProperty("--heart-x", `${x.toFixed(2)}%`);
      heart.style.setProperty("--heart-y", `${y.toFixed(2)}%`);
      heart.style.setProperty(
        "--heart-size",
        `${randomBetween(0.95, 1.75).toFixed(2)}rem`
      );
      heart.style.setProperty(
        "--heart-opacity",
        randomBetween(0.58, 0.94).toFixed(2)
      );
      heart.style.setProperty(
        "--heart-duration",
        `${randomBetween(4.2, 7.8).toFixed(2)}s`
      );
      heart.style.setProperty(
        "--heart-delay",
        `${(-8 * Math.random()).toFixed(2)}s`
      );
      heart.style.setProperty(
        "--heart-drift",
        `${randomBetween(-24, 24).toFixed(1)}px`
      );
      fragment.appendChild(heart);
    }

    layer.textContent = "";
    layer.appendChild(fragment);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createHearts, { once: true });
  } else {
    createHearts();
  }
})();