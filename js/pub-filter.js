document.addEventListener('DOMContentLoaded', function() {
  setupFilters('intl-pub-list', 'intl-filters',
    ['IEEE Journal', 'CVPR', 'ECCV', 'NeurIPS', 'WACV', 'ICASSP', 'AAAI']);
  setupFilters('domestic-pub-list', 'domestic-filters',
    ['JKIEES', 'KIEES']);
});

function setupFilters(listId, filterId, allowedVenues) {
  var list = document.getElementById(listId);
  var filterContainer = document.getElementById(filterId);
  if (!list || !filterContainer) return;

  var entries = list.querySelectorAll('.pub-entry');

  allowedVenues.forEach(function(venue) {
    var btn = document.createElement('button');
    btn.className = 'pub-filter-btn';
    btn.setAttribute('data-venue', venue);
    btn.textContent = venue;
    filterContainer.appendChild(btn);
  });

  filterContainer.addEventListener('click', function(e) {
    var btn = e.target.closest('.pub-filter-btn');
    if (!btn) return;

    var venue = btn.getAttribute('data-venue');

    filterContainer.querySelectorAll('.pub-filter-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    entries.forEach(function(entry) {
      if (venue === 'all' || entry.getAttribute('data-venue') === venue) {
        entry.classList.remove('hidden');
      } else {
        entry.classList.add('hidden');
      }
    });
  });
}
