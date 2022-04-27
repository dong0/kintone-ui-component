var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, queryAll, query, state } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps, validateItems, validateValueArray, validateSelectedIndexArray, throwErrorAfterUpdateComplete } from "../base/validator";
import { ERROR_MESSAGE } from "../base/constant";
export class MultiChoice extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.disabled = false;
        this.requiredIcon = false;
        this.visible = true;
        this.items = [];
        this.selectedIndex = [];
        this.value = [];
        this._valueMapping = {};
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        this._setInitialValue(validProps);
        Object.assign(this, validProps);
    }
    _setInitialValue(validProps) {
        const hasValue = "value" in validProps;
        const hasSelectedIndex = "selectedIndex" in validProps;
        const _selectedIndex = validProps.selectedIndex || [];
        if (!hasValue && hasSelectedIndex) {
            if (!validateSelectedIndexArray(_selectedIndex))
                return;
            const _valueMapping = this._getValueMapping(validProps);
            this.value = this._getValidValue(_valueMapping, _selectedIndex);
        }
    }
    shouldUpdate(changedProperties) {
        if (changedProperties.has("items")) {
            if (!validateItems(this.items)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ITEMS.IS_NOT_ARRAY);
                return false;
            }
        }
        if (changedProperties.has("value")) {
            if (!validateValueArray(this.value)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.VALUE.IS_NOT_ARRAY);
                return false;
            }
        }
        if (changedProperties.has("selectedIndex")) {
            if (!validateSelectedIndexArray(this.selectedIndex)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.SELECTED_INDEX.IS_NOT_ARRAY);
                return false;
            }
        }
        return true;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("value")) {
            if (this.value.length > 0)
                return;
            this.selectedIndex = [];
        }
    }
    update(changedProperties) {
        if (changedProperties.has("items") ||
            changedProperties.has("value") ||
            changedProperties.has("selectedIndex")) {
            this._valueMapping = this._getValueMapping({
                items: this.items,
                value: this.value,
                selectedIndex: this.selectedIndex
            });
            this._setValueAndSelectedIndex();
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div class="kuc-multi-choice__group">
        <div
          class="kuc-multi-choice__group__label"
          id="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <span class="kuc-multi-choice__group__label__text">${this.label}</span
          ><!--
          --><span
            class="kuc-multi-choice__group__label__required-icon"
            ?hidden="${!this.requiredIcon}"
            >*</span
          >
        </div>
        <div
          class="kuc-multi-choice__group__menu"
          role="listbox"
          aria-multiselectable="true"
          aria-describedby="${this._GUID}-error"
          aria-labelledby="${this._GUID}-label"
          ?disabled="${this.disabled}"
          tabindex="${this.disabled ? "-1" : "0"}"
          @keydown="${this._handleKeyDownMultiChoice}"
        >
          ${this.items.map((item, number) => this._getMenuItemTemplate(item, number))}
        </div>
        <div
          class="kuc-multi-choice__group__error"
          id="${this._GUID}-error"
          role="alert"
          aria-live="assertive"
          ?hidden="${!this.error}"
        >
          ${this.error}
        </div>
      </div>
    `;
    }
    _getValueMapping(validProps) {
        const _items = validProps.items || [];
        const _value = validProps.value || [];
        const _selectedIndex = validProps.selectedIndex || [];
        const itemsValue = _items.map(item => item.value || "");
        const itemsMapping = Object.assign({}, itemsValue);
        const result = {};
        if (_value.length === 0) {
            const value = this._getValidValue(itemsMapping, _selectedIndex);
            _selectedIndex.forEach((key, i) => (result[key] = value[i]));
            return result;
        }
        const validSelectedIndex = this._getValidSelectedIndex(itemsMapping);
        validSelectedIndex.forEach((key, i) => (result[key] = _value[i]));
        return result;
    }
    _getValidValue(itemsMapping, _selectedIndex) {
        return _selectedIndex
            .filter(item => itemsMapping[item])
            .map(item => itemsMapping[item]);
    }
    _getValidSelectedIndex(itemsMapping) {
        const validSelectedIndex = [];
        for (let i = 0; i < this.value.length; i++) {
            const selectedIndex = this.selectedIndex[i];
            if (itemsMapping[selectedIndex] === this.value[i]) {
                validSelectedIndex.push(selectedIndex);
                continue;
            }
            const firstIndex = this.items.findIndex(item => item.value === this.value[i]);
            validSelectedIndex.push(firstIndex);
        }
        return validSelectedIndex;
    }
    _setValueAndSelectedIndex() {
        this.value = Object.values(this._valueMapping);
        this.selectedIndex = Object.keys(this._valueMapping).map(key => parseInt(key, 10));
    }
    _handleMouseDownMultiChoiceItem(event) {
        if (this.disabled)
            return;
        const itemEl = event.target;
        const value = itemEl.getAttribute("value");
        const selectedIndex = itemEl.dataset.index || "0";
        this._handleChangeValue(value, selectedIndex);
    }
    _handleMouseOverMultiChoiceItem(event) {
        if (this.disabled)
            return;
        this._itemsEl.forEach((itemEl) => {
            if (itemEl.classList.contains("kuc-multi-choice__group__menu__highlight")) {
                itemEl.classList.remove("kuc-multi-choice__group__menu__highlight");
            }
        });
        const itemEl = event.currentTarget;
        itemEl.classList.add("kuc-multi-choice__group__menu__highlight");
        this._setActiveDescendant(itemEl.id);
    }
    _handleMouseLeaveMultiChoiceItem(event) {
        if (this.disabled)
            return;
        const itemEl = event.currentTarget;
        itemEl.classList.remove("kuc-multi-choice__group__menu__highlight");
        this._setActiveDescendant();
    }
    _handleKeyDownMultiChoice(event) {
        if (this.disabled)
            return;
        let highLightNumber = 0;
        switch (event.key) {
            case "Up": // IE/Edge specific value
            case "ArrowUp": {
                event.preventDefault();
                this._itemsEl.forEach((itemEl, number) => {
                    if (itemEl.classList.contains("kuc-multi-choice__group__menu__highlight")) {
                        itemEl.classList.remove("kuc-multi-choice__group__menu__highlight");
                        highLightNumber = number - 1;
                    }
                });
                highLightNumber =
                    highLightNumber <= -1 ? this._itemsEl.length - 1 : highLightNumber;
                const currentItemEl = this._itemsEl[highLightNumber];
                currentItemEl.classList.add("kuc-multi-choice__group__menu__highlight");
                this._setActiveDescendant(currentItemEl.id);
                break;
            }
            case "Down": // IE/Edge specific value
            case "ArrowDown": {
                event.preventDefault();
                this._itemsEl.forEach((itemEl, number) => {
                    if (itemEl.classList.contains("kuc-multi-choice__group__menu__highlight")) {
                        itemEl.classList.remove("kuc-multi-choice__group__menu__highlight");
                        highLightNumber = number + 1;
                    }
                });
                highLightNumber =
                    highLightNumber >= this._itemsEl.length ? 0 : highLightNumber;
                const currentItemEl = this._itemsEl[highLightNumber];
                currentItemEl.classList.add("kuc-multi-choice__group__menu__highlight");
                this._setActiveDescendant(currentItemEl.id);
                break;
            }
            case "Spacebar": // IE/Edge specific value
            case " ": {
                event.preventDefault();
                this._itemsEl.forEach((itemEl) => {
                    if (itemEl.classList.contains("kuc-multi-choice__group__menu__highlight")) {
                        const value = itemEl.getAttribute("value");
                        const selectedIndex = itemEl.dataset.index || "0";
                        this._handleChangeValue(value, selectedIndex);
                    }
                });
                break;
            }
            default:
                break;
        }
    }
    _getMultiChoiceCheckedIconSvgTemplate(disabled, checked) {
        return svg `
      ${checked
            ? svg `<svg
          class="kuc-multi-choice__group__menu__item__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
            fill="${disabled ? "#888888" : "#3498db"}"
          />
        </svg>`
            : ""}`;
    }
    _isCheckedItem(item, index) {
        const values = Object.values(this._valueMapping);
        const keys = Object.keys(this._valueMapping);
        const result = values.filter((val, indexVal) => val === item.value && index === parseInt(keys[indexVal], 10));
        return result.length > 0;
    }
    _getMenuItemTemplate(item, index) {
        const isCheckedItem = this._isCheckedItem(item, index);
        return html `
      <div
        class="kuc-multi-choice__group__menu__item"
        role="option"
        aria-selected="${isCheckedItem}"
        aria-required="${this.requiredIcon}"
        data-index="${index}"
        value="${item.value !== undefined ? item.value : ""}"
        id="${this._GUID}-menuitem-${index}"
        @mousedown="${this._handleMouseDownMultiChoiceItem}"
        @mouseover="${this._handleMouseOverMultiChoiceItem}"
        @mouseleave="${this._handleMouseLeaveMultiChoiceItem}"
      >
        ${this._getMultiChoiceCheckedIconSvgTemplate(this.disabled, isCheckedItem)}
        ${item.label === undefined ? item.value : item.label}
      </div>
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-multi-choice,
        kuc-multi-choice *,
        :lang(en) kuc-multi-choice,
        :lang(en) kuc-multi-choice * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-multi-choice,
        :lang(ja) kuc-multi-choice * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-multi-choice,
        :lang(zh) kuc-multi-choice * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        kuc-multi-choice {
          display: inline-table;
          font-size: 14px;
          color: #333333;
          width: 180px;
          min-width: 180px;
          line-height: 1.5;
        }
        kuc-multi-choice[hidden] {
          display: none;
        }
        .kuc-multi-choice__group {
          border: none;
          padding: 0px;
          height: auto;
          display: inline-block;
          width: 100%;
          margin: 0px;
        }
        .kuc-multi-choice__group__label {
          padding: 4px 0px 8px 0px;
          display: inline-block;
          white-space: nowrap;
        }
        .kuc-multi-choice__group__label[hidden] {
          display: none;
        }
        .kuc-multi-choice__group__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-multi-choice__group__label__required-icon[hidden] {
          display: none;
        }
        .kuc-multi-choice__group__error {
          line-height: 1.5;
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin: 8px 0px;
          word-break: break-all;
          white-space: normal;
        }
        .kuc-multi-choice__group__error[hidden] {
          display: none;
        }
        .kuc-multi-choice__group__menu {
          position: relative;
          background: #ffffff;
          border: 1px solid #e3e7e8;
          box-sizing: border-box;
          box-shadow: 1px 1px 12px #f5f5f5 inset, -1px -1px 12px #f5f5f5 inset;
          padding: 6px 0;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: 134px;
          width: 100%;
        }
        .kuc-multi-choice__group__menu:not([disabled]):focus {
          outline: none;
          border: 1px solid #3498db;
        }
        .kuc-multi-choice__group__menu[disabled] {
          background-color: #dbdcdd;
          box-shadow: none;
          cursor: not-allowed;
          color: #888888;
          outline: none;
        }
        .kuc-multi-choice__group__menu__item {
          padding: 4px 16px;
          margin-bottom: 2px;
          line-height: 1;
          position: relative;
          white-space: nowrap;
        }
        .kuc-multi-choice__group__menu__item__icon {
          position: absolute;
          top: 50%;
          left: 16px;
          margin-top: -6px;
          pointer-events: none;
        }
        .kuc-multi-choice__group__menu__item[aria-selected="true"] {
          color: #3498db;
          padding-left: 32px;
        }
        .kuc-multi-choice__group__menu[disabled]
          .kuc-multi-choice__group__menu__item[aria-selected="true"] {
          color: #888888;
        }
        .kuc-multi-choice__group__menu__highlight[role="option"] {
          background-color: #e2f2fe;
          cursor: pointer;
        }
      </style>
    `;
    }
    _setActiveDescendant(value) {
        value !== undefined && this._menuEl !== null
            ? this._menuEl.setAttribute("aria-activedescendant", value)
            : this._menuEl.removeAttribute("aria-activedescendant");
    }
    _handleChangeValue(value, selectedIndex) {
        const oldValue = !this.value ? this.value : [...this.value];
        const newValueMapping = this._getNewValueMapping(value, selectedIndex);
        const itemsValue = this.items.map(item => item.value);
        const newValue = Object.values(newValueMapping).filter(item => itemsValue.indexOf(item) > -1);
        if (newValue === oldValue)
            return;
        const newSelectedIndex = Object.keys(newValueMapping).map((item) => parseInt(item, 10));
        this.value = newValue;
        this.selectedIndex = newSelectedIndex;
        dispatchCustomEvent(this, "change", {
            oldValue,
            value: newValue
        });
    }
    _getNewValueMapping(value, selectedIndex) {
        const selectedIndexNumber = parseInt(selectedIndex, 10);
        const keys = Object.keys(this._valueMapping);
        const newValue = Object.assign({}, this._valueMapping);
        if (keys.indexOf(selectedIndex) > -1) {
            delete newValue[selectedIndexNumber];
            return newValue;
        }
        newValue[selectedIndexNumber] = value;
        return newValue;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MultiChoice.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MultiChoice.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MultiChoice.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MultiChoice.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], MultiChoice.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MultiChoice.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MultiChoice.prototype, "visible", void 0);
__decorate([
    property({ type: Array })
], MultiChoice.prototype, "items", void 0);
__decorate([
    property({ type: Array })
], MultiChoice.prototype, "selectedIndex", void 0);
__decorate([
    property({ type: Array })
], MultiChoice.prototype, "value", void 0);
__decorate([
    query(".kuc-multi-choice__group__menu")
], MultiChoice.prototype, "_menuEl", void 0);
__decorate([
    queryAll(".kuc-multi-choice__group__menu__item")
], MultiChoice.prototype, "_itemsEl", void 0);
__decorate([
    state()
], MultiChoice.prototype, "_valueMapping", void 0);
if (!window.customElements.get("kuc-multi-choice")) {
    window.customElements.define("kuc-multi-choice", MultiChoice);
}