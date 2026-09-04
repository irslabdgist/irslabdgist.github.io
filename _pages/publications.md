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
  <button class="pub-filter-btn active" data-year="all">All</button>
</div>

<div id="intl-pub-list">
{% for publi in site.data.publist_international %}
<div class="row pub-entry" data-year="{{ publi.year }}">
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
  <button class="pub-filter-btn active" data-year="all">All</button>
</div>

<div id="domestic-pub-list">
{% for publi in site.data.publist_national %}
<div class="row pub-entry" data-year="{{ publi.year }}">
  <div class="col-sm-12 clearfix" style="margin-top:-8px; margin-bottom:-8px;">
  <h5>{{ publi.title }}{% if publi.award %} <span class="badge badge-award">Award</span>{% elsif publi.title contains "물리 모델 기반 레이더 신호 합성 및 학습 파이프라인" %} <span class="badge badge-award">Award</span>{% endif %}</h5>
  <h6>{{ publi.link.display }}</h6>
  <em>{{ publi.authors }}</em>
  </div>
</div>
{% endfor %}
</div>
