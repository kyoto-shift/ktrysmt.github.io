---
layout: post
title: "How to fix syntastic not working with eslint"
date: 2016-09-21
comments: true
category: Vim
tags: Vim
published: false
---

## In Short

以下の環境ならこのトラブルに遭遇する可能性が高い。

- Zshを使っている
- Vimを使っている
- nodejs (or nodejsバージョン管理ツール) のPATH解決を.zshrcに書いている

## Cause

Vimは.zshrcに書いているPATHは見ない、PATHについては.zshenvを見る。

## Solution

もしnoodejsやnodejsのバージョン管理ツール用のPATHを.zshrcに書いているなら、
その記述を.zshenvというファイルを作ってそっちに書いてあげればいい。
VimからPATH解決できるようになり、eslintやflowtypeなどが動くようになる。

## In my case ...

普段Zsh&Vimで開発しており、最近ES6をよく使うようになったのでJavascript系のvim-pluginをいくつか入れてみた。
Syntax Highlightingなどいくつかはすんなり使えるようになったのだが、eslintがどうもうまくVimとうまく連携できない。
チェッカーにはSyntasticを使っているのでググって出てきたIssueやブログ記事を参考にあれこれやってみるのだがなぜかうまくいかず。

ググって以下のページなどを参考にいろいろ試してみたがすぐには解決しなかった。

色々設定をいじってSyntasticInfoで確認しても毎回以下の表示が出る有様。

```
false
```

Syntasticの設定とかもいろいろいじくってみたが何も変わらず。PATHまわりが怪しそうなのはわかったがその解決方法がわからなかった。

```
let g:xxx ...
```

数日過ぎて諦めかけていたところ、.zshenvを使うんだというGithub Issueを発見。
早速やってみたら、なんとまぁあっさり動いた…。私のVimとZshに対する勉強不足が原因だった。

Goやその他の言語では、$PATHは一般にはグローバルな位置に置かれる。vim-goなどでは困らなかったのはこれが理由だ。
一般的な位置のPATHならVimも当然汲み取ってくれるのだが、nodejsに関しては一味違った。
nodejsの場合、私は普段nodebrewなどを使っていて、PATHの解決も自前でzshrcに書いていた。これによりVimからはPAT解決ができず、引っかかったというわけ。

色々勉強になりました。
