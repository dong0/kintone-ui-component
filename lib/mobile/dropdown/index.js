var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps, validateValueString, validateItems, validateSelectedIndexNumber, throwErrorAfterUpdateComplete } from "../../base/validator";
import { ERROR_MESSAGE } from "../../base/constant";
export class MobileDropdown extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.value = "";
        this.selectedIndex = -1;
        this.disabled = false;
        this.requiredIcon = false;
        this.visible = true;
        this.items = [];
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        this._setInitialValue(validProps);
        Object.assign(this, validProps);
    }
    _setInitialValue(validProps) {
        const hasValue = "value" in validProps;
        const hasSelectedIndex = "selectedIndex" in validProps;
        if (!hasValue && hasSelectedIndex) {
            this.value = this._getValue(validProps) || "";
        }
    }
    _handleChangeInput(event) {
        event.stopPropagation();
        const selectEl = event.target;
        const value = selectEl.value;
        if (this.value === value && this.selectedIndex === selectEl.selectedIndex)
            return;
        const detail = { oldValue: this.value, value: value };
        this.value = value;
        this.selectedIndex = selectEl.selectedIndex;
        dispatchCustomEvent(this, "change", detail);
    }
    shouldUpdate(changedProperties) {
        if (changedProperties.has("items")) {
            if (!validateItems(this.items)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ITEMS.IS_NOT_ARRAY);
                return false;
            }
        }
        if (changedProperties.has("value")) {
            if (!validateValueString(this.value)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.VALUE.IS_NOT_STRING);
                return false;
            }
        }
        if (changedProperties.has("selectedIndex")) {
            if (!validateSelectedIndexNumber(this.selectedIndex)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.SELECTED_INDEX.IS_NOT_NUMBER);
                return false;
            }
        }
        return true;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("value")) {
            if (this.value !== "")
                return;
            this.selectedIndex = -1;
        }
    }
    update(changedProperties) {
        if (changedProperties.has("items") ||
            changedProperties.has("value") ||
            changedProperties.has("selectedIndex")) {
            this.selectedIndex = this._getSelectedIndex();
            this.value =
                this._getValue({
                    items: this.items,
                    selectedIndex: this.selectedIndex
                }) || "";
        }
        super.update(changedProperties);
    }
    _getSelectedIndex() {
        if (!this.value) {
            if (this.items[this.selectedIndex])
                return this.selectedIndex;
            return -1;
        }
        const firstIndex = this.items.findIndex(item => item.value === this.value);
        if (firstIndex === -1)
            return -1;
        const selectedIndex = this.items.findIndex((item, index) => item.value === this.value && index === this.selectedIndex);
        return selectedIndex > -1 ? selectedIndex : firstIndex;
    }
    _getValue(validProps) {
        const _items = validProps.items || [];
        const _selectedIndex = validProps.selectedIndex === 0 || validProps.selectedIndex
            ? validProps.selectedIndex
            : -1;
        const item = _items[_selectedIndex];
        if (!item)
            return "";
        return item.value;
    }
    _isCheckedItem(item, index) {
        if (!this.value)
            return this.selectedIndex === index;
        return item.value === this.value && this.selectedIndex === index;
    }
    _getItemTemplate(item, index) {
        const isCheckedItem = this._isCheckedItem(item, index);
        return html `
      <option value="${item.value || ""}" ?selected="${isCheckedItem}">
        ${item.label === undefined ? item.value : item.label}
      </option>
    `;
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <label
        class="kuc-mobile-dropdown__label"
        for="${this._GUID}-label"
        ?hidden="${!this.label}"
      >
        <span class="kuc-mobile-dropdown__label__text">${this.label}</span
        ><!--
        --><span
          class="kuc-mobile-dropdown__label__required-icon"
          ?hidden="${!this.requiredIcon}"
          >*</span
        >
      </label>
      <div class="kuc-mobile-dropdown__input-form">
        <div
          class="kuc-mobile-dropdown__input-form__select
          ${this.requiredIcon ? "kuc--required" : ""}"
        >
          <select
            class="kuc-mobile-dropdown__input-form__select__input"
            id="${this._GUID}-label"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            aria-invalid="${this.error !== ""}"
            ?disabled="${this.disabled}"
            @change="${this._handleChangeInput}"
          >
            ${this.items.map((item, index) => this._getItemTemplate(item, index))}
          </select>
        </div>
      </div>
      <div
        class="kuc-mobile-dropdown__error"
        id="${this._GUID}-error"
        role="alert"
        aria-live="assertive"
        ?hidden="${!this.error}"
      >
        ${this.error}
      </div>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("selectedIndex")) {
            this._selectEl.selectedIndex = this.selectedIndex;
        }
        super.update(changedProperties);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-mobile-dropdown,
        kuc-mobile-dropdown * {
          font-size: 13px;
          color: #333333;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }

        :lang(zh) kuc-mobile-dropdown,
        :lang(zh) kuc-mobile-dropdown * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }

        kuc-mobile-dropdown {
          display: inline-block;
          width: 100%;
        }

        kuc-mobile-dropdown[hidden] {
          display: none;
        }

        .kuc-mobile-dropdown__label {
          display: inline-block;
          font-size: 86%;
          font-weight: bold;
          line-height: 1.5;
          padding: 0px;
          margin: 0 0 4px 0;
          white-space: nowrap;
        }

        .kuc-mobile-dropdown__label[hidden] {
          display: none;
        }

        .kuc-mobile-dropdown__label__text {
          text-shadow: 0 1px 0 #ffffff;
          color: #888888;
          white-space: normal;
          font-size: inherit;
        }

        .kuc-mobile-dropdown__label__required-icon {
          color: #d01212;
          left: 3px;
          position: relative;
        }

        .kuc-mobile-dropdown__label__required-icon[hidden] {
          display: none;
        }

        .kuc-mobile-dropdown__input-form {
          word-wrap: break-word;
          min-height: 1em;
          padding-left: 0.5em;
          padding-right: 0.5em;
        }

        .kuc-mobile-dropdown__input-form__select {
          display: inline-block;
          border-radius: 0.4em;
          max-width: 100%;
        }

        .kuc-mobile-dropdown__input-form__select.kuc--required {
          border: 1px solid #cf4a38;
        }

        .kuc-mobile-dropdown__input-form__select__input {
          min-width: 100px;
          max-width: 100%;
        }

        .kuc-mobile-dropdown__input-form__select__input:disabled {
          color: #999999;
          -webkit-text-fill-color: #999999;
          background-color: #d5d7d9;
          opacity: 1;
        }

        .kuc-mobile-dropdown__error {
          line-height: 1.5;
          color: #000000;
          background-color: #fdffc9;
          border: 1px solid #e5db68;
          border-radius: 0.4em;
          padding: 0.4em 1em;
          margin-top: 0.3em;
          margin-left: 0.5em;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MobileDropdown.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MobileDropdown.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MobileDropdown.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MobileDropdown.prototype, "label", void 0);
__decorate([
    property({ type: String })
], MobileDropdown.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], MobileDropdown.prototype, "selectedIndex", void 0);
__decorate([
    property({ type: Boolean })
], MobileDropdown.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MobileDropdown.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MobileDropdown.prototype, "visible", void 0);
__decorate([
    property({ type: Array })
], MobileDropdown.prototype, "items", void 0);
__decorate([
    query(".kuc-mobile-dropdown__input-form__select__input")
], MobileDropdown.prototype, "_selectEl", void 0);
if (!window.customElements.get("kuc-mobile-dropdown")) {
    window.customElements.define("kuc-mobile-dropdown", MobileDropdown);
}
