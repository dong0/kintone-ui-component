import { __decorate } from "tslib";
import { html } from "lit";
import { state, property, query } from "lit/decorators.js";
import { BaseDateTimeCalendar } from "../calendar";
import { dispatchCustomEvent, KucBase } from "../../kuc-base";
import { formatInputValueToValue, formatValueToInputValue, getLocale, getTodayStringByLocale, isValidDateFormat } from "../utils";
import { isValidDate } from "../../validator";
export { BaseDateTimeCalendar };
export class BaseDate extends KucBase {
    constructor() {
        super(...arguments);
        this.inputAriaLabel = "";
        this.inputId = "";
        this.language = "en";
        this.value = "";
        this.disabled = false;
        this.inputAriaInvalid = false;
        this.required = false;
        this._dateTimeCalendarVisible = false;
        this._locale = getLocale("en");
        this._calendarValue = "";
        this._inputValue = "";
        this._valueForReset = "";
    }
    update(changedProperties) {
        if (changedProperties.has("inputId")) {
            this._GUID = this.inputId;
        }
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
            this._updateValueProp();
        }
        if (changedProperties.has("value")) {
            this._updateValueProp();
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <input
        class="kuc-base-date__input"
        id="${this._GUID}-label"
        type="text"
        text-align="center"
        .value="${this._inputValue}"
        aria-describedby="${this._GUID}-error"
        aria-invalid="${this.inputAriaInvalid}"
        aria-required="${this.required}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        @click="${this._handleClickInput}"
        @change="${this._handleChangeInput}"
        @keydown="${this._handleKeyDownInput}"
        @input="${this._handleInputValue}"
      />
      <button
        aria-haspopup="dialog"
        aria-expanded="${this._dateTimeCalendarVisible}"
        class="kuc-base-date__assistive-text"
        @keydown="${this._handleKeyDownButton}"
        @focus="${this._handleFocusButton}"
        @blur="${this._handleBlurButton}"
        ?disabled="${this.disabled}"
      >
        show date picker
      </button>
      ${this._dateTimeCalendarVisible
            ? html `
            <kuc-base-datetime-calendar
              class="kuc-base-date__calendar"
              .language="${this.language}"
              .value="${this._calendarValue}"
              ?hidden="${!this._dateTimeCalendarVisible}"
              @kuc:calendar-header-previous-shifttab="${this
                ._handleShiftTabCalendarPrevMonth}"
              @kuc:calendar-body-change-date="${this
                ._handleClickCalendarChangeDate}"
              @kuc:calendar-body-click-date="${this
                ._handleClickCalendarClickDate}"
              @kuc:calendar-footer-click-none="${this
                ._handleClickCalendarFooterButtonNone}"
              @kuc:calendar-footer-tab-none="${this
                ._handleTabCalendarFooterButtonNone}"
              @kuc:calendar-footer-click-today="${this
                ._handleClickCalendarFooterButtonToday}"
              @kuc:calendar-escape="${this._handleCalendarEscape}"
              @kuc:calendar-body-blur="${this._handleCalendarBlurBody}"
            >
            </kuc-base-datetime-calendar>
          `
            : ""}
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("inputAriaLabel") && this.inputAriaLabel) {
            this._dateInput.setAttribute("aria-label", this.inputAriaLabel);
        }
        super.updated(changedProperties);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        input.kuc-base-date__input {
          width: 100px;
          height: 40px;
          padding: 0px;
          text-align: center;
          border: 1px solid #e3e7e8;
          color: #333333;
          box-sizing: border-box;
          font-size: 14px;
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
        }

        input.kuc-base-date__input:focus {
          outline: none;
          border: 1px solid #3498db;
        }
        input.kuc-base-date__input--focus {
          box-shadow: 2px 2px 4px #f5f5f5 inset, -2px -2px 4px #f5f5f5 inset;
          border: 1px solid #3498db;
          background-color: #ffffff;
          color: #333333;
        }
        .kuc-datetime-picker__group__inputs--date
          input.kuc-base-date__input--focus {
          border-color: #3498db;
        }
        input.kuc-base-date__input:disabled {
          color: #888888;
          background-color: #d4d7d7;
          box-shadow: none;
          cursor: not-allowed;
        }
        .kuc-base-date__calendar {
          position: absolute;
          z-index: 2000;
          background-color: #ffffff;
          text-align: center;
          box-sizing: border-box;
        }
        .kuc-base-date__assistive-text {
          clip: rect(1px, 1px, 1px, 1px);
          overflow: hidden;
          position: absolute !important;
          padding: 0px !important;
          border: 0px !important;
          height: 1px !important;
          width: 1px !important;
        }
      </style>
    `;
    }
    _handleInputValue(event) {
        const newValue = event.target.value;
        this._inputValue = newValue || "";
    }
    _handleClickInput() {
        if (!this._dateTimeCalendarVisible) {
            this._valueForReset = this.value;
            this._calendarValue = this._getNewCalendarValue(this._inputValue || "");
            this._openCalendar();
            return;
        }
        this._closeCalendar();
    }
    _updateValueProp() {
        if (this.value) {
            const tempValue = this._setCalendarValueWhenInvalidValue();
            this._inputValue = formatValueToInputValue(this.language, this.value);
            this._calendarValue = tempValue || this.value;
            return;
        }
        const today = getTodayStringByLocale();
        this._inputValue = "";
        this._calendarValue = this._calendarValue
            ? this._calendarValue.slice(0, 7) + "-01"
            : today.slice(0, 7);
    }
    _setCalendarValueWhenInvalidValue() {
        if (this.value && !isValidDate(this.value)) {
            const today = getTodayStringByLocale();
            return this._calendarValue || today.slice(0, 7);
        }
        return "";
    }
    _getNewCalendarValue(value) {
        if (isValidDateFormat(this.language, value))
            return formatInputValueToValue(this.language, value);
        if (!this._calendarValue)
            return "";
        let temp = this._calendarValue.slice(0, 7);
        if (value === "")
            temp = this._calendarValue.slice(0, 7) + "-01";
        return temp;
    }
    _handleChangeInput(event) {
        event.stopPropagation();
        const newValue = event?.target.value;
        this._calendarValue = this._getNewCalendarValue(newValue);
        if (this._calendarValue.length > 7) {
            this._dispathDateChangeCustomEvent(formatInputValueToValue(this.language, newValue));
            return;
        }
        const detail = {
            value: undefined,
            oldValue: this.value,
            error: this._locale.INVALID_FORMAT
        };
        this._inputValue = newValue;
        dispatchCustomEvent(this, "kuc:base-date-change", detail);
    }
    _handleKeyDownInput(event) {
        if (event.key !== "Escape")
            return;
        this._closeCalendar();
    }
    _closeCalendar() {
        this._dateTimeCalendarVisible = false;
    }
    _openCalendar() {
        this._dateTimeCalendarVisible = true;
    }
    _handleShiftTabCalendarPrevMonth() {
        this._footerNoneBtn.focus();
    }
    _handleClickCalendarChangeDate(event) {
        event.detail.oldValue = this.value;
        this.value = event.detail.value;
        dispatchCustomEvent(this, "kuc:base-date-change", event.detail);
    }
    _handleClickCalendarClickDate(event) {
        this._closeCalendar();
        event.detail.oldValue = this.value;
        this._dateInput.focus();
        if (event.detail.oldValue === event.detail.value)
            return;
        this.value = event.detail.value;
        dispatchCustomEvent(this, "kuc:base-date-change", event.detail);
    }
    _handleClickCalendarFooterButtonNone() {
        this._closeCalendar();
        this._dateInput.focus();
        this._inputValue = "";
        const today = getTodayStringByLocale();
        let temp = this._setCalendarValueWhenInvalidValue();
        if (!temp) {
            temp = this._calendarValue
                ? this._calendarValue.slice(0, 7) + "-01"
                : today.slice(0, 7) + "-01";
        }
        this._calendarValue = temp;
        this._dispathDateChangeCustomEvent(undefined);
    }
    _handleTabCalendarFooterButtonNone() {
        this._previousMonth.focus();
    }
    _handleClickCalendarFooterButtonToday() {
        this._closeCalendar();
        const today = getTodayStringByLocale();
        this._dateInput.focus();
        this._dispathDateChangeCustomEvent(today);
    }
    _handleCalendarEscape() {
        const newValue = this._valueForReset;
        this._closeCalendar();
        this._dateInput.focus();
        if (newValue === this.value)
            return;
        const detail = {
            oldValue: this.value,
            value: newValue
        };
        this.value = newValue;
        dispatchCustomEvent(this, "kuc:base-date-change", detail);
    }
    _handleCalendarBlurBody(event) {
        event.preventDefault();
        this._dateTimeCalendarVisible = false;
    }
    _dispathDateChangeCustomEvent(newValue) {
        const detail = { value: newValue, oldValue: this.value };
        this.value = newValue === undefined ? "" : newValue;
        dispatchCustomEvent(this, "kuc:base-date-change", detail);
    }
    _openCalendarByKeyCode() {
        this._valueForReset = this.value;
        this._openCalendar();
        this._toggleEl.blur();
    }
    _handleBlurButton() {
        this._dateInput.classList.remove("kuc-base-date__input--focus");
    }
    _handleFocusButton() {
        this._dateInput.classList.add("kuc-base-date__input--focus");
    }
    _handleTabKey(event) {
        if (event.key === "Tab")
            return true;
        return false;
    }
    _handleKeyDownButton(event) {
        if (this._handleTabKey(event))
            return;
        this._handleSupportedKey(event);
    }
    _handleSupportedKey(event) {
        event.preventDefault();
        const keyCode = event.key;
        switch (keyCode) {
            case "ArrowUp":
            case "ArrowDown":
            case "Enter":
            case " ":
                this._openCalendarByKeyCode();
                break;
            default:
                break;
        }
    }
}
__decorate([
    property({ type: String })
], BaseDate.prototype, "inputAriaLabel", void 0);
__decorate([
    property({ type: String })
], BaseDate.prototype, "inputId", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseDate.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseDate.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], BaseDate.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseDate.prototype, "inputAriaInvalid", void 0);
__decorate([
    property({ type: Boolean })
], BaseDate.prototype, "required", void 0);
__decorate([
    query(".kuc-base-date__input")
], BaseDate.prototype, "_dateInput", void 0);
__decorate([
    query(".kuc-base-date__assistive-text")
], BaseDate.prototype, "_toggleEl", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header__group__button--previous-month")
], BaseDate.prototype, "_previousMonth", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-footer__group__button--none")
], BaseDate.prototype, "_footerNoneBtn", void 0);
__decorate([
    state()
], BaseDate.prototype, "_dateTimeCalendarVisible", void 0);
if (!window.customElements.get("kuc-base-date")) {
    window.customElements.define("kuc-base-date", BaseDate);
}
