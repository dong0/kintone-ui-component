import { __decorate } from "tslib";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps, validateValueString, validateItems, validateSelectedIndexNumber, throwErrorAfterUpdateComplete, } from "../../base/validator";
import { ERROR_MESSAGE } from "../../base/constant";
import { MOBILE_DROPDOWN_CSS } from "./style";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
let exportMobileDropdown;
(() => {
    exportMobileDropdown = window.customElements.get("kuc-mobile-dropdown");
    if (exportMobileDropdown) {
        return;
    }
    class KucMobileDropdown extends KucBase {
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
                        selectedIndex: this.selectedIndex,
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
            const firstIndex = this.items.findIndex((item) => item.value === this.value);
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
        <label
          class="kuc-mobile-dropdown__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-mobile-label>
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
        <kuc-base-mobile-error
          .text="${this.error}"
          .guid="${this._GUID}"
          ariaLive="assertive"
        >
        </kuc-base-mobile-error>
      `;
        }
        updated(changedProperties) {
            if (changedProperties.has("selectedIndex")) {
                this._selectEl.selectedIndex = this.selectedIndex;
            }
            super.update(changedProperties);
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileDropdown.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDropdown.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileDropdown.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDropdown.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDropdown.prototype, "value", void 0);
    __decorate([
        property({ type: Number })
    ], KucMobileDropdown.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDropdown.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDropdown.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileDropdown.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucMobileDropdown.prototype, "items", void 0);
    __decorate([
        query(".kuc-mobile-dropdown__input-form__select__input")
    ], KucMobileDropdown.prototype, "_selectEl", void 0);
    window.customElements.define("kuc-mobile-dropdown", KucMobileDropdown);
    createStyleOnHeader(MOBILE_DROPDOWN_CSS);
    exportMobileDropdown = KucMobileDropdown;
})();
const MobileDropdown = exportMobileDropdown;
export { MobileDropdown };
