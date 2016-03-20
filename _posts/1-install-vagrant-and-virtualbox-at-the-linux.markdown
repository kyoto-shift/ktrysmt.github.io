---
layout: post
title: "LinuxディストリにVagrant+VirtualBox入れる"
date: 2015-06-02
comments: true
category: Vagrant
tags: Linux Vagrant
published: true
---

VirtualBoxが面倒。

## Vagrant

これはふつうに

```
apt-get install vagrant 
yum install vagrant
```

でOK

## VirtualBox

こっちはshell叩く方がハマりにくい。

```
wget http://download.virtualbox.org/virtualbox/4.3.28/VirtualBox-4.3.28-100309-Linux_amd64.run
chmod +x VirtualBox-4.3.28-100309-Linux_amd64.run
./VirtualBox-4.3.28-100309-Linux_amd64.run
```

ubuntuならlxc使うだろうけどスーパバイザでないと都合が悪い場合もあるので。