---
layout: post
title: "How to fix syntastic not working with eslint"
date: 2016-09-21 15:09:08 +0900 
comments: true
category: Vim
tags: Vim
published: false
---

## 要するに

以下の環境ならこのトラブルに遭遇する可能性が高い。

- Zshを使っている
- Vimを使っている
- nodejs (or nodejsバージョン管理ツール) のPATH解決を.zshrcでやってる

## Cause

Vimは.zshrcに書いているPATHは見ない、.zshenvのを見る。

## 解決策

もしnoodejsやnodejsのバージョン管理ツール用のPATHを.zshrcに書いているなら、
その記述を.zshenvというファイルを作ってそっちに書いてあげればいい。
そうするとVimからPATH解決できるようになり、jslintやeslint、flowtypeなどが動くようになる。

## 経緯

### Zsh + Vim + Syntastic

普段Zsh&Vimで開発しており、最近ES6をよく使うようになったのでJavascript系のvim-pluginをいくつか入れてみた。
Syntax Highlightingなどいくつかはすんなり使えるようになったのだが、SyntaxCheck用にと入れたeslintがどうもうまく動かない、というか認識しない。
CheckerにはおなじみのSyntasticを使っていたので、ググって出てきたIssueやブログ記事を参考にあれこれやってみるもののうまくいかず。

ググって以下のページなどを参考にいろいろ試してみたがすぐには解決しなかった。

- [eslint validator not working · Issue \#1110 · scrooloose/syntastic](https://github.com/scrooloose/syntastic/issues/1110)
- [Error in eslint checker · Issue \#1302 · scrooloose/syntastic](https://github.com/scrooloose/syntastic/issues/1302)
- [eslint not working? · Issue \#1347 · scrooloose/syntastic](https://github.com/scrooloose/syntastic/issues/1347)

設定をいじりつつSyntasticInfoで確認しても毎回以下の表示が出る有様。

```
Syntastic: active mode enabled
Syntastic info for filetype: javascript
Available checker(s): eslint
Currently enabled checker(s):
```

Syntasticの設定とかもいろいろいじくってみたが何も変わらずじまい。
例えば以下のような記述。
（参考：- [ESlint is available but won't enable · Issue \#1736 · scrooloose/syntastic](https://github.com/scrooloose/syntastic/issues/1736)
）

```
let s:eslint_path = system('PATH=$(npm bin):$PATH && which eslint')
let b:syntastic_javascript_eslint_exec = substitute(s:eslint_path, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_javascript_checkers = ['eslint']
```

PATHまわりが怪しそうなのはわかったのだが…、肝心の解決方法はわからず。

数日過ぎて諦めかけていたところ、再度調べてみたら見落としてたのか.zshenvを使うんだという[stackoverflow](http://ja.stackoverflow.com/questions/8586/vim-%E3%81%AE-syntastic%E3%81%8C%E3%81%86%E3%81%BE%E3%81%8F%E5%8B%95%E4%BD%9C%E3%81%97%E3%81%AA%E3%81%84)を発見。
早速やってみたら、なんとまぁあっさり動いた…。

GoやPHPなどの言語では、普通はグローバルな位置にあるPATHにbinaryが置かれる。vim-goなどではちゃんと動いたのはおそらくこれが理由。
グローバルな位置のPATHならVimも当然汲み取ってくれるのだろう。だが、nodejsに関しては一味違った。
nodejsについて、私は普段nodebrewなどのバージョン管理ツールを使うようにしていて、PATHの解決各ツールのreadmeに従い自前でzshrcに書いていた。
これによりVimからはPAT解決ができず、今回のトラブルに引っかかったというわけ。

いやはや勉強になりました。
