import { __decorate } from "tslib";
/* eslint-disable kuc-v1/validator-in-should-update */
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { generateGUID, KucBase, dispatchCustomEvent } from "../base/kuc-base";
import { visiblePropConverter, dateValueConverter, timeValueConverter } from "../base/converter";
import { getWidthElmByContext } from "../base/context";
import { validateProps, validateDateTimeValue, isValidDate, throwErrorAfterUpdateComplete } from "../base/validator";
import { FORMAT_IS_NOT_VALID } from "../base/datetime/resource/constant";
import "../base/datetime/date";
import "../base/datetime/time";
export class DateTimePicker extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.language = "auto";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.requiredIcon = false;
        this.visible = true;
        this._dateValue = "";
        this._timeValue = "";
        this._previousTimeValue = "";
        this._previousDateValue = "";
        this._errorFormat = "";
        this._errorText = "";
        this._dateConverted = "";
        this._changeDateByUI = false;
        this._changeTimeByUI = false;
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    shouldUpdate(_changedProperties) {
        if (this.value === undefined || this.value === "")
            return true;
        if (typeof this.value !== "string") {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        this._dateAndTime = this._getDateTimeValue(this.value);
        this._dateConverted = dateValueConverter(this._dateAndTime.date);
        const isValidValue = validateDateTimeValue(this._dateAndTime.date, this._dateAndTime.time) &&
            isValidDate(this._dateConverted);
        if (!isValidValue) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        return true;
    }
    willUpdate(_changedProperties) {
        const changeByUI = this._changeDateByUI || this._changeTimeByUI;
        if (changeByUI) {
            this._updateValueChangeByUI();
            return;
        }
        this._updateValueWhenSetter();
    }
    _updateValueChangeByUI() {
        const validFormat = this._validateDateTimeFormat();
        this.value = validFormat ? this.value : undefined;
        if (this._changeTimeByUI)
            return;
        this._errorText = validFormat ? this.error : this._errorFormat;
    }
    _validateDateTimeFormat() {
        const isMissingDatePart = Boolean(this._timeValue) && !this._dateValue;
        const isMissingTimePart = Boolean(this._dateValue) && !this._timeValue;
        const validFormat = !this._errorFormat && !isMissingDatePart && !isMissingTimePart;
        return validFormat;
    }
    _updateValueWhenSetter() {
        this._errorText = this.error;
        if (this.value === "" || this.value === undefined) {
            this._previousTimeValue = "";
            this._errorFormat = "";
            return;
        }
        this._setDateTimeValueSeparate(this._dateAndTime, this._dateConverted);
        this.value = this._getDateTimeString();
    }
    _setDateTimeValueSeparate(dateTime, dateValue) {
        this._dateValue = dateValue || this._dateInput.value;
        this._timeValue =
            this._dateValue && isValidDate(dateValue)
                ? timeValueConverter(dateTime.time.slice(0, 5))
                : this._previousTimeValue;
    }
    update(changedProperties) {
        if (changedProperties.has("value")) {
            if (this.value === undefined) {
                this._setUndefinedValue();
            }
            if (this.value === "") {
                this._setEmptyValue();
            }
        }
        super.update(changedProperties);
    }
    _setUndefinedValue() {
        if (this._changeTimeByUI)
            return;
        if (this._errorFormat) {
            if (this._changeDateByUI) {
                this._dateValue = this._dateInput.value;
                return;
            }
            this._dateValue = "";
            this._timeValue = "";
            return;
        }
        this._dateValue = this._previousDateValue;
        this._timeValue = this._previousTimeValue;
    }
    _setEmptyValue() {
        this._dateValue = "";
        this._timeValue = "";
        this._previousTimeValue = "";
        this._previousDateValue = "";
        this._errorFormat = "";
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <fieldset
        class="kuc-datetime-picker__group"
        aria-describedby="${this._GUID}-error"
      >
        <legend
          class="kuc-datetime-picker__group__label"
          ?hidden="${!this.label}"
        >
          <span class="kuc-datetime-picker__group__label__text"
            >${this.label}</span
          ><!--
          --><span
            class="kuc-datetime-picker__group__label__required-icon"
            ?hidden="${!this.requiredIcon}"
            >*</span
          >
        </legend>
        <div class="kuc-datetime-picker__group__inputs">
          <kuc-base-date
            class="kuc-datetime-picker__group__inputs--date"
            .value="${this._dateValue}"
            .language="${this._getLanguage()}"
            .disabled="${this.disabled}"
            inputAriaLabel="date"
            @kuc:base-date-change="${this._handleDateChange}"
          ></kuc-base-date
          ><kuc-base-time
            class="kuc-datetime-picker__group__inputs--time"
            .value="${this._timeValue}"
            .hour12="${this.hour12}"
            .disabled="${this.disabled}"
            @kuc:base-time-change="${this._handleTimeChange}"
          ></kuc-base-time>
        </div>
        <div
          class="kuc-datetime-picker__group__error"
          id="${this._GUID}-error"
          role="alert"
          ?hidden="${!this._errorText}"
        >
          ${this._errorText}
        </div>
      </fieldset>
    `;
    }
    updated() {
        this._updateErrorWidth();
        this._resetState();
    }
    _resetState() {
        this._previousTimeValue = "";
        this._previousDateValue = "";
        this._changeDateByUI = false;
        this._changeTimeByUI = false;
    }
    _updateErrorWidth() {
        const labelWidth = getWidthElmByContext(this._labelEl);
        const inputGroupWitdh = 185;
        if (labelWidth > inputGroupWitdh) {
            this._errorEl.style.width = labelWidth + "px";
            return;
        }
        this._errorEl.style.width = inputGroupWitdh + "px";
    }
    _handleDateChange(event) {
        event.stopPropagation();
        event.preventDefault();
        this._changeDateByUI = true;
        let newValue = this._dateValue;
        if (event.detail.error) {
            this._errorFormat = event.detail.error;
            this.error = "";
        }
        else {
            newValue = event.detail.value;
            this._errorFormat = "";
        }
        this._updateDateTimeValue(newValue, "date");
    }
    _handleTimeChange(event) {
        event.preventDefault();
        event.stopPropagation();
        this._changeTimeByUI = true;
        const newValue = event.detail.value;
        this._updateDateTimeValue(newValue, "time");
    }
    _updateDateTimeValue(newValue, type) {
        const oldDateTime = this.value;
        if (type === "date") {
            this._dateValue = newValue || "";
        }
        else {
            this._timeValue = newValue;
        }
        this._previousTimeValue = this._timeValue;
        this._previousDateValue = this._dateValue;
        const newDateTime = this._errorFormat
            ? undefined
            : this._getDateTimeString();
        const _value = this._errorFormat ? undefined : newDateTime;
        this.value = _value;
        const detail = {
            value: _value,
            oldValue: oldDateTime,
            changedPart: type
        };
        dispatchCustomEvent(this, "change", detail);
    }
    _getDateTimeString() {
        if (!this._dateValue || !this._timeValue)
            return undefined;
        if (!this.value)
            return `${this._dateValue}T${this._timeValue}:00`;
        const splitValue = this.value.split(":");
        if (splitValue.length === 3) {
            return `${this._dateValue}T${this._timeValue}:${splitValue[2]}`;
        }
        return `${this._dateValue}T${this._timeValue}:00`;
    }
    _getDateTimeValue(value) {
        if (value === "" || value === undefined)
            return { date: "", time: "" };
        const dateTime = value.split("T");
        const date = dateTime[0];
        const time = dateTime[1];
        if (value.indexOf("T") === value.length - 1 || dateTime.length > 2)
            return { date, time: "" };
        if (!time)
            return { date, time: "00:00" };
        const [hours, minutes, seconds] = time.split(":");
        if (hours === "" || minutes === "" || seconds === "") {
            return { date, time: time };
        }
        const tempTime = `${hours}:${minutes || "00"}`;
        if (!seconds)
            return { date, time: tempTime };
        return { date, time: `${tempTime}:${seconds}` };
    }
    _getLanguage() {
        const langs = ["en", "ja", "zh"];
        if (langs.indexOf(this.language) !== -1)
            return this.language;
        if (langs.indexOf(document.documentElement.lang) !== -1)
            return document.documentElement.lang;
        return "en";
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-datetime-picker,
        kuc-datetime-picker *,
        :lang(en) kuc-datetime-picker,
        :lang(en) kuc-datetime-picker * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-datetime-picker,
        :lang(ja) kuc-datetime-picker * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-datetime-picker,
        :lang(zh) kuc-datetime-picker * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        kuc-datetime-picker {
          font-size: 14px;
          display: inline-table;
          vertical-align: top;
          line-height: 1.5;
        }
        kuc-datetime-picker[hidden] {
          display: none;
        }
        .kuc-datetime-picker__group {
          border: none;
          padding: 0px;
          height: auto;
          display: inline-block;
          margin: 0px;
        }
        .kuc-datetime-picker__group__label {
          display: inline-block;
          padding: 4px 0px 8px 0px;
          white-space: nowrap;
        }
        .kuc-datetime-picker__group__label[hidden] {
          display: none;
        }
        .kuc-datetime-picker__group__label__text {
          color: #333333;
          font-size: 14px;
        }
        .kuc-datetime-picker__group__label__required-icon {
          margin-left: 4px;
          line-height: 1;
          vertical-align: -3px;
          color: #e74c3c;
          font-size: 20px;
        }
        .kuc-datetime-picker__group__label__required-icon[hidden] {
          display: none;
        }
        .kuc-datetime-picker__group__inputs {
          display: flex;
          max-width: 185px;
        }
        .kuc-datetime-picker__group__error {
          line-height: 1.5;
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin: 8px 0px;
          word-break: break-all;
          white-space: normal;
        }
        .kuc-datetime-picker__group__error[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], DateTimePicker.prototype, "className", void 0);
__decorate([
    property({ type: String })
], DateTimePicker.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], DateTimePicker.prototype, "id", void 0);
__decorate([
    property({ type: String })
], DateTimePicker.prototype, "label", void 0);
__decorate([
    property({ type: String })
], DateTimePicker.prototype, "language", void 0);
__decorate([
    property({
        type: String,
        hasChanged(newVal, oldVal) {
            if ((newVal === "" || newVal === undefined) && newVal === oldVal) {
                return true;
            }
            return newVal !== oldVal;
        }
    })
], DateTimePicker.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], DateTimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], DateTimePicker.prototype, "hour12", void 0);
__decorate([
    property({ type: Boolean })
], DateTimePicker.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], DateTimePicker.prototype, "visible", void 0);
__decorate([
    query(".kuc-base-date__input")
], DateTimePicker.prototype, "_dateInput", void 0);
__decorate([
    query(".kuc-datetime-picker__group__error")
], DateTimePicker.prototype, "_errorEl", void 0);
__decorate([
    query(".kuc-datetime-picker__group__label")
], DateTimePicker.prototype, "_labelEl", void 0);
if (!window.customElements.get("kuc-datetime-picker")) {
    window.customElements.define("kuc-datetime-picker", DateTimePicker);
}
