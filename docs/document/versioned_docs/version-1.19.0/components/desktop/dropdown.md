---
id: dropdown
title: Dropdown
sidebar_label: Dropdown
---

## Overview

The Dropdown component allows the user to select one out of several options.

import { DropdownComponent } from "@site/static/js/samples/desktop/dropdown.jsx"

<DropdownComponent />

---

## Specification

### Property

Here is a list of properties that can be used for modifying the component:

| Name  | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| className | string | ""  | Component class name | |
| error | string | ""  | Text to be displayed in error | Error will not be displayed if unspecified or empty |
| id | string | ""  | Component id name | |
| label | string | ""  | Label for the component | Label is not displayed if unspecified or empty |
| value *1 | string | ""  | Selected value | No option will be selected if the `value` and `selectedIndex` are unspecified<br/>If setting duplicated value and not setting `selectedIndex`, the first mapped value item in `Item.value` will be selected and `selectedIndex` will be the index number<br/>Will result an error if the value is not a string |
| selectedIndex *1 | number | -1  | Index of selected item | It supports specifying which duplicated `Item.value` will be selected if there is duplicated `Item.value` in `items`<br/>If `value` is not set and `selectedIndex` is valid, item that has the index number will be selected<br/>If `value` is set with duplicated `Item.value` and `selectedIndex` value maps with duplicated `Item.value` specified in `value`, the item that has the index number will be selected<br/>Will result an error if the value of `selectedIndex` is not a number |
| disabled | boolean | false | Enable/Disable the component | |
| requiredIcon | boolean | false | Show/Hide the required icon | |
| visible | boolean | true | Show/Hide the component | |
| items | Array\<[Item](#item)\> | []  | List of options to display | Will result an error if the value of items is not an array |

:::info
*1: You can set duplicated value in `Item.value`. In case setting duplicated value, you can handle selected item using `value` and `selectedIndex` property.<br/>
Example: When setting `items = [{label: 'Orange', value: 'fruit'}, {label: 'Apple', value: 'fruit'}, {label: 'Carrot', value: 'vegetable'}]`

- If setting `value` and not setting `selectedIndex` as follows:
  - value = 'fruit': The first item will be selected.
  - value = 'other': No item will be selected.

- If not setting `value` and setting `selectedIndex` as follows:
  - selectedIndex = 1: The second item will be selected.
  - selectedIndex = 99: No item will be selected.
:::

#### Item

| Name   | Type | Default | Description | Remark |
| :--- | :--- | :--- | :--- | :--- |
| label | string | null | Text label for each option | If `Item.label` is unspecified, the value of `Item.value` is displayed on the UI |
| value | string | null | Value of each option | Can set duplicated value in `Item.value` |
| disabled | boolean | false | Enable/Disable each option | |

### Event

Here is a list of events that can be specified:

| Name | Type | Description | Remark |
| :--- | :--- | :--- | :--- |
| change | function | Event handler when the value has been changed | It will pass the event object as the argument<br/><br/>You can receive the following values in event.detail<br/>event.detail.oldValue : Value before the change<br/>event.detail.value : Value after changing |

### Constructor

Dropdown(options)<br/>
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
"toggle" means the area of the Dropdown button.
#### Property
| Name |
| :--- |
| --kuc-dropdown-font-size |
| --kuc-dropdown-toggle-width |
| --kuc-dropdown-toggle-height |
| --kuc-dropdown-toggle-color |
| --kuc-dropdown-menu-color |
| --kuc-dropdown-menu-color-selected |
| --kuc-dropdown-menu-max-height |

---
## Sample Code

:::tip
Please check the [package installation](../../getting-started/quick-start.md#installation) method first.
:::

Here is a sample code when all parameters are specified:

```javascript
const Kuc = Kucs['1.x.x'];

const space = kintone.app.record.getSpaceElement('space');

const dropdown = new Kuc.Dropdown({
  label: 'Fruit',
  requiredIcon: true,
  items: [
    {
      label: 'orange',
      value: 'Orange'
    },
    {
      label: 'apple',
      value: 'Apple'
    },
    {
      label: 'banana',
      value: 'Banana',
      disabled: true
    }
  ],
  value: 'Orange',
  selectedIndex: 0,
  error: 'Error occurred!',
  className: 'options-class',
  id: 'options-id',
  visible: true,
  disabled: false
});
space.appendChild(dropdown);

dropdown.addEventListener('change', event => {
  console.log(event);
});
```

---

## Related Articles

- [Cleaning check list customization](../../guides/cleaning-check-list-customization.md)
- [Format setting plug-in](../../guides/format-setting-plugin.md)
- [In-office day list customization](../../guides/in-office-day-list-customization.md)
- [Table and ReadOnlyTable customization](../../guides/table-readonly-table-customization.md)
