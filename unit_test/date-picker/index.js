import { __decorate } from "tslib";
import { html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { visiblePropConverter, dateValueConverter } from "../base/converter";
import { createStyleOnHeader, dispatchCustomEvent, generateGUID, KucBase, } from "../base/kuc-base";
import { validateProps, validateDateValue, isValidDate, throwErrorAfterUpdateComplete, } from "../base/validator";
import "../base/datetime/date";
import { INVALID_FORMAT_MESSAGE } from "../base/datetime/resource/constant";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
import { DATE_PICKER_CSS } from "./style";
export { BaseError, BaseLabel };
let exportDatePicker;
(() => {
    exportDatePicker = window.customElements.get("kuc-date-picker");
    if (exportDatePicker) {
        return;
    }
    class KucDatePicker extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.disabled = false;
            this.requiredIcon = false;
            this.language = "auto";
            this.value = "";
            this.visible = true;
            this._errorFormat = "";
            this._errorText = "";
            this._inputValue = "";
            this._invalidValue = "";
            this._valueConverted = "";
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(_changedProperties) {
            if (this.value === undefined || this.value === "")
                return true;
            if (typeof this.value !== "string" || !validateDateValue(this.value)) {
                throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.VALUE);
                return false;
            }
            this._valueConverted = dateValueConverter(this.value);
            if (this._valueConverted && !isValidDate(this._valueConverted)) {
                throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.VALUE);
                return false;
            }
            return true;
        }
        update(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value === undefined) {
                    this._inputValue = this._invalidValue;
                }
                else {
                    this.value = this.value === "" ? this.value : this._valueConverted;
                    this._inputValue = this.value;
                    this._errorFormat = "";
                }
            }
            super.update(changedProperties);
        }
        render() {
            return html `
        <div class="kuc-date-picker__group">
          <label
            class="kuc-date-picker__group__label"
            for="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label>
          </label>
          <kuc-base-date
            .inputId="${this._GUID}"
            .inputAriaInvalid="${this.error !== ""}"
            .disabled="${this.disabled}"
            .value="${this._inputValue}"
            .required="${this.requiredIcon}"
            .language="${this._getLanguage()}"
            @kuc:base-date-change="${this._handleDateChange}"
          >
          </kuc-base-date>
          <kuc-base-error
            .text="${this._errorText}"
            .guid="${this._GUID}"
          ></kuc-base-error>
        </div>
      `;
        }
        updated() {
            this._updateErrorText();
            this._invalidValue = "";
        }
        _updateErrorText() {
            this._errorText = this._errorFormat || this.error;
        }
        _getLanguage() {
            const langs = ["en", "ja", "zh"];
            if (langs.indexOf(this.language) !== -1)
                return this.language;
            if (langs.indexOf(document.documentElement.lang) !== -1)
                return document.documentElement.lang;
            return "en";
        }
        _handleDateChange(event) {
            event.stopPropagation();
            event.preventDefault();
            const eventDetail = {
                oldValue: this.value,
                value: "",
            };
            if (event.detail.error) {
                this.value = undefined;
                this._invalidValue = this._dateInput.value;
                this._errorFormat = event.detail.error;
                this.error = "";
                eventDetail.value = undefined;
            }
            else {
                this._errorFormat = "";
                this.value = event.detail.value === undefined ? "" : event.detail.value;
                eventDetail.value = this.value;
            }
            this._disptchChangeEvent(eventDetail);
        }
        _disptchChangeEvent(eventDetail) {
            dispatchCustomEvent(this, "change", eventDetail);
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucDatePicker.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucDatePicker.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucDatePicker.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucDatePicker.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDatePicker.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDatePicker.prototype, "requiredIcon", void 0);
    __decorate([
        property({ type: String })
    ], KucDatePicker.prototype, "language", void 0);
    __decorate([
        property({ type: String })
    ], KucDatePicker.prototype, "value", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucDatePicker.prototype, "visible", void 0);
    __decorate([
        state()
    ], KucDatePicker.prototype, "_errorFormat", void 0);
    __decorate([
        state()
    ], KucDatePicker.prototype, "_errorText", void 0);
    __decorate([
        query(".kuc-base-date__input")
    ], KucDatePicker.prototype, "_dateInput", void 0);
    window.customElements.define("kuc-date-picker", KucDatePicker);
    createStyleOnHeader(DATE_PICKER_CSS);
    exportDatePicker = KucDatePicker;
})();
const DatePicker = exportDatePicker;
export { DatePicker };
