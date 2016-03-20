---
layout: post
title: "PHPでmemcachedを使うまとめ"
date: 2015-09-05
comments: true
category: Memcached
tags: PHP
published: true
---

よく使う割によく忘れるのでコピペ用メモ。

memcacheよりmemcachedのほうが動きが活発なので基本memcachedを使う。

## Install

```
yum -y install memcached pecl-php-memcached --enablerepo=epel,remi,remi-php55
chkconfig memcached on
service memcached start
service php-fpm restart
```

注）

- CentOS6です。
- php-fpm以外でも再読み込みなどしておく。
- remi-php55を使ってるがデフォルトでもいい。

## Configure

TCPコネクションを使う場合

```
# cat /etc/sysconfig/memcached
PORT="11211"
USER="memcached"
MAXCONN="10240"
CACHESIZE="64"
OPTIONS=""
```

Unixドメインソケットを使う場合

```
# cat /etc/sysconfig/memcached
PORT="0"
USER="memcached"
MAXCONN="10240"
CACHESIZE="128"
OPTIONS="-I 10000000 -s /tmp/memcached.sock -a 755"
```

- マシンスペックが極端に低い場合は逆にTCPのほうが安定する。
- OPTIONSの `-I 10000000` は単位あたり10MBということ。大きいデータを渡す場合はこれで定義。起動時に通常は5MBまでだよと警告が出るが気にしない。ただし物理メモリや相乗りしている他のソフトウェアのメモリ割り当てには注意。

## PHP code

TCPコネクションの場合

```
<?php
$m = new Memcached();
$m->addServer('localhost', 11211);
$m->set('key', date('Y/m/d H:i:s'), time() + 60); 

$res = $m->get('key');

echo $res;
exit;
```

Unixドメインソケットの場合

<?php
$m = new Memcached();
$m->addServer('/tmp/memcached.sock', 0);
$m->set('key', date('Y/m/d H:i:s'), time() + 60); 

$res = $m->get('key');

echo $res;
exit;
```