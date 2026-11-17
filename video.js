(function () {
  "use strict";

  var video = document.getElementById("bubu-video");
  if (!video) return;

  video.muted = true;
  video.play().catch(function () {});
  document.documentElement.dataset.videoPageReady = "true";
})();