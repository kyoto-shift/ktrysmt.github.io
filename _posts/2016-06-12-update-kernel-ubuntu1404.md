---
layout: post
title: "Ubuntu14.04のKernelを3.19に上げる"
date: 2016-06-12
comments: true
category: Ubuntu
tags: Ubuntu Kernel Docker
published: true
---

Dockerを駆使したOSSを触るようになると上げねばならなくなってくる。

```
mkdir /tmp/kernel 
cd !$
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v3.19.8-vivid/linux-headers-3.19.8-031908-generic_3.19.8-031908.201505110938_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v3.19.8-vivid/linux-headers-3.19.8-031908_3.19.8-031908.201505110938_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v3.19.8-vivid/linux-image-3.19.8-031908-generic_3.19.8-031908.201505110938_amd64.deb
sudo dpkg -i linux-*.deb 
```

あとはマシン再起動すればOK。
