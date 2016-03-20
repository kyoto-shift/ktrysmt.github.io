---
layout: post
title: "Cygwinにapt-cygをインストールする"
date: 2014-02-02 11:08:21 +0000
comments: true
category: Cygwin
tags: Cygwin Windows Windows7
published: true
---

手順がまとまっていなかったので自分用にメモ。
cygwin上で以下のコマンドを実行すれば良い。

ちなみにWindows7です。

```
wget http://apt-cyg.googlecode.com/svn/trunk/apt-cyg
mv apt-cyg /usr/bin
chmod +x /usr/bin/apt-cyg
```