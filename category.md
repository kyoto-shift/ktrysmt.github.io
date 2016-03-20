---
layout: default
title: Category
permalink: /category/
---

<h1>Category List</h1>

<div class="categories">

{% for category in site.categories reversed %}
<div class="category">
<h3 id="{{ category[0] }}">{{ category[0] }}</h3>

<ul class="posts">

 {% for post in site.posts %}
 {% if category[0] == post.category %}
 <li><a href="{{ post.url }}">{{ post.title }}</a></li>
 {% endif %}
 {% endfor %}

</ul>

</div>
{% endfor %}

</div>
