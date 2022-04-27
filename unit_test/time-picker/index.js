import { __decorate } from "tslib";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent } from "../base/kuc-base";
import { visiblePropConverter, timeValueConverter } from "../base/converter";
import { getWidthElmByContext } from "../base/context";
import { FORMAT_IS_NOT_VALID } from "../base/datetime/resource/constant";
import { validateProps, validateTimeValue, throwErrorAfterUpdateComplete } from "../base/validator";
import "../base/datetime/time";
export class TimePicker extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.requiredIcon = false;
        this.visible = true;
        this._inputValue = "";
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    shouldUpdate(_changedProperties) {
        if (this.value === undefined || this.value === "")
            return true;
        if (!validateTimeValue(this.value)) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        return true;
    }
    willUpdate(_changedProperties) {
        if (this.value === undefined || this.value === "")
            return;
        this.value = timeValueConverter(this.value);
    }
    update(changedProperties) {
        if (changedProperties.has("value")) {
            const isEmpty = this.value === undefined || this.value === "";
            this._inputValue = isEmpty ? "" : this.value;
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <fieldset
        class="kuc-time-picker__group"
        aria-describedby="${this._GUID}-error"
      >
        <legend class="kuc-time-picker__group__label">
          <span class="kuc-time-picker__group__label__text">${this.label}</span
          ><!--
          --><span
            class="kuc-time-picker__group__label__required-icon"
            ?hidden="${!this.requiredIcon}"
            >*</span
          >
        </legend>
        <kuc-base-time
          class="kuc-time-picker__group__input"
          .value="${this._inputValue}"
          .hour12="${this.hour12}"
          .disabled="${this.disabled}"
          @kuc:base-time-change="${this._handleTimeChange}"
        >
        </kuc-base-time>
        <div
          class="kuc-time-picker__group__error"
          id="${this._GUID}-error"
          role="alert"
          ?hidden="${!this.error}"
        >
          ${this.error}
        </div>
      </fieldset>
    `;
    }
    updated() {
        this._updateErrorWidth();
    }
    _updateErrorWidth() {
        const labelWidth = getWidthElmByContext(this._labelEl);
        const inputGroupWitdh = 85;
        if (labelWidth > inputGroupWitdh) {
            this._errorEl.style.width = labelWidth + "px";
            return;
        }
        this._errorEl.style.width = inputGroupWitdh + "px";
    }
    _handleTimeChange(event) {
        event.preventDefault();
        event.stopPropagation();
        const detail = {
            value: event.detail.value,
            oldValue: this.value
        };
        this.value = event.detail.value;
        dispatchCustomEvent(this, "change", detail);
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-time-picker,
        kuc-time-picker *,
        :lang(en) kuc-time-picker,
        :lang(en) kuc-time-picker * {
          font-family: "HelveticaNeueW02-45Ligh", Arial,
            "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
        }
        :lang(ja) kuc-time-picker,
        :lang(ja) kuc-time-picker * {
          font-family: "メイリオ", "Hiragino Kaku Gothic ProN", Meiryo,
            sans-serif;
        }
        :lang(zh) kuc-time-picker,
        :lang(zh) kuc-time-picker * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", sans-serif;
        }
        kuc-time-picker {
          font-size: 14px;
          color: #333333;
          display: inline-block;
          vertical-align: top;
          line-height: 1.5;
        }
        .kuc-time-picker__group__input {
          position: relative;
        }
        kuc-time-picker[hidden] {
          display: none;
        }
        .kuc-time-picker__group {
          display: flex;
          flex-direction: column;
          border: none;
          padding: 0px;
          height: auto;
          margin: 0px;
        }
        .kuc-time-picker__group__label {
          padding: 4px 0px 8px 0px;
          display: inline-block;
          white-space: nowrap;
        }
        .kuc-time-picker__group__label[hidden] {
          display: none;
        }
        .kuc-time-picker__group__label__required-icon {
          font-size: 20px;
          vertical-align: -3px;
          color: #e74c3c;
          margin-left: 4px;
          line-height: 1;
        }
        .kuc-time-picker__group__label__required-icon[hidden] {
          display: none;
        }
        .kuc-time-picker__group__error {
          line-height: 1.5;
          padding: 4px 18px;
          box-sizing: border-box;
          background-color: #e74c3c;
          color: #ffffff;
          margin: 8px 0px;
          word-break: break-all;
          white-space: normal;
        }
        .kuc-time-picker__group__error[hidden] {
          display: none;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], TimePicker.prototype, "className", void 0);
__decorate([
    property({ type: String })
], TimePicker.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], TimePicker.prototype, "id", void 0);
__decorate([
    property({ type: String })
], TimePicker.prototype, "label", void 0);
__decorate([
    property({ type: String })
], TimePicker.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "hour12", void 0);
__decorate([
    property({ type: Boolean })
], TimePicker.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], TimePicker.prototype, "visible", void 0);
__decorate([
    query(".kuc-time-picker__group__label")
], TimePicker.prototype, "_labelEl", void 0);
__decorate([
    query(".kuc-time-picker__group__error")
], TimePicker.prototype, "_errorEl", void 0);
if (!window.customElements.get("kuc-time-picker")) {
    window.customElements.define("kuc-time-picker", TimePicker);
}
