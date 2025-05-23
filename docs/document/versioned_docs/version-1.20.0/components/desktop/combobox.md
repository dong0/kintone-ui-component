---
id: combobox
title: Combobox
sidebar_label: Combobox
---

## Overview

The Combobox component allows the user to find an item among many choices.

import { ComboboxComponent } from "@site/static/js/samples/desktop/combobox.jsx"

<ComboboxComponent />

---

## Specification

### Property

Here is a list of properties that can be used for modifying the component:

| Name   | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | ""  | Component class name | |
| error | string | ""  | Text to be displayed in error | Error will not be displayed if unspecified or empty |
| id | string | ""  | Component id name | |
| label | string | ""  | Label for the component | Label is not displayed if unspecified or empty |
| placeholder | string | "" | Placeholder text displayed in the input field | |
| value | string | ""  | Component value | No option will be selected if the value is unspecified<br/>Will result an error if the value is not a string |
| disabled | boolean | false | Enable/Disable the component | |
| requiredIcon | boolean | false | Show/Hide the required icon | |
| visible | boolean | true | Show/Hide the component | |
| items | Array\<[Item](#item)\> | []  | List of options to display | Will result an error if the value of items is not an array |

#### Item

| Name   | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| label | string | null | Text label for each option | If `Item.label` is unspecified, the value of `Item.value` is displayed on the UI |
| value | string | null | Value of each option | Will result an error if setting duplicated value in `Item.value` |
| disabled | boolean | false | Enable/Disable each option | |

### Event

Here is a list of events that can be specified:

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| change | function | Event handler when the value has been changed | It will pass the event object as the argument<br/><br/>You can receive the following values when used in event.detail<br/>event.detail.oldValue : Value before the change<br/>event.detail.value : Value after the change |

### Constructor

Combobox(options)<br/>
Here is a list of available constructors:

#### Parameter

| Name | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| options | object | \{\} | Object that includes component properties | |

### Custom CSS
:::tip
Please check [Custom CSS feature guide](../../getting-started/custom-css.md) at first.
:::

Here is a list of properties that can be used for modifying component style:<br/>
"toggle" means the area of the Combobox input box and button.
#### Property
| Name |
| :--- |
| --kuc-combobox-font-size |
| --kuc-combobox-toggle-width |
| --kuc-combobox-toggle-height |
| --kuc-combobox-toggle-color |
| --kuc-combobox-menu-color |
| --kuc-combobox-menu-color-selected |
| --kuc-combobox-menu-max-height |

---

## Sample Code

:::tip
Please check the [package installation](../../getting-started/quick-start.md#installation) method first.
:::

Here is a sample code when all parameters are specified:

```javascript
const Kuc = Kucs['1.x.x'];

const space = kintone.app.record.getSpaceElement('space');

const combobox = new Kuc.Combobox({
  label: 'Fruit',
  items: [
    { label: 'Banana', value: 'banana', disabled: true },
    { label: 'Orange', value: 'orange' },
    { label: 'Apple', value: 'apple' }
  ],
  value: 'orange',
  requiredIcon: true,
  error: 'Error occurred!',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  disabled: false,
  placeholder: 'Please select a fruit'
});
space.appendChild(combobox);

combobox.addEventListener('change', event => {
  console.log(event);
});
```
