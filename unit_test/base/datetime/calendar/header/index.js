import { __decorate } from "tslib";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../../kuc-base";
import "../../calendar/header/dropdown/year";
import "../../calendar/header/dropdown/month";
import { getLeftArrowIconSvgTemplate, getRightArrowIconSvgTemplate, getLocale } from "../../utils/";
function isValidMonth(month) {
    return month > 0 && month < 13;
}
function isValidYear(year) {
    return year >= 0 && year < 10000;
}
export class BaseDateTimeCalendarHeader extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this.month = 1;
        this.year = 2021;
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div class="kuc-base-datetime-calendar-header__group">
        <button
          aria-label="previous month"
          type="button"
          class="kuc-base-datetime-calendar-header__group__button kuc-base-datetime-calendar-header__group__button--previous-month"
          @click="${this._handleClickCalendarPrevMonthBtn}"
          @keydown="${this._handleKeyDownCalendarPrevMonthBtn}"
        >
          ${getLeftArrowIconSvgTemplate()}
        </button>
        <div class="kuc-base-datetime-calendar-header__group__center">
          ${this._getYearMonthTemplate()}
        </div>
        <button
          aria-label="next month"
          type="button"
          class="kuc-base-datetime-calendar-header__group__button kuc-base-datetime-calendar-header__group__button--next-month"
          @click="${this._handleClickCalendarNextMonthBtn}"
        >
          ${getRightArrowIconSvgTemplate()}
        </button>
      </div>
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-datetime-calendar-header,
        kuc-base-datetime-calendar-header *,
        :lang(en) kuc-base-datetime-calendar-header,
        :lang(en) kuc-base-datetime-calendar-header * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-base-datetime-calendar-header,
        :lang(ja) kuc-base-datetime-calendar-header * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
          font-weight: 700;
        }
        :lang(zh) kuc-base-datetime-calendar-header,
        :lang(zh) kuc-base-datetime-calendar-header * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        .kuc-base-datetime-calendar-header__group {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          border-bottom: 1px solid #e3e7e8;
          padding: 0;
          white-space: nowrap;
          width: 266px;
          height: 44px;
        }
        .kuc-base-datetime-calendar-header__group__button {
          background: transparent;
          border: none;
          cursor: pointer;
          outline: none;
          width: 38px;
          height: 32px;
          margin: 0;
          text-align: center;
        }
        .kuc-base-datetime-calendar-header__group__button:focus {
          border: 1px solid #3498db;
          outline: none;
        }
        .kuc-base-datetime-calendar-header__group__button-icon {
          vertical-align: middle;
        }
        .kuc-base-datetime-calendar-header__group__center {
          width: 190px;
          text-align: center;
          display: flex;
          justify-content: center;
        }
        .kuc-base-datetime-calendar-header__month {
          margin: 0 4px 0 4px;
        }
      </style>
    `;
    }
    _getYearTemplate() {
        return html `
      <kuc-base-datetime-header-year
        class="kuc-base-datetime-calendar-header__year"
        .postfix="${this._locale.YEAR_SELECT_POSTFIX}"
        .year="${this.year}"
        @kuc:year-dropdown-change="${this._handleYearDropdownChange}"
        @kuc:year-dropdown-click="${this._handleYearDropdownClick}"
      >
      </kuc-base-datetime-header-year>
    `;
    }
    _getMonthTemplate() {
        return html `
      <kuc-base-datetime-header-month
        class="kuc-base-datetime-calendar-header__month"
        .month="${this.month}"
        .language="${this.language}"
        @kuc:month-dropdown-change="${this._handleMonthDropdownChange}"
        @kuc:month-dropdown-click="${this._handleMonthDropdownClick}"
      >
      </kuc-base-datetime-header-month>
    `;
    }
    _getYearMonthTemplate() {
        return this.language === "zh" || this.language === "ja"
            ? html `
          ${this._getYearTemplate()}${this._getMonthTemplate()}
        `
            : html `
          ${this._getMonthTemplate()}${this._getYearTemplate()}
        `;
    }
    _handleMonthDropdownChange(event) {
        event.stopPropagation();
        event.preventDefault();
        this.month = parseInt(event.detail.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleYearDropdownChange(event) {
        event.stopPropagation();
        event.preventDefault();
        this.year = parseInt(event.detail.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleYearDropdownClick() {
        if (!this._listBoxMonthEl)
            return;
        this._baseDateTimeHeaderMonthEl.closeListBox();
    }
    _handleMonthDropdownClick() {
        if (!this._listBoxYearEl)
            return;
        this._baseDateTimeHeaderYearEl.closeListBox();
    }
    _handleClickCalendarPrevMonthBtn(event) {
        event.stopPropagation();
        const monthSelected = this.month;
        if (monthSelected === 1) {
            this.month = 12;
            this.year--;
        }
        else {
            this.month -= 1;
        }
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleKeyDownCalendarPrevMonthBtn(event) {
        if (!event.shiftKey || event.key !== "Tab")
            return;
        event.preventDefault();
        dispatchCustomEvent(this, "kuc:calendar-header-previous-shifttab");
    }
    _handleClickCalendarNextMonthBtn(event) {
        event.stopPropagation();
        const monthSelected = this.month;
        if (monthSelected === 12) {
            this.month = 1;
            this.year++;
        }
        else {
            this.month += 1;
        }
        this._dispatchCalendarHeaderChangeEvent();
    }
    _dispatchCalendarHeaderChangeEvent() {
        const year = this.year;
        const month = this.month;
        const detail = { value: `${year}-${month}` };
        dispatchCustomEvent(this, "kuc:calendar-header-change", detail);
    }
}
__decorate([
    property({ type: String })
], BaseDateTimeCalendarHeader.prototype, "language", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidMonth(newVal);
        }
    })
], BaseDateTimeCalendarHeader.prototype, "month", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidYear(newVal);
        }
    })
], BaseDateTimeCalendarHeader.prototype, "year", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header__month")
], BaseDateTimeCalendarHeader.prototype, "_baseDateTimeHeaderMonthEl", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header__year")
], BaseDateTimeCalendarHeader.prototype, "_baseDateTimeHeaderYearEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-month__listbox")
], BaseDateTimeCalendarHeader.prototype, "_listBoxMonthEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-year__listbox")
], BaseDateTimeCalendarHeader.prototype, "_listBoxYearEl", void 0);
if (!window.customElements.get("kuc-base-datetime-calendar-header")) {
    window.customElements.define("kuc-base-datetime-calendar-header", BaseDateTimeCalendarHeader);
}
