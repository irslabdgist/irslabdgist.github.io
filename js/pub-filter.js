document.addEventListener('DOMContentLoaded', function() {
  setupFilters('intl-pub-list', 'intl-filters',
    ['2026', '2025', '2024', '2023', '2022~2017']);
  setupFilters('domestic-pub-list', 'domestic-filters',
    ['2026', '2025', '2024', '2023', '2022~2017']);
});

function setupFilters(listId, filterId, years) {
  var list = document.getElementById(listId);
  var filterContainer = document.getElementById(filterId);
  if (!list || !filterContainer) return;

  var entries = list.querySelectorAll('.pub-entry');

  years.forEach(function(year) {
    var btn = document.createElement('button');
    btn.className = 'pub-filter-btn';
    btn.setAttribute('data-year', year);
    btn.textContent = year;
    filterContainer.appendChild(btn);
  });

  filterContainer.addEventListener('click', function(e) {
    var btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;

    var year = btn.getAttribute('data-year');

    filterContainer.querySelectorAll('.pub-filter-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    var delay = 0;
    entries.forEach(function(entry) {
      var entryYear = entry.getAttribute('data-year');
      var show = false;
      if (year === 'all') {
        show = true;
      } else if (year.includes('~')) {
        var range = year.split('~');
        var hi = parseInt(range[0]);
        var lo = parseInt(range[1]);
        var y = parseInt(entryYear);
        show = (y >= lo && y <= hi);
      } else {
        show = (entryYear === year);
      }

      if (show) {
        entry.classList.remove('hidden');
        entry.style.opacity = '0';
        entry.style.transform = 'translateY(15px)';
        entry.style.transition = 'none';
        var d = Math.min(delay, 200);
        setTimeout(function() {
          entry.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          entry.style.opacity = '1';
          entry.style.transform = 'translateY(0)';
        }, d);
        delay += 40;
      } else {
        entry.classList.add('hidden');
      }
    });
  });
}
