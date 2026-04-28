// Easter eggs around the navbar Home link.
//
//   1) Click Home and arrive on the home page → "IRS Lab" + DGIST logo
//      wobble in sync (the "@" stays still).
//   2) On the home page, press Home 3+ times within ~3 seconds → on
//      the 3rd and beyond click, the whole brand "vibrates" instead of
//      reloading. The reload is suppressed via preventDefault, so the
//      tremor is visible in real time.
(function () {
  var WINDOW_MS = 3000;
  var TIMES_KEY = 'irslab-home-click-times';
  var VIBRATE_THRESHOLD = 3;
  var ACTIVE_HOLD_MS = 2000;
  // Once the user crosses the threshold, every click for the next
  // ACTIVE_HOLD_MS keeps re-triggering the vibrate (no reload). After
  // the window expires we fall back to counting from zero.
  // This is a JS-local timestamp; it only needs to survive between
  // preventDefault'd clicks on the same page load, so no storage.
  var activeUntil = 0;

  function isHome() {
    var p = location.pathname;
    return p === '/' || p === '' || p === '/index.html';
  }

  function getTimes() {
    try {
      var raw = sessionStorage.getItem(TIMES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function setTimes(arr) {
    try { sessionStorage.setItem(TIMES_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function prune(times, now) {
    return times.filter(function (t) { return now - t <= WINDOW_MS; });
  }

  // === On home page load: any recent click in the window → wobble. ===
  if (isHome()) {
    var nowAtLoad = Date.now();
    var loadTimes = prune(getTimes(), nowAtLoad);
    setTimes(loadTimes);
    if (loadTimes.length >= 1) triggerWobble();
  }

  // === On every page: wire up navbar Home link click. ===
  var navLinks = document.querySelectorAll('#main-navbar .nav-link');
  for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    if (link.textContent.trim() === 'Home') {
      link.addEventListener('click', function (e) {
        var now = Date.now();

        // While the post-vibrate hold window is active, every click
        // keeps the tremor going (skip the threshold logic entirely).
        if (isHome() && now < activeUntil) {
          e.preventDefault();
          triggerVibrate();
          return;
        }

        var times = prune(getTimes(), now);

        // Already on home and this click would be the 3rd+ in the
        // window → suppress the reload, start a 2s "stay-active"
        // window during which any click re-fires the tremor, and
        // reset the counter so future cycles need 3 fresh clicks.
        if (isHome() && times.length + 1 >= VIBRATE_THRESHOLD) {
          e.preventDefault();
          activeUntil = now + ACTIVE_HOLD_MS;
          setTimes([]);
          triggerVibrate();
          return;
        }

        // Otherwise, log the click and let the browser navigate/reload.
        times.push(now);
        setTimes(times);
      });
    }
  }

  function triggerWobble() {
    var html = document.documentElement;
    html.classList.add('brand-wobble');
    setTimeout(function () { html.classList.remove('brand-wobble'); }, 1900);
  }

  function triggerVibrate() {
    // If a wobble is in progress, drop it so the two animations don't
    // visually fight.
    document.documentElement.classList.remove('brand-wobble');

    var brand = document.querySelector('#main-navbar .navbar-brand');
    if (!brand) return;

    // Restart the animation cleanly each rapid click so the tremor
    // feels sustained rather than just flashing.
    brand.classList.remove('brand-vibrate');
    void brand.offsetWidth;
    brand.classList.add('brand-vibrate');
    setTimeout(function () { brand.classList.remove('brand-vibrate'); }, 700);
  }

  // ─── Brand-click @-replacement easter egg ───────────────────────
  // Clicking the navbar "IRS Lab @ DGIST" brand link navigates to home
  // (its existing behaviour) and additionally swaps the "@" for a
  // random emoji from a small set on arrival. Navigating to any other
  // page restores the original "@" naturally (server-rendered HTML).
  var EMOJI_FLAG = 'irslab-corner-home';
  var CORNER_EMOJIS = ['📡', '🛰️', '🛜', '🦾', '🦿', '〰', '🚁', '👾', '👀'];

  var brandLink = document.querySelector('#main-navbar .navbar-brand');
  if (brandLink) {
    brandLink.addEventListener('click', function () {
      try { sessionStorage.setItem(EMOJI_FLAG, '1'); } catch (e) {}
    });
  }

  // On home: if the flag is set, swap " @ " for a random emoji and
  // clear the flag (so a regular refresh restores the original "@").
  if (isHome()) {
    var emojiFlag = null;
    try { emojiFlag = sessionStorage.getItem(EMOJI_FLAG); } catch (e) {}
    if (emojiFlag === '1') {
      try { sessionStorage.removeItem(EMOJI_FLAG); } catch (e) {}
      if (brandLink) {
        var pick = CORNER_EMOJIS[Math.floor(Math.random() * CORNER_EMOJIS.length)];
        brandLink.innerHTML = brandLink.innerHTML.replace(' @ ', ' ' + pick + ' ');
      }
    }
  }
})();
