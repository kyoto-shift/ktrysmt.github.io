---
layout: post
title: "XML署名のチェックをxmlsec1で行うPHPのコード"
date: 2015-04-25
comments: true
category: Evernote
tags: Evernote
published: true
---

xmlsec1のチェックをPHPで呼び出して署名チェックとする。

## Install Libraries

CentOSの場合です。

```
yum -y install xmlsec1-openssl-devel
exec $SHELL
```

## 構造と参照ルール

XML署名に関する要素は<Signature>要素以下で記載するルールになっている。
<Signature>以下に<Reference>という要素があり、その参照先が署名をしたいxml構造の要素ということになる。
<Reference URI="#hogehoge">とあれば、
それはID="hogehoge"な要素を参照している、という意味になる。
これは署名の種類がEnveloped、Enveloping、Detachedのどれであっても同じ。

署名のチェックには証明書（に含まれる公開鍵）が必要だが、それは<Signature>要素下の<X509Certificate>要素に記載されている。

## xmlsec1でチェックを行う

Reference先を<Assertion ID="hogehoge">とすると、xmlsec1コマンドは以下。
出力内容が標準エラーに出るので`2>&1`で表示出力にリダイレクトしている。

IDを引数でインタラクティブに指定しないとxmlsec1はどこにIDがあるのかリファレンスを追いかけられないようだ。
なので`--id-attr`で指定している。

```
xmlsec1 --verify --pubkey-cert-pem <証明書ファイルパス> --id-attr:ID Assertion <XMLファイルパス> 2>&1
```

### parse xml

無理やり全要素取り出してるだけ。
key番号を要素ごと振っているが正しい構造ではとれていないと思う。
ちゃんと参照・取り出しするならDMLDocumentを使う方がいい。

```
    private function saml_parser($xml) {

        file_put_contents("/tmp/data.xml",$xml);
        $parser=xml_parser_create();
        $GLOBALS["count"] = 0;

        function start($parser,$element_name,$element_attrs)
        {
            foreach ($element_attrs as $key => $val) {
                $GLOBALS["result"][$GLOBALS["count"]][$key] = $val;
            }
        }

        function stop($parser,$element_name)
        {
            $GLOBALS["result"][$GLOBALS["count"]]["key"] = $element_name;
            $GLOBALS["count"]++;
        }

        function char($parser,$data)
        {
            $GLOBALS["result"][$GLOBALS["count"]]["text"] = $data;
        }

        xml_set_element_handler($parser,"start","stop");
        xml_set_character_data_handler($parser,"char");
        $fp=fopen("/tmp/data.xml","r");

        while ($data=fread($fp,4096))
        {
            xml_parse($parser,$data,feof($fp)) or
                die (sprintf("XML Error: %s at line %d",
                    xml_error_string(xml_get_error_code($parser)),
                    xml_get_current_line_number($parser)));
        }

        xml_parser_free($parser);
        return $GLOBALS["result"];
    }
```

### verify signature

```
    function verify($xml,$data){

      $id = null;
      $cert = null;
      $xml_path = "";
      $cert_path = "";

      # get nameid (uniq)
      foreach ($data as $value) {
        if ($value["key"] == "UNIQUEID") { // uniqであればなんでもよい
          $id = $value["text"];
        }
        if ($value["key"] == "X509CERTIFICATE") { // またはDS:X509CERTIFICATE
          $x509 = $value["text"];
        }
        if ($nameid && $x509) break;
      }

      # set xml and certificate
      $cert_path = "/tmp/cert.pem";
      $xml_path = "/tmp/".$id;
      $cert = "-----BEGIN CERTIFICATE-----".PHP_EOL .
              chunk_split($x509, 64, PHP_EOL) .
              "-----END CERTIFICATE-----" . PHP_EOL;
      file_put_contents($cert_path,$cert);
      file_put_contents($xml_path,$xml);

      # exec xmlsec1 (verify xml signature)
      $cmd = "xmlsec1 --verify --pubkey-cert-pem {$cert_path} --id-attr:ID Assertion {$xml_path} 2>&1";
      exec($cmd,$response);

      # check response
      foreach ($response as $val) {
        if ($val === "OK") return true;
      }
      return false;
    }
```

## Reference

- <http://xmlsec.aleksey.narkive.com/qEt7455u/error-libxml2-library-function-failed-expr-xpointer>
- <http://php-archive.net/php/php-dom-xpath/>