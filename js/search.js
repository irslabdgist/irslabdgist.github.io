document.addEventListener('DOMContentLoaded', function() {
  var searchToggle = document.getElementById('search-toggle');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchModal = document.getElementById('searchModal');
  var modal = null;
  var searchData = null;
  var lunrIndex = null;

  if (!searchToggle || !searchModal) return;

  modal = new bootstrap.Modal(searchModal);

  searchToggle.addEventListener('click', function() {
    modal.show();
    loadSearchData();
  });

  searchModal.addEventListener('shown.bs.modal', function() {
    searchInput.focus();
  });

  searchModal.addEventListener('hidden.bs.modal', function() {
    searchInput.value = '';
    searchResults.innerHTML = '<p class="text-muted text-center py-3">Type to search...</p>';
  });

  searchInput.addEventListener('input', debounce(function() {
    var query = searchInput.value.trim();
    if (query.length < 2) {
      searchResults.innerHTML = '<p class="text-muted text-center py-3">Type to search...</p>';
      return;
    }
    performSearch(query);
  }, 200));

  function loadSearchData() {
    if (searchData) return;
    fetch('/search.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        searchData = data;
        lunrIndex = lunr(function() {
          this.ref('idx');
          this.field('title', { boost: 10 });
          this.field('authors', { boost: 5 });
          this.field('venue', { boost: 3 });
          this.field('info');
          this.field('content');

          data.forEach(function(item, idx) {
            item.idx = idx;
            this.add({
              idx: idx,
              title: item.title || '',
              authors: item.authors || '',
              venue: item.venue || '',
              info: item.info || '',
              content: item.content || ''
            });
          }, this);
        });
      })
      .catch(function() {
        searchResults.innerHTML = '<p class="text-danger text-center py-3">Failed to load search index.</p>';
      });
  }

  function performSearch(query) {
    if (!lunrIndex || !searchData) {
      searchResults.innerHTML = '<p class="text-muted text-center py-3">Loading search index...</p>';
      return;
    }

    var results;
    try {
      results = lunrIndex.search(query + '~1');
    } catch (e) {
      try {
        results = lunrIndex.search(query);
      } catch (e2) {
        results = [];
      }
    }

    if (results.length === 0) {
      searchResults.innerHTML = '<p class="text-muted text-center py-3">No results found.</p>';
      return;
    }

    var html = '';
    var shown = Math.min(results.length, 15);
    for (var i = 0; i < shown; i++) {
      var item = searchData[parseInt(results[i].ref)];
      var icon = getTypeIcon(item.type);
      var detail = getDetail(item);

      html += '<a href="' + item.url + '" class="search-result-item d-block text-decoration-none">';
      html += '<div class="result-type">' + icon + ' ' + item.type + '</div>';
      html += '<div class="result-title">' + escapeHtml(item.title) + '</div>';
      if (detail) html += '<div class="result-detail">' + escapeHtml(detail) + '</div>';
      html += '</a>';
    }

    if (results.length > shown) {
      html += '<p class="text-muted text-center py-2 small">Showing ' + shown + ' of ' + results.length + ' results</p>';
    }

    searchResults.innerHTML = html;
  }

  function getTypeIcon(type) {
    switch (type) {
      case 'publication': return '<i class="bi bi-journal-text"></i>';
      case 'member': return '<i class="bi bi-person"></i>';
      case 'page': return '<i class="bi bi-file-text"></i>';
      default: return '<i class="bi bi-search"></i>';
    }
  }

  function getDetail(item) {
    if (item.type === 'publication') return (item.authors || '') + (item.venue ? ' | ' + item.venue : '');
    if (item.type === 'member') return item.info || '';
    return '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function debounce(fn, delay) {
    var timer;
    return function() {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() { fn.apply(null, args); }, delay);
    };
  }
});
