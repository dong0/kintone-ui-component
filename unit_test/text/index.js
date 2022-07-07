import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps } from "../base/validator";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
import { TEXT_CSS } from "./style";
export { BaseError, BaseLabel };
let exportText;
(() => {
    exportText = window.customElements.get("kuc-text");
    if (exportText) {
        return;
    }
    class KucText extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.placeholder = "";
            this.prefix = "";
            this.suffix = "";
            this.textAlign = "left";
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
        _handleInputText(event) {
            event.stopPropagation();
            const targetEl = event.target;
            const detail = {
                value: targetEl.value,
                data: event.data,
            };
            dispatchCustomEvent(this, "input", detail);
        }
        render() {
            return html `
        <div class="kuc-text__group">
          <label
            class="kuc-text__group__label"
            for="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label>
          </label>
          <div class="kuc-text__group__input-form">
            <div class="kuc-text__group__input-form__prefix-outer">
              <span
                class="kuc-text__group__input-form__prefix-outer__prefix"
                ?hidden="${!this.prefix}"
                >${this.prefix}</span
              >
            </div>
            <div class="kuc-text__group__input-form__input-outer">
              <input
                class="kuc-text__group__input-form__input-outer__input"
                id="${this._GUID}-label"
                placeholder="${this.placeholder}"
                textAlign="${this.textAlign}"
                type="text"
                .value="${this.value}"
                aria-required="${this.requiredIcon}"
                aria-invalid="${this.error !== ""}"
                aria-describedby="${this._GUID}-error"
                @focus="${this._handleFocusInput}"
                @change="${this._handleChangeInput}"
                @input="${this._handleInputText}"
                ?disabled="${this.disabled}"
              />
            </div>
            <div class="kuc-text__group__input-form__suffix-outer">
              <span
                class="kuc-text__group__input-form__suffix-outer__suffix"
                ?hidden="${!this.suffix}"
                >${this.suffix}</span
              >
            </div>
          </div>
          <kuc-base-error
            .text="${this.error}"
            .guid="${this._GUID}"
          ></kuc-base-error>
        </div>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucText.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucText.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "placeholder", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "prefix", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "suffix", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "textAlign", void 0);
    __decorate([
        property({ type: String })
    ], KucText.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucText.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucText.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucText.prototype, "visible", void 0);
    window.customElements.define("kuc-text", KucText);
    createStyleOnHeader(TEXT_CSS);
    exportText = KucText;
})();
const Text = exportText;
export { Text };
