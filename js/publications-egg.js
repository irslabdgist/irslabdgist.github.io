// Publications page easter egg: clicking the yellow "Oral" badge
// 3 times in a row runs a wobble → shrink → swap → grow → wobble
// sequence. Click count is stored per badge on a data attribute, so
// the counter naturally resets on tab change or page refresh.
//
// On page load every Oral badge also greets the visitor with a small
// half-amplitude wobble.
(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    var badges = document.querySelectorAll('.badge.bg-warning.text-dark');
    for (var i = 0; i < badges.length; i++) {
      var badge = badges[i];
      if (badge.textContent.trim() !== 'Oral') continue;
      badge.style.cursor = 'pointer';
      badge.dataset.oralClicks = '0';
      badge.dataset.oralState = 'oral';
      badge.addEventListener('click', onClick);
      // Subtle hello-wobble when the page first appears.
      playWobble(badge);
    }
  }

  function onClick(e) {
    var badge = e.currentTarget;
    // Protected window after a swap: ignore clicks entirely (don't
    // even bump the counter) so spam-clicks can't immediately flip
    // the badge back.
    if (badge.dataset.oralProtected === '1') return;

    var n = (parseInt(badge.dataset.oralClicks, 10) || 0) + 1;
    if (n < 3) {
      badge.dataset.oralClicks = String(n);
      return;
    }
    // 3rd click — reset the counter and run the full transition.
    badge.dataset.oralClicks = '0';
    runTransition(badge);
  }

  // wobble (1.6s) → shrink (0.25s) → swap text → grow back (0.25s) → wobble,
  // then a 1s protected cooldown before clicks count again.
  function runTransition(badge) {
    badge.dataset.oralProtected = '1';
    playWobble(badge);
    setTimeout(function () {
      badge.classList.add('badge-shrink');
      setTimeout(function () {
        if (badge.dataset.oralState === 'oral') {
          badge.textContent = '🐤';
          badge.dataset.oralState = 'chick';
        } else {
          badge.textContent = 'Oral';
          badge.dataset.oralState = 'oral';
        }
        badge.classList.remove('badge-shrink');
        setTimeout(function () {
          playWobble(badge);
          // total since transition start at this point: 1620+260+280 = 2160ms
          // wobble runs another ~1700ms; add 1s of explicit cooldown.
          setTimeout(function () {
            badge.dataset.oralProtected = '';
            badge.dataset.oralClicks = '0';
          }, 1700 + 1000);
        }, 280);
      }, 260);
    }, 1620);
  }

  // Restart the oral-wobble animation cleanly. Re-toggling the class
  // alone wouldn't restart it; we force a reflow between remove+add.
  function playWobble(badge) {
    badge.classList.remove('oral-wobble');
    void badge.offsetWidth;
    badge.classList.add('oral-wobble');
    // Drop the class once finished so the next call can re-apply.
    setTimeout(function () { badge.classList.remove('oral-wobble'); }, 1700);
  }
})();
