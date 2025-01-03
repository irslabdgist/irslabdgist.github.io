---
title: "IRS Lab - Members"
layout: gridlay
excerpt: "IRS Lab: Team members"
sitemap: false
permalink: /team/
---

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

<blockquote>
  <h4><strong>Notice</strong></h4>
  <span style="margin-left: 2%; font-size:18px">We are looking for passionate students (<b>PhD/MS students</b> and <b>Undergrad. intern</b>) to join IRS Lab.<br></span>
  <span style="margin-left: 2%; font-size:18px">If you're interested, please refer to <a href="{{ site.url }}{{ site.baseurl }}/vacancies">this link</a>.<br></span>
  <span style="margin-left: 2%; font-size:18px">Feel free to contact me (<i><u><strong>jhochoi@dgist.ac.kr</strong></u></i>) for further questions.</span>
  <br><br>
  <span style="margin-left: 2%; font-size:15px;"><strong>우리 연구실에서는 열정 있는 대학원생(석/박사 과정) 및 학부 연구생을 모집하고 있습니다.</strong><br></span>
  <span style="margin-left: 2%; font-size:15px;"><strong>관심 있으신 분들은 다음의 <a href="{{ site.url }}{{ site.baseurl }}/vacancies">link</a>를 참조해 주시거나, 편하게 저에게 메일(<i><u>jhochoi@dgist.ac.kr</u></i>) 주시길 바랍니다.</strong></span>
</blockquote>

<br><br>