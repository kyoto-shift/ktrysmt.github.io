---
layout: post
title: "Elixir の Please ensure your locale is set to UTF-8 をFix"
date: 2016-04-26
comments: true
category: Elixir
tags: Elixir
published: true
---

最近Elixirを触り始めているのでその内容。  
localeまわり、brewで入れるでなくVagrant内部に入れる場合によく出るのでさっさと直しておくべし。

大抵以下のようなエラーが出る場合は、環境変数で`LC_CTYPE`などを`export`で設定しておけばOK。

### エラー文

```
warning: the VM is running with native name encoding of latin1 which may cause Elixir to malfunction as it expects utf8. Please ensure your locale is set to UTF-8 (which can be verified by running "locale" in your shell)
```

### How to fix

```
echo 'LANG="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_CTYPE="en_US.UTF-8"' >> ~/.zshrc
```

これまでうまく日本語をechoできなかった場合も、おそらくこれで解決する。
