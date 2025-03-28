---
id: tabs
title: Tabs
sidebar_label: Tabs
---

## Overview

The Tabs component allows the user to display multiple tabs that can switch displaying contents.

import { TabsComponent } from "@site/static/js/samples/desktop/tabs.jsx"

<TabsComponent />

---

## Specification

### Property

Here is a list of properties that can be used for modifying the component:

| Name   | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | ""  | Component class name | |
| id | string | ""  | Component id name | |
| value | string | ""  | Selected value | <li>If the `value` is matched in the `items`, the tab will be displayed even if it’s disabled</li><li>The first visible tab will be displayed in the following cases:<ul><li>If the `value` is not matched in the `items`</li><li>If the `value` is matched in the `items`, but the tab is not visible</li></ul></li><li>Will result an error if the `value` is not string type</li> |
| borderVisible | boolean | true  | Show/Hide the border surrounding the content | |
| scrollButtons *1 | boolean | false | Show/Hide the scroll buttons | If the `scrollButtons` is true, tabs can be scrolled horizontally and moved by clicking Scroll Buttons. |
| visible | boolean | true | Show/Hide the component | |
| items | Array\<[Item](#item)\> | [] | List of tabs to display | Will result an error if the value of `items` is not an array |

:::info
*1: When setting `scrollButtons` true, please wrap the Tabs component with a parent div element and set an appropriate max-width property. For example, when using the Tabs component within the [Header Menu Element](https://kintone.dev/en/docs/kintone/js-api/records/get-record-header-menu-element/), you can set like `max-width: 100vw`.
:::

#### Item

| Name   | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| content | string/HTMLElement | "" | Tab content | |
| label | string | "" | Tab name | |
| value | string | "" | Key of each tab<br/>*`Required` and `Unique` | Will result an error if the `value` is duplicated in `items` or not specified |
| disabled | boolean | false | Enable/Disable the tab | |
| visible | boolean | true | Show/Hide the tab | |

### Event

Here is a list of events that can be specified:

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| change | function | Event handler of when selected tab is changed |  It will pass the event object as the argument<br/><br/>You can receive the following values in event.detail<br/><li>event.detail.oldValue : "value" before the change</li><li>event.detail.value : "value" after the change</li> |

### Constructor

Tabs(options)<br/>
Here is a list of available constructors:

#### Parameter

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| options | object | \{\} | Object that includes component properties | |

### Custom CSS
:::tip
Please check [Custom CSS feature guide](../../getting-started/custom-css.md) at first.
:::

Here is a list of properties that can be used for modifying component style:
#### Property
| Name |
| :--- |
| --kuc-tabs-tab-background-color |
| --kuc-tabs-tab-background-color-selected |
| --kuc-tabs-tab-color |
| --kuc-tabs-tab-color-selected |
| --kuc-tabs-tab-font-size |
| --kuc-tabs-tab-height |
| --kuc-tabs-tab-width |

---
## Sample Code

:::tip
Please check the [package installation](../../getting-started/quick-start.md#installation) method first.
:::

Here is a sample code when all parameters are specified:

```javascript
const Kuc = Kucs['1.x.x'];

const space = kintone.app.record.getSpaceElement('space');

// Create each Tab content
const textArea = new Kuc.TextArea({
  label: 'TextArea',
  value: 'This is sample.'
});

const timePicker = new Kuc.TimePicker({
  label: 'Time',
  value: '11:30'
});

const text = 'This is sample.';

const tabs = new Kuc.Tabs({
  items: [
    {
      label: 'A',
      content: textArea,
      value: 'a',
      disabled: false
    },
    {
      label: 'B',
      content: timePicker,
      value: 'b',
      disabled: false
    },
    {
      label: 'C',
      content: text,
      value: 'c',
      disabled: false
    }
  ],
  value: 'a',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  borderVisible: true,
  scrollButtons: false
});
space.appendChild(tabs);

tabs.addEventListener('change', event => {
  console.log(event);
});
```

---

## Related Articles
- [Tabs customization](../../guides/tabs-customization.md)
