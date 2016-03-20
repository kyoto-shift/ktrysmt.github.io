---
layout: post
title: "JenkinsでPhingを使う"
date: 2015-02-19
comments: true
category: CI
tags: CI Jenkins PHP
published: true
---


事前に以下はインストール済みと想定

- Jenkins
- PHP

## 1. Install in the jenkins server

```
pear upgrade-all
pear channel-discover pear.phing.info
pear install --alldeps phing/phing
```

## 2. Install Jenkins Plugins

+ Phing plugin
+ Checkstyle Plugin
+ PMD Plugin
+ DRY Plugin
+ Git Plugin
+ PHP Plugin

## 3. Configure Jenkins Build

+ プロジェクトを新規作成
+ ソースコード管理を設定
+ ビルド・トリガを設定
+ ビルドにPhingの呼び出しを設定
+ Phingの呼び出しに`${WORKSPACE}/../build.xml`と入力
+ ビルド後の処理に`Checkstyle警告の集計`,`PMD警告の集計`,`重複コード分析の集計`を追加
+ 追加したビルド後の処理それぞれの`集計するファイル`に、
`../reports/phpcs.xml`,`../reports/phpmd.xml`,`../reports/phpcpd.xml`,を追加

## 4. Import CodeSniffer of CodeIgniter

phpcsでCodeIgniterの規約チェックが出来るようにGithubからソースを取得して設置。

```
cd /tmp
git clone https://github.com/thomas-ernest/CodeIgniter-for-PHP_CodeSniffer.git
cp -R CodeIgniter-for-PHP_CodeSniffer/src /usr/share/pear/PHP/CodeSniffer/Standards/CodeIgniter
```

## 5. make build.xml

Jenkinsサーバ内にbuild.xmlを作成する。

保存場所は`${WORKSPACE}/../build.xml`とし、以下のようにxmlを記述。

```
<?xml version="1.0" encoding="utf-8" ?>
<project name= "BuildTest" basedir= "." default= "main">

  <target name="main" depends= "init,phpmd,phpcpd"></target>

  <!-- init -->
  <target name="init">
    <delete dir= "../reports" includeemptydirs= "true" />
    <mkdir dir= "../reports" />
  </target>

  <!-- phpcs -->
  <target name="phpcs">
    <exec dir="." command="
      phpcs --standard=CodeIgniter --report-checkstyle=../reports/phpcs.xml
    " />
  </target>

  <!-- phpmd -->
  <target name="phpmd">
    <exec dir="." command="
      phpmd
      codesize,controversial,design,naming,unusedcode
      --reportfile ../reports/phpmd.xml
    " />
  </target>

  <!-- phpcpd -->
  <target name="phpcpd">
    <exec dir="." command="
      phpcpd
      --log-pmd ../reports/phpcpd.xml
    " />
  </target>

</project>

```

`${WORKSPACE}`以下にはGitで取得したソースが展開されるので、レポートの出力場所は一階層上に設定する。


## 6. report error 未解決。


## 参考

- <http://d.hatena.ne.jp/yk5656/20140617/1404310791>
