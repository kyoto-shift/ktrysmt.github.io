---
layout: post
title: "my.cnfチューニングメモ"
date: 2015-02-19
comments: true
category: MySQL
tags: MySQL
published: true
---

my.cnfの設定のコツがわかりにくいので書き出す。


```


```

InnoDB想定。

innodb_buffer_pool_sizeには当てられるだけメモリを当てる。
専用サーバなら全体の80%を。共存してるなら他のサービスと相談。
innodb_log_file_sizeは、innodb_buffer_pool_sizeの1/2にする。デフォが2枚組みだから。

innodb_log_file_sizeを変更したら、mysqlを一旦落として、
/var/lib/mysql/以下のidlogfileをrmしておく。で、mysql再起動。

key_buffer_size
「一般的には、マシンのメモリ使用率 25 % の値であることが好ましい」一方で
「Key_reads/Key_read_requests の比率は、0.01 より小さいことが望ましい」つまり
99.9%がキャッシュされていることが望ましいということ。

## Reference

- <http://blogs.yahoo.co.jp/airmikan/15292656.html>