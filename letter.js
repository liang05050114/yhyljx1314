(function () {
  "use strict";

  var stage = document.getElementById("letter-stage");
  if (!stage) return;

  var state = 0;
  var labels = ["点击展开第一张信纸", "点击查看第二张信纸", "点击收起信件"];

  function render() {
    stage.classList.toggle("is-first", state === 1);
    stage.classList.toggle("is-second", state === 2);
    stage.setAttribute("aria-label", labels[state]);
  }

  stage.addEventListener("click", function () {
    state = (state + 1) % 3;
    render();
  });

  stage.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      state = (state + 1) % 3;
      render();
    }
  });

  render();
  document.documentElement.dataset.letterPageReady = "true";
})();