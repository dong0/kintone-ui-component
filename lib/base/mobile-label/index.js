var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase } from "../kuc-base";
export class BaseMobileLabel extends KucBase {
    constructor() {
        super(...arguments);
        this.requiredIcon = false;
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}${this._getTextTemplate()}
      <span
        class="kuc-base-mobile-label__required-icon"
        ?hidden="${!this.requiredIcon}"
        >*</span
      >
    `;
    }
    _getTextTemplate() {
        return this.guid && this.guid !== ""
            ? html `
          <span class="kuc-base-mobile-label__text" .id="${this.guid}-group"
            >${this.text}</span
          >
        `
            : html `
          <span class="kuc-base-mobile-label__text">${this.text}</span>
        `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-mobile-label {
          display: inline-table;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-base-mobile-label,
        :lang(zh) kuc-base-mobile-label * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-base-mobile-label[hidden] {
          display: none;
        }
        .kuc-base-mobile-label__text {
          text-shadow: 0 1px 0 #ffffff;
          color: #888888;
          white-space: normal;
          font-size: 86%;
        }
        .kuc-base-mobile-label__required-icon {
          position: relative;
          left: 3px;
          color: #d01212;
        }
        .kuc-base-mobile-label__required-icon[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: Boolean })
], BaseMobileLabel.prototype, "requiredIcon", void 0);
__decorate([
    property({ type: String })
], BaseMobileLabel.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseMobileLabel.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-mobile-label")) {
    window.customElements.define("kuc-base-mobile-label", BaseMobileLabel);
}
