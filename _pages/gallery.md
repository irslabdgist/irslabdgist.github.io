---
title: "IRS Lab - Gallery"
layout: piclay
excerpt: "IRS Lab -- Gallery"
sitemap: false
permalink: /gallery/
---

# Gallery

<div markdown="0">

{% for event in site.data.gallery %}
<div class="gallery-event mb-5">
  <h4>{{ event.title }}</h4>
  <div id="gallery-carousel-{{ forloop.index }}" class="carousel slide" data-bs-ride="false">
    <div class="carousel-indicators">
      {% for img in event.images %}
      <button type="button" data-bs-target="#gallery-carousel-{{ forloop.parentloop.index }}" data-bs-slide-to="{{ forloop.index0 }}" {% if forloop.first %}class="active" aria-current="true"{% endif %} aria-label="Slide {{ forloop.index }}"></button>
      {% endfor %}
    </div>
    <div class="carousel-inner">
      {% for img in event.images %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <img src="{{ site.url }}{{ site.baseurl }}/images/gallery/{{ event.folder }}/{{ img }}" class="d-block w-100" alt="{{ event.title }} - {{ forloop.index }}" loading="lazy" />
      </div>
      {% endfor %}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#gallery-carousel-{{ forloop.index }}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#gallery-carousel-{{ forloop.index }}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
{% endfor %}

</div>
