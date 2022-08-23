import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { createStyleOnHeader, KucBase } from "../kuc-base";
import { BASE_ERROR_CSS } from "./style";
export class BaseError extends KucBase {
    constructor() {
        super(...arguments);
        this.ariaLive = "";
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this.ariaLive && this.ariaLive !== ""
            ? html `
            <div
              class="kuc-base-error__error"
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
              class="kuc-base-error__error"
              .id="${this.guid}-error"
              role="alert"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `}
    `;
    }
}
__decorate([
    property({ type: String })
], BaseError.prototype, "ariaLive", void 0);
__decorate([
    property({ type: String })
], BaseError.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseError.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-error")) {
    createStyleOnHeader(BASE_ERROR_CSS);
    window.customElements.define("kuc-base-error", BaseError);
}
