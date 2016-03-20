---
layout: post
title: "サーバにスワップがないのでスワップファイルを作成する"
date: 2014-10-18 1:00:24 +0000
comments: true
category: Linux
tags: Linux
published: true
---

たまに必要になるのでコピペ用にメモ。

## 作成

```
dd if=/dev/zero of=/swapfile bs=1024K count=4096 # 4GB欲しい場合
mkswap /swapfile
swapon /swapfile
```

## スワップの確認

```
 swapon -s
```

## /etc/fstabに追記

```
/swapfile               swap                    swap    defaults        0 0
```
