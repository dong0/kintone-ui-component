import { __decorate } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { createStyleOnHeader, KucBase } from "../kuc-base";
import { BASE_LABEL_CSS } from "./style";
export class BaseLabel extends KucBase {
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
            : html ` <span class="kuc-base-label__text">${this.text}</span> `;
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
    createStyleOnHeader(BASE_LABEL_CSS);
    window.customElements.define("kuc-base-label", BaseLabel);
}
