document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('theme-toggle');
  var iconDark = document.getElementById('theme-icon-dark');
  var iconLight = document.getElementById('theme-icon-light');

  function updateIcons() {
    var theme = document.documentElement.getAttribute('data-bs-theme');
    if (theme === 'dark') {
      iconDark.style.display = 'none';
      iconLight.style.display = 'inline';
    } else {
      iconDark.style.display = 'inline';
      iconLight.style.display = 'none';
    }
  }

  updateIcons();

  if (toggle) {
    toggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-bs-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      updateIcons();
    });
  }
});
