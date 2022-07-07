import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, createStyleOnHeader } from "../kuc-base";
import { BASE_MOBILE_LABEL_CSS } from "./style";
export class BaseMobileLabel extends KucBase {
    constructor() {
        super(...arguments);
        this.requiredIcon = false;
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this._getTextTemplate()}
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
            : html ` <span class="kuc-base-mobile-label__text">${this.text}</span> `;
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
    createStyleOnHeader(BASE_MOBILE_LABEL_CSS);
    window.customElements.define("kuc-base-mobile-label", BaseMobileLabel);
}
