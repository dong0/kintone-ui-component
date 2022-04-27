import { __decorate } from "tslib";
import { html } from "lit";
import { state, property } from "lit/decorators.js";
import { KucBase } from "../../kuc-base";
import { getTodayStringByLocale } from "../../datetime/utils";
import "./header";
import "./body";
import "./footer";
export class BaseMobileDateTimeCalendar extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this.value = "";
        this._month = 1;
        this._year = 2021;
    }
    update(changedProperties) {
        if (changedProperties.has("value"))
            this._updateValue();
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div
        class="kuc-base-mobile-datetime-calendar__group"
        role="dialog"
        aria-modal="true"
        aria-label="Calender"
        @click="${this._handleClickCalendarGroup}"
      >
        <kuc-base-mobile-datetime-calendar-header
          .year="${this._year}"
          .month="${this._month}"
          .language="${this.language}"
          @kuc:mobile-calendar-header-change="${this
            ._handleCalendarHeaderChange}"
        ></kuc-base-mobile-datetime-calendar-header>
        <kuc-base-mobile-datetime-calendar-body
          .year="${this._year}"
          .month="${this._month}"
          .value="${this.value}"
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-body>
        <kuc-base-mobile-datetime-calendar-footer
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-footer>
      </div>
    `;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        .kuc-base-mobile-datetime-calendar__group {
          display: inline-block;
          box-sizing: border-box;
          width: 290px;
          padding: 0 10px;
          background: #ffffff;
          text-align: center;
          font-size: 13px;
          border: 1px solid #d8d8d8;
        }
      </style>
    `;
    }
    _handleClickCalendarGroup(event) {
        event.stopPropagation();
    }
    _handleCalendarHeaderChange(event) {
        const { year, month } = this._separateValue(event.detail.value);
        this._year = year;
        this._month = month;
    }
    _updateValue() {
        if (this.value === "") {
            this.value = getTodayStringByLocale().slice(0, 7) + "-01";
        }
        const { year, month } = this._separateValue(this.value);
        this._year = year;
        this._month = month;
    }
    _separateValue(value) {
        const dateParts = value.split("-");
        return {
            year: parseInt(dateParts[0], 10),
            month: parseInt(dateParts[1], 10)
        };
    }
}
__decorate([
    property({ type: String })
], BaseMobileDateTimeCalendar.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseMobileDateTimeCalendar.prototype, "value", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendar.prototype, "_month", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendar.prototype, "_year", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar")) {
    window.customElements.define("kuc-base-mobile-datetime-calendar", BaseMobileDateTimeCalendar);
}
