---
title: Slides
permalink: /slides/
layout: page
profile: true
---

<ul class="archive-list">
  {% for slide in site.data.slides %}
  <li>
    <a href="/slides/{{ slide.path }}"><aside class="dates">{{ slide.date | date:"%b %d, %Y" }}</aside></a>
    <a href="/slides/{{ slide.path }}/">{{ slide.name }}</a>
    <div class="iframe-wrapper"><iframe src="/slides/{{ slide.path }}/"></iframe></div>  
  </li> 
  {% endfor %}
</ul>
 
{% for slide in site.data.slides %}
<div class="slide-list">
  <h3 id="{{ slide.path }}"><a href="/slides/{{ slide.path }}/">{{ slide.name }}</a></h3>
  <div class="iframe-wrapper"><iframe src="/slides/{{ slide.path }}/"></iframe></div>  
</div>
{% endfor %}

{% include footer.html %}


