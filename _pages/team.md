---
title: "IRS Lab - Members"
layout: gridlay
excerpt: "IRS Lab: Team members"
sitemap: false
permalink: /team/
---

## Members
<div class="row">
{% for member in site.data.member_all %}
<div class="col-6 col-md-3 clearfix">
<div class="list-group">
  <a href="{{ member.url }}" class="list-group-item member-card">
    <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-fluid w-100" style="float: left" loading="lazy" alt="{{ member.name }}" />
    <br><span class="member-name">{{ member.name }}<br></span>
    <span class="member-role">{{ member.info }}<br></span>
    <span>{{ member.email }}<br></span>
  </a>
</div>
</div>
{% endfor %}
</div>

## Interns
<span class="intern-text"><b>[2025 Summer]</b> 고동욱, 권우혁, 남도혁, 이재룡 <br></span>
<span class="intern-text"><b>[2025.07 ~ 2025.12]</b> 김나현 <br></span>
<span class="intern-text"><b>[2026 Winter]</b> 이재룡, 윤재원, 정윤중 <br></span>
<span class="intern-text"><b>[2026 Summer]</b> 윤재원, 최준원 <br></span>


<br>원
<blockquote>
  <h4><strong>Notice</strong></h4>
  <span class="notice-text">We are looking for passionate students (<b>PhD/MS students</b> and <b>Undergrad. interns</b>) to join IRS Lab.<br></span>
  <span class="notice-text">If you're interested, please refer to <a href="{{ site.url }}{{ site.baseurl }}/vacancies">this link</a>.<br></span>
  <span class="notice-text">Feel free to contact me (<i><u><strong>jhochoi@dgist.ac.kr</strong></u></i>) for further questions.</span>
  <br><br>
  <span class="notice-text-sm"><strong>우리 연구실에서는 열정 있는 대학원생(석/박사 과정) 및 학부 연구생을 모집하고 있습니다.</strong><br></span>
  <span class="notice-text-sm"><strong>관심 있으신 분들은 다음의 <a href="{{ site.url }}{{ site.baseurl }}/vacancies">link</a>를 참조해 주시거나, 편하게 저에게 메일(<i><u>jhochoi@dgist.ac.kr</u></i>) 주시길 바랍니다.</strong></span>
</blockquote>

<br><br>