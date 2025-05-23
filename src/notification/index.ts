import { html, PropertyValues, svg } from "lit";
import { property, state } from "lit/decorators.js";

import { ERROR_MESSAGE } from "../base/constant";
import { unsafeHTMLConverter } from "../base/converter";
import {
  createStyleOnHeader,
  dispatchCustomEvent,
  KucBase,
} from "../base/kuc-base";
import { isHTMLElement, validateProps } from "../base/validator";

import { NOTIFICATION_CSS } from "./style";
import { NotificationProps } from "./type";

let exportNotification;
(() => {
  exportNotification = window.customElements.get("kuc-notification");
  if (exportNotification) {
    return;
  }

  class KucNotification extends KucBase {
    @property({ type: String, reflect: true, attribute: "class" }) className =
      "";
    @property({ type: String }) text = "";
    @property({ type: String }) type: "info" | "danger" | "success" = "danger";
    @property({ type: Number }) duration = -1;
    @property() container: HTMLElement = document.body;
    @property() content: string | HTMLElement = "";

    @state()
    private _isOpened = false;

    private _timeoutID!: number;

    constructor(props?: NotificationProps) {
      super();
      const validProps = validateProps(props);
      Object.assign(this, validProps);
    }

    shouldUpdate(changedProperties: PropertyValues): boolean {
      if (changedProperties.has("container")) {
        if (this.container === null || this.container === undefined) {
          this._isOpened && this._close();
          return false;
        }
        const isValidContainer = this._isValidContainerElement();
        const shouldClose =
          !isValidContainer || !document.contains(this.container);
        if (this._isOpened && shouldClose) {
          this._close();
        }
        if (!isValidContainer) {
          this.throwErrorAfterUpdateComplete(ERROR_MESSAGE.CONTAINER.INVALID);
          return false;
        }
      }
      return true;
    }

    private _isValidContainerElement() {
      return this.container instanceof HTMLElement;
    }

    private _handleClickCloseButton(event: MouseEvent) {
      this.close();
    }

    private _getCloseButtonColorType() {
      switch (this.type) {
        case "info":
        case "success":
          return this.type;
        default:
          return "danger";
      }
    }

    private _getCloseButtonSvgTemplate() {
      return svg`
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>close button</title>
          <path
            class="kuc-notification__notification__close-button__icon-background--${this._getCloseButtonColorType()}"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.4765 15.7071L20.1229 12.0607L20.4765 11.7071L19.7694 11L19.4158 11.3536L15.7694 15L12.1229 11.3536L11.7694 11L11.0623 11.7071L11.4158 12.0607L15.0623 15.7071L11.3536 19.4158L11 19.7694L11.7071 20.4765L12.0607 20.1229L15.7694 16.4142L19.4781 20.1229L19.8316 20.4765L20.5387 19.7694L20.1852 19.4158L16.4765 15.7071Z"
            fill="white"
          />
        </svg>
      `;
    }

    private _setAutoCloseTimer() {
      this._clearAutoCloseTimer();
      if (!Number.isFinite(this.duration) || this.duration < 0) {
        return;
      }
      this._timeoutID = window.setTimeout(() => {
        this.close();
      }, this.duration);
    }

    private _clearAutoCloseTimer() {
      this._timeoutID && window.clearTimeout(this._timeoutID);
    }

    open() {
      const isValidContainer = this._isValidContainerElement();
      if (!isValidContainer) {
        document.body.appendChild(this);
        requestAnimationFrame(() => {
          document.body.removeChild(this);
        });
        this.performUpdate();
        return;
      }
      this.container.appendChild(this);
      this.performUpdate();
      this.classList.remove("kuc-notification-fadeout");
      this.classList.add("kuc-notification-fadein");
      this._isOpened = true;
      this._setAutoCloseTimer();
    }

    private _close() {
      this._isOpened = false;
      this.classList.remove("kuc-notification-fadein");
      this.classList.add("kuc-notification-fadeout");
      this._clearAutoCloseTimer();
    }

    close() {
      this._close();
      dispatchCustomEvent(this, "close");
    }

    render() {
      const content = (() => {
        if (this.content) {
          if (isHTMLElement(this.content)) {
            return html`<div
              class="kuc-notification__notification__title--html"
            >
              ${unsafeHTMLConverter(this.content)}
            </div>`;
          }
          return this.content;
        }
        return this.text;
      })();

      return html`
        <div
          class="kuc-notification__notification kuc-notification__notification--${this
            .type}"
        >
          <pre
            class="kuc-notification__notification__title"
            aria-live="assertive"
            role="${this._isOpened ? "alert" : ""}"
          ><!--
          -->${content}</pre>
          <button
            class="kuc-notification__notification__close-button"
            type="button"
            aria-label="close"
            @click="${this._handleClickCloseButton}"
          >
            ${this._getCloseButtonSvgTemplate()}
          </button>
        </div>
      `;
    }
  }

  window.customElements.define("kuc-notification", KucNotification);
  createStyleOnHeader(NOTIFICATION_CSS);
  exportNotification = KucNotification;
})();

const Notification = exportNotification as any;
export { Notification };
