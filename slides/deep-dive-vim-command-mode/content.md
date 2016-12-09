## Deep Dive Vim Command Mode

Kotaro Yoshimatsu   

Recruit Sumai Company Ltd.    
12/15 2016  

---

## Whois
 
- <https://twitter.com/ktrysmt>
- <https://github.com/ktrysmt>
 
---

## Command Mode maked up by two facts

1. TEXT OBJECT
2. OPERATOR

---

## 1. Text Object

---

## Text Object ?

= Any Rnage.

> The range of any selected character string

--

The Range is determined by

- Motion

Or,

- Visual Mode

---

## Motion ?

---

## Motion

Basic;

|MOTIONS|KEY|
|---|---|---|
|left-right-motions| {count} + h,l,^,$,0,f,F,t,T |
|up-down-motions| {count} + k,j,gk,gj,G,gg,% |
|word-motions| {count} + w,W,e,E,b,B,ge,gE,s,p |   
|object-motions| {count} + (,),{,} | 

--
 
Example;
 
|KEY|RANGE|
|---|---| 
|5j| Five rows down | 
|5w| Three words forward |
|4$| Four rows lower line end| 


--
 
Also append that;
 
|MEAN|KEY|
|---|---|
|around|a|
|inner|i|

--

Example combined them;

|KEY|RANGE|
|---|---|
|aw | A word and whitespace behind it |
|iw| A word (exclude whitespace) |
|a"| Words enclosed in doublequotes (include quotes) |
|i"| Words enclosed in doublequotes (exclude quotes) |
|as| A Sentence and whitespace behind it |
|is| A Sentence (exclude whitespace) | 

Footnote; Visual mode or Operator required.


---

 
## 2. Operator


---

 

## Operator ?

|KEY|BEHAVIOR|
|---|---|
|y| Yank (Copy) |
|c| Change (Delete then Switch Insert Mode) |
|d| Delete |
|~| Toggle uppercase or lowercase |
|u| Make lowercase |
|U| Make uppercase | 
|>| Indent right | 
|<| Indent left | 
 
---


## Combine Text Object and Operator

---

## Combine Text Object and Operator

|KEY|BEHAVIOR|
|---|---|
|yiw| Yank a word (exclude whitespace) |
|ya"| Yank words enclosed in doublequotes (include quotes) |
|d5j| Delete Five rows |

---

## Conclusion

- Focus on Operator and Text Object
- Learn a combination easy-to-use 


---


## thank you for your attention

### References

- [Vim のテキスト編集 〜基礎編〜 \- Vim のブログ](http://vimblog.hatenablog.com/entry/vim_edit_basic)
- [Vimのオペレーターとモーションについて ‹ 技術の犬小屋](http://promamo.com/?p=1968)
- [Vim のモーションについて \- Qiita](http://qiita.com/b4b4r07/items/7fc12842d03e7e46412c)




