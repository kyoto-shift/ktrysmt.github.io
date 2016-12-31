---
title: Slides
permalink: /slides/
layout: page
profile: true
---

{% for slide in site.data.slides %}
<div class="slide-list">
  <h3 id="{{ slide.path }}"><a href="/slides/{{ slide.path }}/">{{ slide.name }}</a></h3>
  <div class="iframe-wrapper"><iframe src="/slides/{{ slide.path }}/"></iframe></div>  
</div>
{% endfor %}

{% include footer.html %}


