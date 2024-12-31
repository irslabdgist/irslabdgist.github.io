---
title: "IRS Lab - Members"
layout: gridlay
excerpt: "IRS Lab: Team members"
sitemap: false
permalink: /team/
---

<!-- # Group Members

 **We are currently looking for passionate students (PhD/MS students and Undergrad. intern) to join the team** [(see openings)]({{ site.url }}{{ site.baseurl }}/vacancies) **!** -->

## Professor
{% assign number_printed = 0 %}
{% for member in site.data.member_professor %}
{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}
<div class="col-sm-6 clearfix">
<div class="list-group">
  <a href="{{ site.url }}{{ site.baseurl }}/team/jaeho" class="list-group-item" style="height: 220px;">
    <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="40%" style="float: left" />
    <br><span style="font-family:sans-serif; font-weight:bold; font-size:20px; line-height:1.6;">{{ member.name }}<br></span>
    <span style="font-style:italic; font-size:18px">{{ member.info }}<br></span>
    <span>{{ member.email }}<br></span>
  </a>
</div>
</div>
</div>
{% endfor %}

## Students

 **We are currently looking for passionate students (PhD/MS students and Undergrad. intern) to join the team** [(see openings)]({{ site.url }}{{ site.baseurl }}/vacancies) **!**

<br><br>