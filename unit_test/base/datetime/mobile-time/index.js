import { __decorate } from "tslib";
import { html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../kuc-base";
import { validateProps, validateTimeValue } from "../../validator";
import { generateMinuteOptions, generateHourOptions, formatInputValueToTimeValue, formatTimeValueToInputValueForMobile, getLocale } from "../../datetime/utils";
// eslint-disable-next-line kuc-v1/no-using-generate-guid-function
export class BaseMobileTime extends KucBase {
    constructor(props) {
        super();
        this.guid = "";
        this.language = "en";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.required = false;
        /**
         * Please consider name again and change @state to @property when publishing the function.
         */
        this._timeStep = 1;
        this._hours = "";
        this._minutes = "";
        this._suffix = "";
        this._locale = getLocale("en");
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        if (changedProperties.has("hour12")) {
            this._hourOptions = generateHourOptions(this.hour12);
        }
        if (changedProperties.has("_timeStep")) {
            this._minuteOptions = generateMinuteOptions(this._timeStep);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <fieldset
        class="kuc-base-mobile-time__group${this.disabled
            ? " kuc-base-mobile-time__group--disabled"
            : ""}${this.required ? " kuc-base-mobile-time__group--required" : ""}"
        aria-label="label-text"
      >
        <select
          class="kuc-base-mobile-time__group__hours"
          aria-label="Hour"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeHours}"
        >
          <option value selected></option>
          ${this._getOptionsHourTemplate()}
        </select>
        <span class="kuc-base-mobile-time__group__colon">:</span>
        <select
          class="kuc-base-mobile-time__group__minutes"
          aria-label="Minute"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeMinutes}"
        >
          <option value selected></option>
          ${this._getOptionsMinuteTemplate()}
        </select>
      </fieldset>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("value")) {
            this._updateInputValue();
        }
        super.update(changedProperties);
    }
    _updateInputValue() {
        const times = formatTimeValueToInputValueForMobile(this.value, this.hour12);
        this._hours = times.hours;
        this._minutes = times.minutes;
        this._suffix = times.suffix || "";
        this._setValueToInput(times);
    }
    _setValueToInput(times) {
        this._minutesEl.value = times.minutes;
        if (times.suffix) {
            this._hoursEl.value = times.suffix + " " + times.hours;
            return;
        }
        this._hoursEl.value = times.hours;
    }
    _handleChangeMinutes(event) {
        event.preventDefault();
        event.stopPropagation();
        const oldTime = this._getTimeValueString();
        const target = event.target;
        const minutes = target.value;
        this._minutes = minutes;
        const newTime = this._getTimeValueString();
        this.value = newTime;
        this._dispatchEventTimeChange(newTime, oldTime);
    }
    _handleChangeHours(event) {
        event.preventDefault();
        event.stopPropagation();
        const oldTime = this._getTimeValueString();
        const target = event.target;
        const values = target.value.split(" ");
        if (values.length === 2) {
            this._hours = values[1];
            this._suffix = values[0];
        }
        else {
            this._hours = values[0];
            this._suffix = "";
        }
        const newTime = this._getTimeValueString();
        this.value = newTime;
        this._dispatchEventTimeChange(newTime, oldTime);
    }
    _getTimeValueString() {
        const time = `${this._hours}:${this._minutes}`;
        if (this._suffix)
            return formatInputValueToTimeValue(`${time} ${this._suffix}`);
        return formatInputValueToTimeValue(time);
    }
    _dispatchEventTimeChange(value, oldValue) {
        const tempValue = value === ":" ? "" : value;
        const tempOldValue = oldValue === ":" ? "" : oldValue;
        const detail = {
            value: tempValue,
            oldValue: tempOldValue
        };
        detail.error = validateTimeValue(tempValue)
            ? ""
            : this._locale.INVALID_TIME_FORMAT;
        dispatchCustomEvent(this, "kuc:base-mobile-time-change", detail);
    }
    _getOptionsMinuteTemplate() {
        return this._minuteOptions.map(min => html `
          <option value="${min.value}">${min.label}</option>
        `);
    }
    _getOptionsHourTemplate() {
        return this._hourOptions.map(hour => html `
          <option value="${hour.value}">${hour.label}</option>
        `);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-mobile-time,
        kuc-base-mobile-time * {
          font-size: 13px;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-base-mobile-time,
        :lang(zh) kuc-base-mobile-time * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-base-mobile-time {
          width: 100%;
          display: inline-block;
          vertical-align: top;
        }
        kuc-base-mobile-time[hidden] {
          display: none;
        }
        .kuc-base-mobile-time__group {
          padding: 0;
          margin: 0;
          border: 1px solid #b3b3b3;
          border-radius: 5.2px;
          box-sizing: border-box;
          background-color: #ffffff;
          display: -webkit-flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          box-shadow: 0px 1px 0px #ffffff, inset 0px 2px 3px #dadada;
        }
        .kuc-base-mobile-time__group--required {
          border-color: #cf4a38;
        }
        .kuc-base-mobile-time__group__hours {
          padding: 5.148px 7.722px;
        }
        .kuc-base-mobile-time__group__minutes {
          padding: 5.148px 7.722px;
          -webkit-flex-grow: 1;
          flex-grow: 1;
        }
        .kuc-base-mobile-time__group__hours,
        .kuc-base-mobile-time__group__minutes {
          font-size: 99%;
          color: #000000;
          border: none;
          border-radius: 5.148px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: transparent;
        }
        .kuc-base-mobile-time__group__colon {
          color: #000000;
        }
        .kuc-base-mobile-time__group__hours:disabled
          + .kuc-base-mobile-time__group__colon {
          color: #999999;
          -webkit-text-fill-color: #999999;
          opacity: 1;
        }
        .kuc-base-mobile-time__group--disabled {
          color: #999999;
          -webkit-text-fill-color: #999999;
          background-color: #d5d7d9;
          opacity: 1;
        }
        .kuc-base-mobile-time__group__hours:disabled,
        .kuc-base-mobile-time__group__minutes:disabled {
          color: #999999;
          -webkit-text-fill-color: #999999;
          opacity: 1;
        }
        .kuc-base-mobile-time__group__hours:focus {
          outline: none;
        }
        .kuc-base-mobile-time__group__minutes:focus {
          outline: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String })
], BaseMobileTime.prototype, "guid", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseMobileTime.prototype, "language", void 0);
__decorate([
    property({ type: String })
], BaseMobileTime.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "hour12", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "required", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_timeStep", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_hours", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_minutes", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_suffix", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_hourOptions", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_minuteOptions", void 0);
__decorate([
    query(".kuc-base-mobile-time__group__hours")
], BaseMobileTime.prototype, "_hoursEl", void 0);
__decorate([
    query(".kuc-base-mobile-time__group__minutes")
], BaseMobileTime.prototype, "_minutesEl", void 0);
if (!window.customElements.get("kuc-base-mobile-time")) {
    window.customElements.define("kuc-base-mobile-time", BaseMobileTime);
}