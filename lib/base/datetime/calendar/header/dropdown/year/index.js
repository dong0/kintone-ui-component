var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent } from "../../../../../kuc-base";
import { getToggleIconSvgTemplate, setListBoxPosition, calculateDistanceInput } from "../../../../utils";
export class BaseDateTimeHeaderYear extends KucBase {
    constructor() {
        super();
        this.year = 2021;
        this.postfix = "";
        this._listBoxVisible = false;
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
        this._listBoxItems = this._getYearOptions().map((year) => {
            const item = {
                value: `${year}`,
                label: `${year}${this.postfix}`
            };
            return item;
        });
        super.update(changedProperties);
    }
    render() {
        return html `
      ${this._getStyleTagTemplate()}
      <button
        class="kuc-base-datetime-header-year__toggle"
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        tabindex="${this._listBoxVisible ? "-1" : "0"}"
        @mouseup="${this._handleMouseUpDropdownToggle}"
        @mousedown="${this._handleMouseDownDropdownToggle}"
        @click="${this._handleClickDropdownYearToggle}"
        @keydown="${this._handleKeyDownYearToggle}"
      >
        <span class="kuc-base-datetime-header-year__toggle__label"
          >${this.year}${this.postfix}</span
        >
        <span class="kuc-base-datetime-header-year__toggle__icon"
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
    closeListBox() {
        this._listBoxVisible = false;
        this._toggleEl.focus();
    }
    _handleScrollDocument() {
        const distance = calculateDistanceInput(this);
        if (distance.inputToBottom >= distance.inputToTop) {
            setListBoxPosition(this, "bottom");
            return;
        }
        setListBoxPosition(this, "top");
    }
    _getListBoxTemplate() {
        return this._listBoxVisible
            ? html `
          <kuc-base-datetime-listbox
            .items="${this._listBoxItems || []}"
            .value="${this.year.toString()}"
            class="kuc-base-datetime-header-year__listbox"
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
        .kuc-base-datetime-header-year__toggle {
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
        .kuc-base-datetime-header-year__toggle__icon {
          position: absolute;
          flex: none;
          width: 24px;
          height: 32px;
        }
        .kuc-base-datetime-header-year__toggle__label {
          font-size: 13px;
          color: #333333;
        }
        .kuc-base-datetime-header-year__toggle:focus {
          border: 1px solid #3498db;
          outline: none;
        }
      </style>
    `;
    }
    _handleMouseUpDropdownToggle(event) {
        event.preventDefault();
    }
    _handleMouseDownDropdownToggle(event) {
        event.preventDefault();
    }
    _handleClickDropdownYearToggle(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this._listBoxVisible) {
            this._openListBox();
        }
        else {
            this.closeListBox();
        }
        dispatchCustomEvent(this, "kuc:year-dropdown-click", {
            value: this._listBoxVisible.toString(),
            oldValue: (!this._listBoxVisible).toString()
        });
    }
    _handleKeyDownYearToggle(event) {
        if (event.key === "Tab")
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
    _handleChangeListBox(event) {
        event.preventDefault();
        event.stopPropagation();
        this.closeListBox();
        if (!event.detail.value)
            return;
        this.year = Number(event.detail.value);
        const detail = { value: `${this.year}` };
        dispatchCustomEvent(this, "kuc:year-dropdown-change", detail);
    }
    _openListBox() {
        this._listBoxVisible = true;
    }
    _getYearOptions() {
        const options = [];
        if (!Number.isInteger(this.year)) {
            this.year = 2021;
        }
        let i = this.year < 100 ? 0 : this.year - 100;
        const maxYear = this.year >= 9999 - 100 ? 9999 : this.year + 100;
        for (i; i <= maxYear; i++) {
            options.push(i);
        }
        return options;
    }
}
__decorate([
    property({ type: Number })
], BaseDateTimeHeaderYear.prototype, "year", void 0);
__decorate([
    property({ type: String })
], BaseDateTimeHeaderYear.prototype, "postfix", void 0);
__decorate([
    state()
], BaseDateTimeHeaderYear.prototype, "_listBoxVisible", void 0);
__decorate([
    query(".kuc-base-datetime-header-year__toggle")
], BaseDateTimeHeaderYear.prototype, "_toggleEl", void 0);
if (!window.customElements.get("kuc-base-datetime-header-year")) {
    window.customElements.define("kuc-base-datetime-header-year", BaseDateTimeHeaderYear);
}
