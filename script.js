(function () {
  "use strict";

  const START_DATE = new Date(2025, 10, 18);

  function calculateDaysTogether(startDate, today = new Date()) {
    if (
      !(startDate instanceof Date) ||
      Number.isNaN(startDate.getTime()) ||
      !(today instanceof Date) ||
      Number.isNaN(today.getTime())
    ) {
      return null;
    }

    const startUtc = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const todayUtc = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const days = Math.floor((todayUtc - startUtc) / 86400000) + 1;

    return days >= 1 ? days : null;
  }

  function renderDaysTogether() {
    const countElement = document.getElementById("days-count");
    if (!countElement) {
      return;
    }

    const days = calculateDaysTogether(START_DATE, new Date());
    if (days !== null) {
      countElement.textContent = String(days);
      createNumberSparkles();
    }
  }

  function createStars() {
    const container = document.getElementById("stars");
    if (!container) {
      return;
    }

    const starCount = window.innerWidth < 600 ? 60 : 110;
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < starCount; index += 1) {
      const star = document.createElement("span");
      const size = (1.6 + Math.random() * 3).toFixed(2);
      const x = (2 + Math.random() * 96).toFixed(2);
      const y = (2 + Math.random() * 96).toFixed(2);
      const delay = (-4 * Math.random()).toFixed(2);
      const duration = (2.2 + Math.random() * 2.6).toFixed(2);

      star.className = "star";
      star.style.setProperty("--star-x", `${x}%`);
      star.style.setProperty("--star-y", `${y}%`);
      star.style.setProperty("--star-size", `${size}px`);
      star.style.setProperty("--star-delay", `${delay}s`);
      star.style.setProperty("--star-duration", `${duration}s`);
      fragment.appendChild(star);
    }

    container.textContent = "";
    container.appendChild(fragment);
  }

  function createNumberSparkles() {
    const numberElement = document.getElementById("days-count");
    if (!numberElement) {
      return;
    }

    const layer = document.createElement("span");
    const sparkleCount = window.innerWidth < 600 ? 8 : 12;
    layer.className = "number-sparkles";
    layer.setAttribute("aria-hidden", "true");

    for (let index = 0; index < sparkleCount; index += 1) {
      const sparkle = document.createElement("span");
      const size = (2 + Math.random() * 3.2).toFixed(2);
      const x = (index === 0 ? 50 : 4 + Math.random() * 92).toFixed(2);
      const y = (index === 0 ? 50 : 4 + Math.random() * 92).toFixed(2);
      const delay = (-4 * Math.random()).toFixed(2);
      const duration = (1.6 + Math.random() * 1.8).toFixed(2);

      sparkle.className = "star number-star";
      sparkle.style.setProperty("--star-x", `${x}%`);
      sparkle.style.setProperty("--star-y", `${y}%`);
      sparkle.style.setProperty("--star-size", `${size}px`);
      sparkle.style.setProperty("--star-delay", `${delay}s`);
      sparkle.style.setProperty("--star-duration", `${duration}s`);
      layer.appendChild(sparkle);
    }

    numberElement.appendChild(layer);
  }
  function setupDiscButton() {
    const button = document.getElementById("disc-button");
    const audio = document.getElementById("bg-music");
    if (!button || !audio) {
      return;
    }

    let isPlaying = false;

    function setPlaying(playing) {
      isPlaying = playing;
      button.classList.toggle("is-spinning", playing);
      button.setAttribute("aria-pressed", String(playing));
      button.setAttribute("aria-label", playing ? "鏆傚仠闊充箰" : "鎾斁闊充箰");
    }

    button.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        setPlaying(false);
        return;
      }

      const playPromise = audio.play();
      setPlaying(true);

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => setPlaying(false));
      }
    });

    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("play", () => setPlaying(true));
  }
  function createLoveWords() {
    const layer = document.getElementById("love-layer");
    if (!layer) {
      return;
    }

    const lineCount = window.innerWidth < 600 ? 26 : 38;
    const pixelFont = {
      i: ["00100", "00000", "01100", "00100", "00100", "00100", "01110"],
      l: ["01100", "00100", "00100", "00100", "00100", "00100", "01110"],
      o: ["00000", "00000", "01110", "10001", "10001", "10001", "01110"],
      v: ["00000", "00000", "10001", "10001", "10001", "01010", "00100"],
      e: ["00000", "01110", "10001", "11111", "10000", "10001", "01110"],
      y: ["00000", "00000", "10001", "10001", "01010", "00100", "01000"],
      u: ["00000", "00000", "10001", "10001", "10001", "10011", "01101"]
    };
    const text = "i love you";

    function drawPixelText(canvas, pixelSize, alpha) {
      const context = canvas.getContext("2d");
      const letterColumns = 5;
      const letterSpacing = 1;
      const rowCount = 7;
      const columnStep = letterColumns + letterSpacing;
      const totalColumns = text.length * columnStep - letterSpacing;
      canvas.width = totalColumns * pixelSize;
      canvas.height = rowCount * pixelSize;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      context.imageSmoothingEnabled = false;
      context.fillStyle = `rgba(156, 73, 112, ${alpha})`;

      Array.from(text).forEach((character, characterIndex) => {
        const pattern = pixelFont[character] || null;
        if (!pattern) {
          return;
        }

        pattern.forEach((row, rowIndex) => {
          Array.from(row).forEach((value, columnIndex) => {
            if (value === "1") {
              context.fillRect(
                (characterIndex * columnStep + columnIndex) * pixelSize,
                rowIndex * pixelSize,
                pixelSize,
                pixelSize
              );
            }
          });
        });
      });
    }

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < lineCount; index += 1) {
      const line = document.createElement("canvas");
      const alpha = (0.18 + Math.random() * 0.24).toFixed(2);
      const landscape = window.innerWidth >= window.innerHeight;
      const linesPerBand = lineCount / 2;
      const bandIndex = Math.floor(index / linesPerBand);
      const slotIndex = index % linesPerBand;
      let x;
      let y;
      let pixelSize;
      let scale;

      if (landscape) {
        const sideWidthPercent = ((window.innerWidth - window.innerHeight) / 2 / window.innerWidth) * 100;
        const bandWidth = sideWidthPercent * (0.28 + Math.random() * 0.44);
        x = bandIndex === 0 ? bandWidth : 100 - sideWidthPercent + bandWidth;
        y = ((slotIndex + 0.5) / linesPerBand) * 100 + (Math.random() * 2.4 - 1.2);
        pixelSize = 3;
        scale = (0.55 + Math.random() * 0.3).toFixed(2);
      } else {
        const bandHeightPercent = ((window.innerHeight - window.innerWidth) / 2 / window.innerHeight) * 100;
        const columns = 3;
        const rows = Math.ceil(linesPerBand / columns);
        const row = Math.floor(slotIndex / columns);
        const column = slotIndex % columns;
        x = ((column + 0.5) / columns) * 100 + (Math.random() * 3 - 1.5);
        y = ((row + 0.5) / rows) * bandHeightPercent + (Math.random() * 1.2 - 0.6);
        if (bandIndex === 1) {
          y += 100 - bandHeightPercent;
        }
        pixelSize = 2;
        scale = (0.48 + Math.random() * 0.34).toFixed(2);
      }

      const rotation = "0.0";

      line.className = "love-line";
      line.dataset.pixelStyle = "true";
      line.setAttribute("aria-hidden", "true");

      if (index % 6 === 2) {
        line.classList.add("love-line--twinkle");
        line.style.setProperty(
          "--love-duration",
          `${(2.4 + Math.random() * 2.2).toFixed(2)}s`
        );
        line.style.setProperty(
          "--love-delay",
          `${(-4 * Math.random()).toFixed(2)}s`
        );
      }
      line.style.setProperty("--love-x", `${x}%`);
      line.style.setProperty("--love-y", `${y}%`);
      line.style.setProperty("--love-rotate", `${rotation}deg`);
      line.style.setProperty("--love-scale", scale);
      drawPixelText(line, pixelSize, alpha);
      fragment.appendChild(line);
    }

    layer.textContent = "";
    layer.appendChild(fragment);
  }
  function initializePage() {
    renderDaysTogether();
    createStars();
    setupDiscButton();
    createLoveWords();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializePage, {
        once: true,
      });
    } else {
      initializePage();
    }
  }

  if (typeof window !== "undefined") {
    window.calculateDaysTogether = calculateDaysTogether;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { calculateDaysTogether };
  }
})();
(function () {
  "use strict";
  if (typeof document === "undefined") return;

  function setupChoiceModal() {
    var triggers = [
      document.getElementById("next-corner-button")
    ].filter(Boolean);
    var modal = document.getElementById("choice-modal");
    var yes = document.getElementById("choice-yes");
    var no = document.getElementById("choice-no");

    if (!triggers.length || !modal || !yes || !no) return;
    var lastTrigger = triggers[0];

    function openModal(event) {
      lastTrigger = event.currentTarget || triggers[0];
      modal.hidden = false;
      window.requestAnimationFrame(function () {
        modal.classList.add("is-open");
        yes.focus({ preventScroll: true });
      });
    }

    function closeModal() {
      modal.classList.remove("is-open");
      window.setTimeout(function () {
        modal.hidden = true;
        lastTrigger.focus({ preventScroll: true });
      }, 180);
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", openModal);
    });
    no.addEventListener("click", closeModal);
    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) closeModal();
    });
    document.documentElement.dataset.choiceModalReady = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupChoiceModal, { once: true });
  } else {
    setupChoiceModal();
  }
})();

(function () {
  "use strict";
  if (typeof document === "undefined") return;

  function setupHeartLink() {
    var heart = document.getElementById("love-corner-button");
    if (!heart) return;

    heart.addEventListener("click", function () {
      window.location.href = "carousel-loader.html";
    });
    document.documentElement.dataset.heartLinkReady = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupHeartLink, { once: true });
  } else {
    setupHeartLink();
  }
})();