var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { visiblePropConverter, dateValueConverter } from "../../base/converter";
import { dispatchCustomEvent, generateGUID, KucBase, createStyleOnHeader, } from "../../base/kuc-base";
import { validateProps, validateDateValue, isValidDate, throwErrorAfterUpdateComplete, } from "../../base/validator";
import "../../base/datetime/mobile-date";
import "../../base/mobile-label";
import "../../base/mobile-error";
import { MOBILE_DATE_PICKER_CSS } from "./style";
import { FORMAT_IS_NOT_VALID } from "../../base/datetime/resource/constant";
let exportMobileDatePicker;
(() => {
    exportMobileDatePicker = window.customElements.get("kuc-mobile-date-picker-1-3-2");
    if (exportMobileDatePicker) {
        return;
    }
    class KucMobileDatePicker extends KucBase {
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
            this._dateConverted = "";
            this._inputValue = "";
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(_changedProperties) {
            if (this.value === undefined || this.value === "")
                return true;
            if (!validateDateValue(this.value)) {
                throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
                return false;
            }
            this._dateConverted = dateValueConverter(this.value);
            if (this._dateConverted !== "" && !isValidDate(this._dateConverted)) {
                throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
                return false;
            }
            return true;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value !== undefined && this.value !== "") {
                    this.value = this._dateConverted;
                }
            }
        }
        update(changedProperties) {
            if (changedProperties.has("value")) {
                this._updateInputValue();
            }
            super.update(changedProperties);
        }
        render() {
            return html `
        <div class="kuc-mobile-date-picker-1-3-2__group">
          <label
            class="kuc-mobile-date-picker-1-3-2__group__label"
            for="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-3-2
              .requiredIcon="${this.requiredIcon}"
              .text="${this.label}"
            ></kuc-base-mobile-label-1-3-2>
          </label>
          <kuc-mobile-base-date-1-3-2
            class="kuc-mobile-date-picker-1-3-2__group__base__date"
            .disabled="${this.disabled}"
            .value="${this._inputValue}"
            .inputId="${this._GUID}"
            .inputAriaInvalid="${this.error !== ""}"
            .required="${this.requiredIcon}"
            .language="${this._getLanguage()}"
            @kuc:mobile-base-date-change="${this._handleDateChange}"
          >
          </kuc-mobile-base-date-1-3-2>
          <kuc-base-mobile-error-1-3-2 .guid="${this._GUID}" .text="${this.error}">
          </kuc-base-mobile-error-1-3-2>
        </div>
      `;
        }
        _updateInputValue() {
            if (this.value === undefined || this.value === "") {
                this._inputValue = "";
                return;
            }
            this._inputValue = this.value;
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
            const theSameValue = event.detail.value === this.value ||
                (event.detail.value === undefined && this.value === "");
            if (!theSameValue) {
                this.error = "";
            }
            this.value = event.detail.value;
            eventDetail.value = this.value;
            this._disptchChangeEvent(eventDetail);
        }
        _disptchChangeEvent(eventDetail) {
            dispatchCustomEvent(this, "change", eventDetail);
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileDatePicker.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDatePicker.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileDatePicker.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDatePicker.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDatePicker.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDatePicker.prototype, "requiredIcon", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDatePicker.prototype, "language", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDatePicker.prototype, "value", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileDatePicker.prototype, "visible", void 0);
    __decorate([
        state()
    ], KucMobileDatePicker.prototype, "_inputValue", void 0);
    window.customElements.define("kuc-mobile-date-picker-1-3-2", KucMobileDatePicker);
    createStyleOnHeader(MOBILE_DATE_PICKER_CSS);
    exportMobileDatePicker = KucMobileDatePicker;
})();
const MobileDatePicker = exportMobileDatePicker;
export { MobileDatePicker };
