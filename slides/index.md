---
title: My Slides
permalink: /slides/
layout: page
profile: true
---

### [DEEP DIVE VIM COMMAND MODE](./deep-dive-vim-command-mode/)
<div class="iframe-wrapper"><iframe src="./deep-dive-vim-command-mode/"></iframe></div>  

{% for slide in site.data.slides %}
<h3><a href="/slides/{{ slide.path }}/">{{ slide.name }}</a></h3>
<div class="iframe-wrapper"><iframe src="/slides/{{ slide.path }}/"></iframe></div>  
{% endfor %}

{% include footer.html %}


