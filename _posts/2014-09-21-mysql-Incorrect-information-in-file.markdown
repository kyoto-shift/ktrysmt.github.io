---
layout: post
title: "/usr/libexec/mysqld: Incorrect information in file"
date: 2014-09-20 10:00:24 +0000
comments: true
category: MySQL
tags: MySQL Linux
published: true
---



[ERROR] /usr/libexec/mysqld: Incorrect information in fileと言うエラー文。

どうもテーブル参照ができないらしい。

mysqlcheckを実行してみる。

```
$ mysqlcheck -u root -p --all-databases
```

修復はしなかったが`mysql restart`したら回復した。
