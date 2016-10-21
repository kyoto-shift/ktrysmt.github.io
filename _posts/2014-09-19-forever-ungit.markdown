---
layout: post
title: "foreverでungitをデーモン化"
date: 2014-08-31 12:48:21 +0000
comments: true
category: Git
tags: npm Node ungit Javascript forever
published: true
---

デーモン書いていましたがこちらのほうがスマートな印象。
再起動も自動でしてくれるようです。

## install 

nodeとnpmがインストールされているのを前提に。

```
npm -g install forever ungit
echo "forever `which ungit` > /dev/null &" >> ~/.bash_profile
```

## 反映

```
source ~/.bash_profile
```

