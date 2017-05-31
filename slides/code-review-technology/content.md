## Whoami

<img class="avatar" data-src="https://avatars3.githubusercontent.com/u/6156742?v=3&s=460">

Kotaro Yoshimatsu / @ktrysmt

- <https://twitter.com/ktrysmt>
- <https://github.com/ktrysmt>

---

みなさん

---

コードレビューしてますか。

---

ある日のプルリクレビュー。

---

プルリクの本数
* だいたい6~8本

技術スタック
* JS
* PHP
* nodejs
* docker
* インフラ系いろいろ

アサインされてないやつも時々巡回してたり

---

問題点
1. 技術スタックが多岐にわたる
2. そもそも数が多い

---

対策しましょう。

---

1. 豊富な技術スタック → 対応技術を増やす
2. 数が多い → 気合い

---

1. 対応技術を増やす

には，どうすればいいか。

---

エコシステムが巨大で対応技術の多い，  
安定した開発環境が必要。

---

Vimでしょ。

---

（すみませんただの好みです）

一応弁明すると，

Vimもプラグインが豊富にあり，CLIベースなのでIntegrationも柔軟。

大抵の言語は標準でサポート，それ以外もエコシステムがだいたい吸収してくれる。

---

Vimについては語りだすとキリがないので…

コードレビューに役立ちそうなTipsやプラギンを一部紹介。

---

* vim-fugitive
* ale
* easy-motion
* tagbar & filer
* auto-ctags
* 高速vimgrep（※後述）

---

*** vim-fugitive**


Vim上でGit操作いろいろできるやつ。

`:Gdiff` で表示して

`[c`,`]c` でhunk単位で移動

---

*** ale**

最近の言語とそのエコシステムに一通り対応してる lint & static check の基盤。
主要言語の静的解析にだいたい対応してる。

非同期対応なので作業の邪魔をせず，快適。

特別な設定なしにプラグインを入れるだけでいいのがGood。

---

*** easy-motion**

コード上を縦横無尽に動き回れるようになる


<img class="capture"  src="https://camo.githubusercontent.com/d5f800b9602faaeccc2738c302776a8a11797a0e/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f333739373036322f323033393335392f61386539333864362d383939662d313165332d383738392d3630303235656138333635362e676966">


---

*** tagbar & filer**

ようするにVimがIDE化します

<img style="width:85%" class="capture" src="./code-review-technology-01.png">


---

*** auto-ctags**

ctagsとは

変数・関数・DOCコメント等の定義リスト（タグファイル）をソースコードから生成するツールで，IDEでよくある宣言ジャンプや呼び出し元への復帰を助ける仕組み。

auto-ctagsはこのタグファイル生成をVimから操作しやすくしてくれます。

* `:Ctags` でOK
* `let g:auto_ctags = 1`で保存時自動生成

---

### 2. 数が多い

---

### 2. 数が多い → 気合

気合というのは（半分）冗談で…。

---

高速化・効率化できる工夫をしていきましょう。

---

効率化できる余地を探す

---

（私の環境の場合）

zsh + vim + tig + etc...

---

この辺から手入れをしてみる

* git & tig
* zsh
* vim
* そのほか

それぞれ効率化できそうな場所を探していきます

---

#### git

---

レビューでよくつかうgit系のalias

```zsh
alias gdw="git diff --color-words"
alias glogg='git log --graph --name-status --pretty=format:"%C(red)%h %C(green)%an %Creset%s %C(yellow)%d%Creset"'
alias gbrc="~/dotfiles/bin/git-checkout-remote-branch"
```

---

`alias gdw="git diff --color-words"`

インラインdiff

spaceやインデントをスルーしてくれるので変数名・関数名の変更などが見やすくなる

通常の`git diff`と適宜使い分け。

---

`alias glogg='git log --graph --name-status --pretty=format:"%C(red)%h %C(green)%an %Creset%s %C(yellow)%d%Creset"'`

tigがめんどくさいときに。`--pretty`は表現力が高いので自分の使いやすいように加工すると良い。

---

`alias gbrc="~/dotfiles/bin/git-checkout-remote-branch"`

中身はただのshellです

git branch --remoteの出力をfuzzy finderで絞込選択し，選択後自動的に当該ブランチをチェックアウトします。

マジ便利。

特に，ブランチ名が長い・リモートブランチ数が多いリポジトリにおすすめ。

---

1. git
  * `git config --global credentials.helper ***` 使いましょう，パス入力とかだるいでしょ
    * urlにbasic認証はセキュリティ意識低いからね，気をつけようね
  * その他よくつかうgit alias.
    * gbrc (&fzf)
2. tig 
  * .tigrc
3. zsh
  * zgen (or zplug)
  * oh-my-zsh/plugins 色々
  * zsh-users/* 色々
  * ghq + peco
  * powerd_cd + fzf
  * zshのパフォーマンス計測
  > こうやってはかるのだ
  ```sh
  # zshenv
  zmodload zsh/zprof && zprof
  ```
  ```sh
  # zshrc
  if (which zprof > /dev/null) ;then
    zprof | less
  fi
  ```
  * 今ならfish&fishermanもアリだね
4. vim 
  * vim-fugitive
  * 主要言語にほぼ対応する（させる）ことが重要
  * コミュニティ巨大，highlightingやcomplessionのpluginは多くあるので適宜補える
  * その他，語りきれないので割愛
  * エディタはAtom，VSCode，IntelliJなど好きなもので。
5. ripgrep
  * 超早い,おすすめ
  * sortはされないのでその場合はパイプするかag|ptを代用せよ
  * vimgrepをripgrepにすると快適
    * `command! -nargs=* -complete=file Rg :tabnew | :silent grep <args>`
6. universal-ctags
  * ビルドインストール推奨
  * モダン言語にも対応してる，vimが更に便利に