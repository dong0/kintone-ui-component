import { __decorate } from "tslib";
import { html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { visiblePropConverter, dateValueConverter } from "../base/converter";
import { dispatchCustomEvent, generateGUID, KucBase } from "../base/kuc-base";
import { validateProps, validateDateValue, isValidDate, throwErrorAfterUpdateComplete } from "../base/validator";
import "../base/datetime/date";
import { FORMAT_IS_NOT_VALID } from "../base/datetime/resource/constant";
export class DatePicker extends KucBase {
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
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        this._valueConverted = dateValueConverter(this.value);
        if (this._valueConverted && !isValidDate(this._valueConverted)) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
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
      ${this._getStyleTagTemplate()}
      <div class="kuc-date-picker__group">
        <label
          class="kuc-date-picker__group__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <span class="kuc-date-picker__group__label__text">${this.label}</span
          ><!--
--><span
            class="kuc-date-picker__group__label__required-icon"
            ?hidden="${!this.requiredIcon}"
            >*</span
          >
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
        <div
          class="kuc-date-picker__group__error"
          id="${this._GUID}-error"
          role="alert"
          ?hidden="${!this._errorText}"
        >
          ${this._errorText}
        </div>
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
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-date-picker,
        kuc-date-picker *,
        :lang(en) kuc-date-picker,
        :lang(en) kuc-date-picker * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-date-picker,
        :lang(ja) kuc-date-picker * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-date-picker,
        :lang(zh) kuc-date-picker * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        kuc-date-picker {
          font-size: 14px;
          color: #333333;
          display: inline-table;
          vertical-align: top;
          max-width: 100px;
          width: 100px;
          line-height: 1.5;
        }
        kuc-date-picker[hidden] {
          display: none;
        }
        .kuc-date-picker__group {
          display: flex;
          flex-direction: column;
          border: none;
          padding: 0px;
          height: auto;
          margin: 0px;
        }
        .kuc-date-picker__group__label {
          display: inline-block;
          padding: 4px 0px 8px 0px;
          white-space: nowrap;
        }
        .kuc-date-picker__group__label[hidden] {
          display: none;
        }
        .kuc-date-picker__group__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-date-picker__group__label__required-icon[hidden] {
          display: none;
        }
        .kuc-date-picker__group input.kuc-base-date__input {
          width: 100px;
          height: 40px;
          padding: 0px;
          text-align: center;
          border: 1px solid #e3e7e8;
          box-sizing: border-box;
          font-size: 14px;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
        }

        .kuc-date-picker__group input.kuc-base-date__input:focus {
          outline: none;
          border: 1px solid #3498db;
        }
        .kuc-date-picker__group input.kuc-base-date__input--focus {
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
          border: 1px solid #3498db;
          background-color: #ffffff;
          color: #333333;
        }
        .kuc-date-picker__group input.kuc-base-date__input:disabled {
          color: #888888;
          background-color: #d4d7d7;
          box-shadow: none;
          cursor: not-allowed;
        }
        .kuc-date-picker__group__error {
          line-height: 1.5;
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin: 8px 0px;
          word-break: break-all;
          white-space: normal;
        }
      </style>
    `;
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
            value: ""
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
], DatePicker.prototype, "className", void 0);
__decorate([
    property({ type: String })
], DatePicker.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], DatePicker.prototype, "id", void 0);
__decorate([
    property({ type: String })
], DatePicker.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], DatePicker.prototype, "requiredIcon", void 0);
__decorate([
    property({ type: String })
], DatePicker.prototype, "language", void 0);
__decorate([
    property({ type: String })
], DatePicker.prototype, "value", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], DatePicker.prototype, "visible", void 0);
__decorate([
    state()
], DatePicker.prototype, "_errorFormat", void 0);
__decorate([
    state()
], DatePicker.prototype, "_errorText", void 0);
__decorate([
    query(".kuc-base-date__input")
], DatePicker.prototype, "_dateInput", void 0);
if (!window.customElements.get("kuc-date-picker")) {
    window.customElements.define("kuc-date-picker", DatePicker);
}
