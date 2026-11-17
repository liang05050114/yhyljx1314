(function () {
  "use strict";

  var button = document.getElementById("envelope-button");
  if (!button) return;

  button.addEventListener("click", function () {
    button.classList.remove("is-opening");
    void button.offsetWidth;
    button.classList.add("is-opening");
    window.setTimeout(function () {
      window.location.href = "letter.html";
    }, 800);
  });

  document.documentElement.dataset.envelopeReady = "true";
})();
