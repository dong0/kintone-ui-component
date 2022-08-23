import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps } from "../../base/validator";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
import { MOBILE_TEXT_CSS } from "./style";
export { BaseMobileLabel, BaseMobileError };
let exportMobileText;
(() => {
    exportMobileText = window.customElements.get("kuc-mobile-text");
    if (exportMobileText) {
        return;
    }
    class KucMobileText extends KucBase {
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
        <label
          class="kuc-mobile-text__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label
            .requiredIcon="${this.requiredIcon}"
            .text="${this.label}"
          ></kuc-base-mobile-label>
        </label>
        <div class="kuc-mobile-text__input-form">
          <span
            class="kuc-mobile-text__input-form__prefix"
            ?hidden="${!this.prefix}"
            >${this.prefix}</span
          >
          <input
            class="kuc-mobile-text__input-form__input"
            id="${this._GUID}-label"
            placeholder="${this.placeholder}"
            textAlign="${this.textAlign}"
            type="text"
            .value="${this.value}"
            ?disabled="${this.disabled}"
            aria-invalid="${this.error !== ""}"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            @focus="${this._handleFocusInput}"
            @change="${this._handleChangeInput}"
            @input="${this._handleInputText}"
          />
          <span
            class="kuc-mobile-text__input-form__suffix"
            ?hidden="${!this.suffix}"
            >${this.suffix}</span
          >
        </div>
        <kuc-base-mobile-error .guid="${this._GUID}" .text="${this.error}">
        </kuc-base-mobile-error>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileText.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileText.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "placeholder", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "prefix", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "suffix", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "textAlign", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileText.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileText.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileText.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileText.prototype, "visible", void 0);
    window.customElements.define("kuc-mobile-text", KucMobileText);
    createStyleOnHeader(MOBILE_TEXT_CSS);
    exportMobileText = KucMobileText;
})();
const MobileText = exportMobileText;
export { MobileText };
