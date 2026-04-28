// Gallery easter eggs around the cherry-blossom event.
//
//   1) Click the 🌸 emoji in the title 3+ times within 3 seconds →
//      a big shower of cherry blossoms rains across the viewport.
//   2) Click either prev/next arrow on the same event's carousel →
//      a smaller burst of cherry blossoms drops with each navigation.
//
// We locate the event by scanning for the 🌸 in any .gallery-event
// h4 at runtime, then wrap the emoji in a clickable <span> in-place.
// Putting the span directly in _data/gallery.yml broke the rendered
// <img alt="..."> attribute (nested quotes) and caused images to fail
// to render, so we keep the title as plain text and wrap on the fly.
(function () {
  var SAKURA = '🌸';

  var sakuraEvent = null;
  var headings = document.querySelectorAll('.gallery-event h4');
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].textContent.indexOf(SAKURA) !== -1) {
      sakuraEvent = headings[i].closest('.gallery-event');
      break;
    }
  }
  if (!sakuraEvent) return;

  // Wrap the emoji so we can attach a click listener and a pointer cursor.
  var heading = sakuraEvent.querySelector('h4');
  heading.innerHTML = heading.innerHTML.replace(
    SAKURA,
    '<span class="sakura-trigger" style="cursor:pointer">' + SAKURA + '</span>'
  );

  var trigger = sakuraEvent.querySelector('.sakura-trigger');
  if (!trigger) return;

  var WINDOW_MS = 3000;
  var THRESHOLD = 3;
  var BIG_COOLDOWN_MS = 3000;
  var clicks = [];
  var lastBigTriggered = 0;

  // 1) Big shower of 🌼 on rapid emoji clicks (3+ within 3 seconds).
  trigger.addEventListener('click', function () {
    var now = Date.now();
    if (now - lastBigTriggered < BIG_COOLDOWN_MS) return;

    clicks.push(now);
    clicks = clicks.filter(function (t) { return now - t <= WINDOW_MS; });

    if (clicks.length >= THRESHOLD) {
      lastBigTriggered = now;
      clicks = [];
      rain(42, 2500, '🌼');
    }
  });

  // 2) Burst of original 🌸 on each carousel arrow click.
  var arrows = sakuraEvent.querySelectorAll('.carousel-control-prev, .carousel-control-next');
  for (var j = 0; j < arrows.length; j++) {
    arrows[j].addEventListener('click', function () { rain(16, 1200, '🌸'); });
  }

  function rain(count, spread, glyph) {
    for (var k = 0; k < count; k++) {
      setTimeout(function () { spawn(glyph); }, Math.random() * spread);
    }
  }

  function spawn(glyph) {
    var el = document.createElement('span');
    el.className = 'easter-heart';
    el.textContent = glyph;
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.fontSize = (1.2 + Math.random() * 2.2) + 'rem';
    el.style.animationDuration = (3.5 + Math.random() * 3) + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); });
  }
})();
