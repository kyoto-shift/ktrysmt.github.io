---
title: ktrysmt's blog 
permalink: /blog/
profile: true 
---

# ktrysmt's blog

<ul id="post-list">
    {% for post in site.posts %}
        <li>
            <a href="/{{ post.url | remove_first: '/' }}"><aside class="dates">{{ post.date | date:"%b %d, %Y" }}</aside></a>
            <a href="/{{ post.url | remove_first: '/' }}">{{ post.title }} {{ post.description }}</a>
        </li>
    {% endfor %}
</ul>
 
{% include footer.html %}

