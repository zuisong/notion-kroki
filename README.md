# notion-kroki

![Codecov](https://img.shields.io/codecov/c/github/zuisong/notion-kroki)
![GitHub branch checks state](https://img.shields.io/github/checks-status/zuisong/notion-kroki/main)
![GitHub top language](https://img.shields.io/github/languages/top/zuisong/notion-kroki)
![GitHub last commit](https://img.shields.io/github/last-commit/zuisong/notion-kroki)

## 前置条件(Pre Condition)

### Make sure you have installed **Violentmonkey** or **Tampermonkey**

### 在使用之前请先确保你已经在浏览器安装了脚本管理插件 **Violentmonkey** 或者 **Tampermonkey**

| Browser | Violentmonkey                          | Tampermonkey                         |
| ------- | -------------------------------------- | ------------------------------------ |
| Chrome  | [Violentmonkey][chrome_violentmonkey]  | [Tampermonkey][chrome_tampermonkey]  |
| Firefox | [Violentmonkey][firefox_violentmonkey] | [Tampermonkey][firefox_tampermonkey] |
| Edge    | [Violentmonkey][edge_violentmonkey]    | [Tampermonkey][edge_tampermonkey]    |

## 安装(How to install)

[💥 Click me install user script 💥][install_link]

[💥 点我安装脚本 💥][install_link]

## Usage

### 1. Add a **Plain Text** code block with content

```text
//kroki plantuml
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very\nlong" as Long
' You can also declare:
' "Bob()" -> Long as "This is very\nlong"
Long --> "Bob()" : ok
@enduml
```

PS: **first line is very important**

### 2. Then, you will got like this

![demo](./imgs/demo.png)

[chrome_violentmonkey]: https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag
[chrome_tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[firefox_tampermonkey]: https://addons.mozilla.org/firefox/addon/tampermonkey/
[firefox_violentmonkey]: https://addons.mozilla.org/firefox/addon/violentmonkey/
[edge_tampermonkey]: https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd
[edge_violentmonkey]: https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao
[opera_tampermonkey]: https://addons.opera.com/extensions/details/tampermonkey-beta/
[opera_violentmonkey]: https://addons.opera.com/extensions/details/violent-monkey/
[install_link]: https://cdn.jsdelivr.net/gh/zuisong/notion-kroki@latest/notion-kroki.user.js
