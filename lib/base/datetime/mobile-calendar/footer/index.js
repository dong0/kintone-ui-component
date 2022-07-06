var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../../kuc-base";
import { getLocale } from "../../../datetime/utils";
export class BaseMobileDateTimeCalendarFooter extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    _handleClickCalendarFooterButtonClose(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-close");
    }
    _handleClickCalendarFooterButtonNone(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-none");
    }
    _handleClickCalendarFooterButtonToday(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-today");
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div class="kuc-base-mobile-datetime-calendar-footer__group">
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer__group__button kuc-base-mobile-datetime-calendar-footer__group__button--today"
          @click="${this._handleClickCalendarFooterButtonToday}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.today}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer__group__button kuc-base-mobile-datetime-calendar-footer__group__button--none"
          @click="${this._handleClickCalendarFooterButtonNone}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.none}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer__group__button kuc-base-mobile-datetime-calendar-footer__group__button--close"
          @click="${this._handleClickCalendarFooterButtonClose}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.close}
        </button>
      </div>
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-mobile-datetime-calendar-footer,
        kuc-base-mobile-datetime-calendar-footer * {
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }

        :lang(zh) kuc-base-mobile-datetime-calendar-footer,
        :lang(zh) kuc-base-mobile-datetime-calendar-footer * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        .kuc-base-mobile-datetime-calendar-footer__group {
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0;
          white-space: nowrap;
        }
        .kuc-base-mobile-datetime-calendar-footer__group__button {
          background: transparent;
          border: 1px solid transparent;
          color: #206694;
          height: 40px;
          cursor: pointer;
          font-size: 14px;
          outline: none;
          padding: 0;
          margin: 0;
          font-weight: 700;
        }
        .kuc-base-mobile-datetime-calendar-footer__group__center {
          width: 100%;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String })
], BaseMobileDateTimeCalendarFooter.prototype, "language", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarFooter.prototype, "_locale", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar-footer")) {
    window.customElements.define("kuc-base-mobile-datetime-calendar-footer", BaseMobileDateTimeCalendarFooter);
}
