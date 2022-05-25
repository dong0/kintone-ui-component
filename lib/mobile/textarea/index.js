var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps } from "../../base/validator";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
export class MobileTextArea extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.placeholder = "";
        this.value = "";
        this.disabled = false;
        this.requiredIcon = false;
        this.visible = true;
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    _handleFocusInput(event) {
        const detail = { value: this.value };
        dispatchCustomEvent(this, "focus", detail);
    }
    _handleChangeInput(event) {
        event.stopPropagation();
        const targetEl = event.target;
        const detail = { value: "", oldValue: this.value };
        this.value = targetEl.value;
        detail.value = this.value;
        dispatchCustomEvent(this, "change", detail);
    }
    _handleInputTextArea(event) {
        event.stopPropagation();
        const targetEl = event.target;
        const detail = {
            value: targetEl.value,
            data: event.data
        };
        dispatchCustomEvent(this, "input", detail);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <label
        class="kuc-mobile-textarea__label"
        for="${this._GUID}-label"
        ?hidden="${!this.label}"
      >
        <kuc-base-mobile-label
          .requiredIcon="${this.requiredIcon}"
          .text="${this.label}"
        ></kuc-base-mobile-label>
      </label>
      <div class="kuc-mobile-textarea__form">
        <textarea
          class="kuc-mobile-textarea__form__textarea"
          id="${this._GUID}-label"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          .value="${this.value}"
          aria-invalid="${this.error !== ""}"
          aria-describedby="${this._GUID}-error"
          aria-required="${this.requiredIcon}"
          @focus="${this._handleFocusInput}"
          @change="${this._handleChangeInput}"
          @input="${this._handleInputTextArea}"
        /></textarea>
      </div>
      <kuc-base-mobile-error .guid="${this._GUID}" .text="${this.error}">
      </kuc-base-mobile-error>
    `;
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-mobile-textarea {
          display: block;
          font-size: 13px;
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-mobile-textarea,
        :lang(zh) kuc-mobile-textarea * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-mobile-textarea[hidden] {
          display: none;
        }
        .kuc-mobile-textarea__label {
          padding: 0;
          margin: 0 0 4px 0;
          display: inline-block;
          font-weight: bold;
          line-height: 1.5;
          white-space: nowrap;
        }
        .kuc-mobile-textarea__label[hidden] {
          display: none;
        }
        .kuc-mobile-textarea__form {
          padding-left: 0.5em;
          padding-right: 0.5em;
        }
        .kuc-mobile-textarea__form__textarea {
          width: 100%;
          height: 120px;
          padding: 0.4em;
          border: 1px solid #b3b3b3;
          outline: 0;
          box-shadow: 0 1px 0 #ffffff, inset 0 2px 3px #dadada;
          border-radius: 0.4em;
          box-sizing: border-box;
        }
        .kuc-mobile-textarea__form__textarea[aria-required="true"] {
          border: 1px solid #cf4a38;
        }
        .kuc-mobile-textarea__form__textarea:disabled {
          color: #999999;
          background-color: #d5d7d9;
          opacity: 1;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MobileTextArea.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MobileTextArea.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MobileTextArea.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MobileTextArea.prototype, "label", void 0);
__decorate([
    property({ type: String })
], MobileTextArea.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], MobileTextArea.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], MobileTextArea.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MobileTextArea.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MobileTextArea.prototype, "visible", void 0);
if (!window.customElements.get("kuc-mobile-textarea")) {
    window.customElements.define("kuc-mobile-textarea", MobileTextArea);
}
