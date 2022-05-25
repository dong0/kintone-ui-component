var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase } from "../kuc-base";
export class BaseLabel extends KucBase {
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
        class="kuc-base-label__required-icon"
        ?hidden="${!this.requiredIcon}"
        >*</span
      >
    `;
    }
    _getTextTemplate() {
        return this.guid && this.guid !== ""
            ? html `
          <span class="kuc-base-label__text" .id="${this.guid}-group"
            >${this.text}</span
          >
        `
            : html `
          <span class="kuc-base-label__text">${this.text}</span>
        `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-base-label,
        kuc-base-label *,
        :lang(en) kuc-base-label,
        :lang(en) kuc-base-label * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-base-label,
        :lang(ja) kuc-base-label * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-base-label,
        :lang(zh) kuc-base-label * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        kuc-base-label {
          font-size: 14px;
          color: #333333;
          display: inline-table;
          vertical-align: top;
        }
        kuc-base-label[hidden] {
          display: none;
        }
        .kuc-base-label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-base-label__required-icon[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: Boolean })
], BaseLabel.prototype, "requiredIcon", void 0);
__decorate([
    property({ type: String })
], BaseLabel.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseLabel.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-label")) {
    window.customElements.define("kuc-base-label", BaseLabel);
}