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
- nodejs (or nodejsバージョン管理ツール) のPATH解決を.zshrcでやってる

## Cause

Vimは.zshrcに書いているPATHは見ない、.zshenvのを見る。

## Solution

もしnoodejsやnodejsのバージョン管理ツール用のPATHを.zshrcに書いているなら、
その記述を.zshenvというファイルを作ってそっちに書いてあげればいい。
そうするとVimからPATH解決できるようになり、jslintやeslint、flowtypeなどが動くようになる。

## In my case ...

### Zsh + Vim + Syntastic

普段Zsh&Vimで開発しており、最近ES6をよく使うようになったのでJavascript系のvim-pluginをいくつか入れてみた。
Syntax Highlightingなどいくつかはすんなり使えるようになったのだが、SyntaxCheck用にと入れたeslintがどうもうまく動かない、というか認識しない。
CheckerにはおなじみのSyntasticを使っていたので、ググって出てきたIssueやブログ記事を参考にあれこれやってみるもののうまくいかず。

ググって以下のページなどを参考にいろいろ試してみたがすぐには解決しなかった。

- xxx
- yyy

色々設定をいじってSyntasticInfoで確認しても毎回以下の表示が出る有様。

```
false
```

Syntasticの設定とかもいろいろいじくってみたが何も変わらずじまい。
例えば以下のような記述。

```
let g:xxx ...
```

PATHまわりが怪しそうなのはわかったのだが、肝心の解決方法はわからなかった。

数日過ぎて諦めかけていたところ、再度調べてみたら見落としてたのか.zshenvを使うんだというGithub Issueを発見。
早速やってみたら、なんとまぁあっさり動いた…。

GoやPHPなどの言語では、普通はグローバルな位置にあるPATHにbinaryが置かれる。vim-goなどではちゃんと動いたのはおそらくこれが理由。
グローバルな位置のPATHならVimも当然汲み取ってくれるのだろう。だが、nodejsに関しては一味違った。
nodejsについて、私は普段nodebrewなどのバージョン管理ツールを使うようにしていて、PATHの解決各ツールのreadmeに従い自前でzshrcに書いていた。
これによりVimからはPAT解決ができず、今回のトラブルに引っかかったというわけ。

いやはや勉強になりました。
