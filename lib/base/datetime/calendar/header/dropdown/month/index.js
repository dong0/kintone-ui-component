var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../../../../kuc-base";
import { getToggleIconSvgTemplate, getLocale, setListBoxPosition, calculateDistanceInput } from "../../../../utils";
export class BaseDateTimeHeaderMonth extends KucBase {
    constructor() {
        super();
        this.language = "en";
        this.month = 1;
        this._listBoxVisible = false;
        this._locale = getLocale("en");
        this._monthLabel = "";
        this._maxHeight = 1000;
        this._handleScrollDocument = this._handleScrollDocument.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            document.addEventListener("scroll", this._handleScrollDocument);
        }, 1);
    }
    disconnectedCallback() {
        document.removeEventListener("scroll", this._handleScrollDocument);
        super.disconnectedCallback();
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
            this._listBoxItems = this._getListBoxItems();
        }
        if (changedProperties.has("month")) {
            this._monthLabel = this._getMonthLabel();
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <button
        class="kuc-base-datetime-header-month__toggle"
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        tabindex="${this._listBoxVisible ? "-1" : "0"}"
        @mouseup="${this._handleMouseUpDropdownToggle}"
        @mousedown="${this._handleMouseDownDropdownToggle}"
        @click="${this._handleClickDropdownMonthToggle}"
        @keydown="${this._handleKeyDownMonthToggle}"
      >
        <span class="kuc-base-datetime-header-month__toggle__label"
          >${this._monthLabel}</span
        >
        <span class="kuc-base-datetime-header-month__toggle__icon"
          >${getToggleIconSvgTemplate()}
        </span>
      </button>
      ${this._getListBoxTemplate()}
    `;
    }
    async updated(changedProperties) {
        await this.updateComplete;
        if (changedProperties.has("_listBoxVisible") && this._listBoxVisible) {
            this._handleScrollDocument();
        }
        super.update(changedProperties);
    }
    _handleScrollDocument() {
        const distance = calculateDistanceInput(this);
        if (distance.inputToBottom >= distance.inputToTop) {
            setListBoxPosition(this, "bottom");
            return;
        }
        setListBoxPosition(this, "top");
    }
    closeListBox() {
        this._listBoxVisible = false;
        this._toggleEl.focus();
    }
    _getListBoxTemplate() {
        return this._listBoxVisible
            ? html `
          <kuc-base-datetime-listbox
            .items="${this._listBoxItems || []}"
            .value="${this.month.toString()}"
            .maxHeight="${this._maxHeight}"
            class="kuc-base-datetime-header-month__listbox"
            @kuc:listbox-click="${this._handleChangeListBox}"
            @kuc:listbox-blur="${this._handleFocusOutListBox}"
            @kuc:listbox-escape="${this._handleListBoxEscape}"
            aria-hidden="${!this._listBoxVisible}"
          >
          </kuc-base-datetime-listbox>
        `
            : "";
    }
    _handleFocusOutListBox() {
        this._listBoxVisible = false;
        this._toggleEl.focus();
    }
    _handleListBoxEscape() {
        this._handleFocusOutListBox();
    }
    _getStyleTagTemplate() {
        return html `
      <style>
        .kuc-base-datetime-header-month__toggle {
          position: relative;
          box-sizing: border-box;
          height: 32px;
          padding: 0 24px 0 8px;
          line-height: 30px;
          overflow: hidden;
          background-color: white;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .kuc-base-datetime-header-month__toggle__icon {
          position: absolute;
          flex: none;
          width: 24px;
          height: 32px;
        }
        .kuc-base-datetime-header-month__toggle__label {
          font-size: 13px;
          color: #333333;
        }
        .kuc-base-datetime-header-month__toggle:focus {
          border: 1px solid #3498db;
          outline: none;
        }
      </style>
    `;
    }
    _handleClickDropdownMonthToggle(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this._listBoxVisible) {
            this._openListBox();
        }
        else {
            this.closeListBox();
        }
        dispatchCustomEvent(this, "kuc:month-dropdown-click", {
            value: this._listBoxVisible.toString(),
            oldValue: (!this._listBoxVisible).toString()
        });
    }
    _handleMouseUpDropdownToggle(event) {
        event.preventDefault();
    }
    _handleMouseDownDropdownToggle(event) {
        event.preventDefault();
    }
    _handleKeyDownMonthToggle(event) {
        if (this._handleTabKey(event.key))
            return;
        event.preventDefault();
        this._openListBoxByKey(event.key);
    }
    _openListBoxByKey(key) {
        const isOpenListBox = [" ", "Up", "ArrowUp", "Down", "ArrowDown", "Enter"].indexOf(key) > -1;
        if (!isOpenListBox)
            return;
        this._openListBox();
    }
    _handleTabKey(key) {
        return key === "Tab";
    }
    _handleChangeListBox(event) {
        event.preventDefault();
        event.stopPropagation();
        this.closeListBox();
        if (!event.detail.value)
            return;
        this.month = Number(event.detail.value);
        const detail = { value: `${this.month}` };
        dispatchCustomEvent(this, "kuc:month-dropdown-change", detail);
    }
    _openListBox() {
        this._listBoxVisible = true;
    }
    _getListBoxItems() {
        return this._locale.MONTH_SELECT.map((month, index) => {
            const item = {
                value: `${index + 1}`,
                label: `${month}`
            };
            return item;
        });
    }
    _getMonthLabel() {
        const monthSelected = this._locale.MONTH_SELECT.filter((_, index) => this.month === index + 1);
        return monthSelected.length > 0 ? monthSelected[0] : "JANUARY";
    }
}
__decorate([
    property({ type: String })
], BaseDateTimeHeaderMonth.prototype, "language", void 0);
__decorate([
    property({ type: Number })
], BaseDateTimeHeaderMonth.prototype, "month", void 0);
__decorate([
    state()
], BaseDateTimeHeaderMonth.prototype, "_listBoxVisible", void 0);
__decorate([
    query(".kuc-base-datetime-header-month__toggle")
], BaseDateTimeHeaderMonth.prototype, "_toggleEl", void 0);
if (!window.customElements.get("kuc-base-datetime-header-month")) {
    window.customElements.define("kuc-base-datetime-header-month", BaseDateTimeHeaderMonth);
}
