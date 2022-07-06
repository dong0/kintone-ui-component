var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase } from "../kuc-base";
export class BaseMobileError extends KucBase {
    constructor() {
        super(...arguments);
        this.ariaLive = "";
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      ${this.ariaLive && this.ariaLive !== ""
            ? html `
            <div
              class="kuc-base-mobile-error__error"
              .id="${this.guid}-error"
              role="alert"
              aria-live="${this.ariaLive}"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `
            : html `
            <div
              class="kuc-base-mobile-error__error"
              .id="${this.guid}-error"
              role="alert"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `}
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-mobile-error {
          display: block;
          font-size: 13px;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-base-mobile-error,
        :lang(zh) kuc-base-mobile-error * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-base-mobile-error[hidden] {
          display: none;
        }
        .kuc-base-mobile-error__error {
          line-height: 1.5;
          color: #000000;
          background-color: #fdffc9;
          border: 1px solid #e5db68;
          border-radius: 0.4em;
          padding: 0.4em 1em;
          margin-top: 0.3em;
          margin-left: 0.5em;
        }
        .kuc-base-mobile-error__error[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String })
], BaseMobileError.prototype, "ariaLive", void 0);
__decorate([
    property({ type: String })
], BaseMobileError.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseMobileError.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-mobile-error")) {
    window.customElements.define("kuc-base-mobile-error", BaseMobileError);
}
