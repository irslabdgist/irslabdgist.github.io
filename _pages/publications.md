---
title: "IRS Lab - Publications"
layout: gridlay
excerpt: "IRS Lab -- Publications."
sitemap: false
permalink: /publications/
---


# Publications

<!-- ## Group highlights

**At the end of this page, you can find the [full list of publications and patents](#full-list-of-publications). All papers are also available on [arXiv](https://arxiv.org/search/?searchtype=author&query=Allan%2C+M+P).**

{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if publi.highlight == 1 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
 <div class="well">
  <pubtit>{{ publi.title }}</pubtit>
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="33%" style="float: left" />
  <p>{{ publi.description }}</p>
  <p><em>{{ publi.authors }}</em></p>
  <p><strong><a href="{{ publi.link.url }}">{{ publi.link.display }}</a></strong></p>
  <p class="text-danger"><strong> {{ publi.news1 }}</strong></p>
  <p> {{ publi.news2 }}</p>
 </div>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

<p> &nbsp; </p> -->


<!-- ## Patents
<em>Milan P Allan, S Gröblacher, RA Norte, M Leeuwenhoek</em><br />Novel atomic force microscopy probes with phononic crystals<br /> PCT/NL20-20/050797 (2020)

<em>Milan P Allan</em><br /> Methods of manufacturing superconductor and phononic elements <br /> <a href="https://patents.google.com/patent/US10439125B2/en?inventor=Milan+ALLAN&oq=inventor:(Milan+ALLAN)">US10439125B2 (2016)</a> -->

### International Publications
---
{% for publi in site.data.publist %}
<div class="row">
  <div class="col-sm-12 clearfix">
  <h5>{{ publi.title }}</h5>
  </div>
  {% if publi.highlight == 0 %}
  <div class="col-sm-12 clearfix">
  <h6>{{ publi.link.display }}</h6>
  {{ publi.authors }}
  <!-- <p class="text-danger">
  <strong> {{ publi.news1 }}</strong><br>
  <strong> {{ publi.news2 }}</strong>
  </p> -->
  </div>
  {% endif %}
  {% if publi.highlight == 1 %}
  <div class="col-sm-8 clearfix">
  <h6>{{ publi.link.display }}</h6>
  <em>{{ publi.authors }}</em>
  <!-- <p class="text-danger">
  <strong> {{ publi.news1 }}</strong><br>
  <strong> {{ publi.news2 }}</strong>
  </p> -->
  </div>
  <div class="col-sm-4 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="60%" style="float: right" />
  </div>
  {% endif %}
</div>
---
{% endfor %}

### Domestic Publications
