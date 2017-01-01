---
title: Slides
permalink: /slides/
layout: page
profile: true
---

<ul class="archive-list">
  {% for slide in site.data.slides %}
  <li>
   <a href="/slides/{{ slide.path }}/">{{ slide.name }}</a> 
   <div class="iframe-wrapper"><iframe src="/slides/{{ slide.path }}/"></iframe></div>  
  </li> 
  {% endfor %}
</ul>

{% include footer.html %}


