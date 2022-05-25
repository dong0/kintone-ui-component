var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { timeValueConverter, visiblePropConverter } from "../../base/converter";
import { FORMAT_IS_NOT_VALID } from "../../base/datetime/resource/constant";
import { dispatchCustomEvent, generateGUID, KucBase } from "../../base/kuc-base";
import { throwErrorAfterUpdateComplete, validateProps, validateTimeValue } from "../../base/validator";
import "../../base/mobile-error";
import "../../base/datetime/mobile-time";
import "../../base/mobile-label";
export class MobileTimePicker extends KucBase {
    constructor(props) {
        super();
        this.className = "";
        this.error = "";
        this.id = "";
        this.label = "";
        this.language = "auto";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.requiredIcon = false;
        this.visible = true;
        this._inputValue = "";
        this._errorFormat = "";
        this._isSelectError = false;
        this._GUID = generateGUID();
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    shouldUpdate(changedProperties) {
        if (this.value === undefined || this.value === "")
            return true;
        if (!validateTimeValue(this.value)) {
            throwErrorAfterUpdateComplete(this, FORMAT_IS_NOT_VALID);
            return false;
        }
        return true;
    }
    willUpdate() {
        if (this.value === undefined || this.value === "")
            return;
        this.value = timeValueConverter(this.value);
    }
    update(changedProperties) {
        if (changedProperties.has("value") && !this._isSelectError) {
            if (this.value === undefined) {
                this._inputValue = "";
            }
            else {
                this._inputValue = this.value || "";
            }
            this._errorFormat = "";
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <div class="kuc-mobile-time-picker__group">
        <label
          class="kuc-mobile-time-picker__group__label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label
            .guid="${this._GUID}"
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-mobile-label>
        </label>
        <div class="kuc-base-mobile-time__group__wrapper">
          <kuc-base-mobile-time
            .value="${this._inputValue}"
            .disabled="${this.disabled}"
            .hour12="${this.hour12}"
            .guid="${this._GUID}"
            .language="${this._getLanguage()}"
            .required="${this.requiredIcon}"
            @kuc:base-mobile-time-change="${this._handleTimeChange}"
          ></kuc-base-mobile-time>
        </div>
        <kuc-base-mobile-error
          .guid="${this._GUID}"
          .text="${this._errorFormat || this.error}"
          ariaLive="assertive"
        ></kuc-base-mobile-error>
      </div>
    `;
    }
    updated() {
        this._isSelectError = false;
    }
    _handleTimeChange(event) {
        event.preventDefault();
        event.stopPropagation();
        const detail = {
            value: event.detail.value,
            oldValue: this.value
        };
        this._inputValue = event.detail.value;
        if (event.detail.error) {
            this._isSelectError = true;
            this._errorFormat = event.detail.error;
            this.value = undefined;
            detail.value = undefined;
            this.error = "";
            dispatchCustomEvent(this, "change", detail);
            return;
        }
        const theSameValue = event.detail.value === this.value;
        if (!theSameValue) {
            this.error = "";
        }
        this._isSelectError = false;
        this._errorFormat = "";
        this.value = event.detail.value;
        dispatchCustomEvent(this, "change", detail);
    }
    _getLanguage() {
        const langs = ["en", "ja", "zh"];
        if (langs.indexOf(this.language) !== -1)
            return this.language;
        if (langs.indexOf(document.documentElement.lang) !== -1)
            return document.documentElement.lang;
        return "en";
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        kuc-mobile-time-picker,
        kuc-mobile-time-picker * {
          font-family: "メイリオ", Meiryo, "Hiragino Kaku Gothic ProN",
            "ヒラギノ角ゴ ProN W3", "ＭＳ Ｐゴシック", "Lucida Grande",
            "Lucida Sans Unicode", Arial, Verdana, sans-serif;
        }
        :lang(zh) kuc-mobile-time-picker,
        :lang(zh) kuc-mobile-time-picker * {
          font-family: "微软雅黑", "Microsoft YaHei", "新宋体", NSimSun, STHeiti,
            Hei, "Heiti SC", "Lucida Grande", "Lucida Sans Unicode", Arial,
            Verdana, sans-serif;
        }
        kuc-mobile-time-picker {
          font-size: 13px;
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }
        kuc-mobile-time-picker[hidden] {
          display: none;
        }
        .kuc-mobile-time-picker__group__label {
          display: inline-block;
          font-weight: bold;
          line-height: 1.5;
          padding: 0px;
          margin: 0 0 4px 0;
          white-space: nowrap;
        }
        .kuc-mobile-time-picker__group__label[hidden] {
          display: none;
        }
        .kuc-base-mobile-time__group__wrapper {
          padding-left: 0.5em;
          max-width: 10px;
        }
      </style>
    `;
    }
}
__decorate([
    property({ type: String, reflect: true, attribute: "class" })
], MobileTimePicker.prototype, "className", void 0);
__decorate([
    property({ type: String })
], MobileTimePicker.prototype, "error", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "id" })
], MobileTimePicker.prototype, "id", void 0);
__decorate([
    property({ type: String })
], MobileTimePicker.prototype, "label", void 0);
__decorate([
    property({ type: String })
], MobileTimePicker.prototype, "language", void 0);
__decorate([
    property({
        type: String,
        hasChanged(newVal, oldVal) {
            if ((newVal === "" || newVal === undefined) && newVal === oldVal) {
                return true;
            }
            return newVal !== oldVal;
        }
    })
], MobileTimePicker.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], MobileTimePicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], MobileTimePicker.prototype, "hour12", void 0);
__decorate([
    property({ type: Boolean })
], MobileTimePicker.prototype, "requiredIcon", void 0);
__decorate([
    property({
        type: Boolean,
        attribute: "hidden",
        reflect: true,
        converter: visiblePropConverter
    })
], MobileTimePicker.prototype, "visible", void 0);
__decorate([
    state()
], MobileTimePicker.prototype, "_inputValue", void 0);
__decorate([
    state()
], MobileTimePicker.prototype, "_errorFormat", void 0);
if (!window.customElements.get("kuc-mobile-time-picker")) {
    window.customElements.define("kuc-mobile-time-picker", MobileTimePicker);
}
