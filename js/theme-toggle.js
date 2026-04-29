// Theme toggle. Supports multiple toggle buttons (e.g. one in the
// mobile navbar header, one inside the desktop collapse) so we wire
// up by class instead of a single id.
(function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }

  var toggles = document.querySelectorAll('.theme-toggle-btn');

  function updateIcons() {
    var theme = document.documentElement.getAttribute('data-bs-theme');
    var darkInline  = theme === 'dark' ? 'none' : 'inline';
    var lightInline = theme === 'dark' ? 'inline' : 'none';
    var darks  = document.querySelectorAll('.theme-icon-dark');
    var lights = document.querySelectorAll('.theme-icon-light');
    for (var i = 0; i < darks.length;  i++) darks[i].style.display  = darkInline;
    for (var j = 0; j < lights.length; j++) lights[j].style.display = lightInline;
  }

  updateIcons();

  for (var k = 0; k < toggles.length; k++) {
    toggles[k].addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-bs-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      updateIcons();
    });
  }
})();
