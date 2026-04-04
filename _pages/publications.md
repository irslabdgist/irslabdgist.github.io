---
title: "IRS Lab - Publications"
layout: gridlay
excerpt: "IRS Lab -- Publications."
sitemap: false
permalink: /publications/
---


# Publications

### International Publications

<div class="pub-filters" id="intl-filters">
  <button class="pub-filter-btn active" data-venue="all">All</button>
</div>

<div id="intl-pub-list">
{% for publi in site.data.publist_international %}
<div class="row pub-entry" data-venue="{{ publi.venue }}">
  {% if publi.highlight == 0 %}
  <div class="col-sm-12 clearfix" style="margin-top:-8px; margin-bottom:-8px;">
  <h4>{{ publi.title }}</h4>
  <h5>{{ publi.link.display }}</h5>
  <em>{{ publi.authors }}</em>
  </div>
  {% endif %}
  {% if publi.highlight == 1 %}
  <div class="col-sm-8 clearfix" style="margin-top:-8px; margin-bottom:-8px;">
  <h4>{{ publi.title }}</h4>
  <h5>{{ publi.link.display }}</h5>
  <em>{{ publi.authors }}</em>
  </div>
  <div class="col-sm-4 clearfix" style="margin-top:-8px; margin-bottom:-8px;">
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-fluid" width="100%" style="float: right" />
  </div>
  {% endif %}
</div>
{% endfor %}
</div>

<br>

### Domestic Publications

<div class="pub-filters" id="domestic-filters">
  <button class="pub-filter-btn active" data-venue="all">All</button>
</div>

<div id="domestic-pub-list">
{% for publi in site.data.publist_national %}
<div class="row pub-entry" data-venue="{{ publi.venue }}">
  <div class="col-sm-12 clearfix" style="margin-top:-8px; margin-bottom:-8px;">
  <h5>{{ publi.title }}</h5>
  <h6>{{ publi.link.display }}</h6>
  <em>{{ publi.authors }}</em>
  </div>
</div>
{% endfor %}
</div>
