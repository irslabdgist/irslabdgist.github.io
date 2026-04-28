// Hidden easter eggs on the professor page.
//   Click the name  ("Jae-Ho Choi, Ph.D.") 5 times in 5 seconds → ❤ rain
//   Click the photo 5 times in 5 seconds → 🧑‍🔬 + 💡 rain
(function () {
  setupTrigger('prof-name', ['❤']);
  setupTrigger('prof-photo', ['🧑‍🔬', '💡']);

  function setupTrigger(elementId, glyphs) {
    var target = document.getElementById(elementId);
    if (!target) return;

    var clicks = [];
    var lastTriggered = 0;

    target.addEventListener('click', function () {
      var now = Date.now();
      // Cooldown so users can't spam-trigger continuously.
      if (now - lastTriggered < 6000) return;

      clicks.push(now);
      clicks = clicks.filter(function (t) { return now - t <= 5000; });

      if (clicks.length >= 5) {
        lastTriggered = now;
        clicks = [];
        rain(glyphs);
      }
    });
  }

  function rain(glyphs) {
    var count = 36;
    for (var i = 0; i < count; i++) {
      setTimeout(function () { spawn(glyphs); }, Math.random() * 2200);
    }
  }

  function spawn(glyphs) {
    var el = document.createElement('span');
    el.className = 'easter-heart';
    el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.fontSize = (1.2 + Math.random() * 2.2) + 'rem';
    el.style.animationDuration = (3.2 + Math.random() * 2.8) + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); });
  }
})();
