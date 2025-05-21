---
id: notification
title: Notification
sidebar_label: Notification
---

## Overview

Notification は、ポップアップの通知を表示します。

import { NotificationComponent } from "@site/static/js/samples/desktop/notification.jsx"

<NotificationComponent />

---

## Specification

### Property

使用できるプロパティの一覧です。プロパティを指定して値を更新することができます。

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | "" | コンポーネントの class 名 ||
| text | string | "" | 表示するテキスト | content が未指定の場合、text が表示される<br/>その他の場合、text は無視される |
| type | string | "danger" | 背景色 | 以下を指定できる<br/>"danger" : Red(#e74c3c)<br/>"info" : Blue(#3498db)<br/>"success" : Green(#91c36c) |
| content *1 | string/HTMLElement | ""  | 表示する DOM | HTML が記載された string を指定した場合、自動的に HTML に変換してそのまま表示される |
| duration | number | -1 | コンポーネントを閉じるまでのミリ秒 | 単位はミリ秒<br/>0以上の数値を指定できる<br/>もし不正な値を指定した場合（0未満もしくは数値以外）、コンポーネントは開かれたまま自動的には閉じない |
| container | HTMLElement | document.body | コンポーネントを追加する対象の要素 | デフォルトではトップレベルのドキュメントオブジェクトのボディを使うので、ほとんどの場合は document.body となる<br/>container が HTMLElement 以外の場合、エラーを出力する |

:::caution
*1: kintone UI Component はこのプロパティの値を内部的にサニタイズしていません。ユーザー入力を受け付けるような実装でこのプロパティを使用する場合は、開発者自身で XSS 対策をしてください。
:::

### Event

指定できるイベントの一覧です。

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| close | function | コンポーネントが閉じられた時のイベントハンドラ | 引数には Event の event オブジェクトをとる |

### Constructor

Notification(options)<br/>
使用できるコンストラクタの一覧です。

#### Parameter
| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| options | object | \{\} | コンポーネントのプロパティを含むオブジェクト | |

### Method

使用できるメソッドの一覧です。

#### open()
Notification を表示する

##### Parameter
none

##### Return
none

#### close()
Notification を非表示にする

##### Parameter
none

##### Return
none

### Custom CSS
:::tip
[Custom CSS](../../getting-started/custom-css.md) をご確認ください。
:::

コンポーネントのスタイルを変更するために使用できるプロパティの一覧です。
#### Property
| Name |
| :--- |
| --kuc-notification-font-size |
| --kuc-notification-color |
| --kuc-notification-background-color |
| --kuc-notification-close-button-background-color |

---
## Sample Code

:::tip
[導入と実装方法](../../getting-started/quick-start.md#導入と実装方法) をご確認ください。
:::

全てのパラメータを指定した場合のサンプルコードです。

```javascript
const Kuc = Kucs['1.x.x'];

const notification = new Kuc.Notification({
  text: 'Error occurred!',
  content:
    'Error occurred!<br>Please click the <a href="#">Link</a> for details.',
  type: 'danger',
  className: 'options-class',
  duration: 2000,
  container: document.body
});

notification.addEventListener('close', event => {
  console.log(event);
});

notification.open();
notification.close();
```

---

## Related Articles

- [Search box customization](../../guides/search-box-customization.md)
- [Cleaning check list customization](../../guides/cleaning-check-list-customization.md)
- [Bulk update customization](../../guides/bulk-update-customization.md)
