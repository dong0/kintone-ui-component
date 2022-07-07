import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps } from "../../base/validator";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
import { MOBILE_TEXTAREA_CSS } from "./style";
let exportMobileTextArea;
(() => {
    exportMobileTextArea = window.customElements.get("kuc-mobile-textarea");
    if (exportMobileTextArea) {
        return;
    }
    class KucMobileTextArea extends KucBase {
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
                data: event.data,
            };
            dispatchCustomEvent(this, "input", detail);
        }
        render() {
            return html `
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
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileTextArea.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileTextArea.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileTextArea.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileTextArea.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileTextArea.prototype, "placeholder", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileTextArea.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileTextArea.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileTextArea.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileTextArea.prototype, "visible", void 0);
    window.customElements.define("kuc-mobile-textarea", KucMobileTextArea);
    createStyleOnHeader(MOBILE_TEXTAREA_CSS);
    exportMobileTextArea = KucMobileTextArea;
})();
const MobileTextArea = exportMobileTextArea;
export { MobileTextArea };
