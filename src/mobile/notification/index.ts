import { html, PropertyValues, svg } from "lit";
import { property, state } from "lit/decorators.js";

import { ERROR_MESSAGE } from "../../base/constant";
import { unsafeHTMLConverter } from "../../base/converter";
import {
  createStyleOnHeader,
  dispatchCustomEvent,
  KucBase,
} from "../../base/kuc-base";
import { isHTMLElement, validateProps } from "../../base/validator";

import { MOBILE_NOTIFICATION_CSS } from "./style";
import { MobileNotificationProps } from "./type";

let exportMobileNotification;
(() => {
  exportMobileNotification = window.customElements.get(
    "kuc-mobile-notification",
  );
  if (exportMobileNotification) {
    return;
  }

  class KucMobileNotification extends KucBase {
    @property({ type: String, reflect: true, attribute: "class" }) className =
      "";
    @property({ type: String }) text = "";
    @property({ type: Number }) duration = -1;
    @property() container: HTMLElement = document.body;
    @property() content: string | HTMLElement = "";

    @state()
    private _isOpened = false;

    private _timeoutID!: number;

    constructor(props?: MobileNotificationProps) {
      super();

      const validProps = validateProps(props);
      Object.assign(this, validProps);
    }

    private _handleClickCloseButton(event: MouseEvent) {
      this.close();
    }

    private _getCloseButtonSvgTemplate() {
      return svg`
      <svg
        height="12"
        width="12"
        viewBox="0 0 512.001 512.001"
        xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="m512.001 84.853-84.853-84.853-171.147 171.147-171.148-171.147-84.853 84.853 171.148 171.147-171.148 171.148 84.853 84.853 171.148-171.147 171.147 171.147 84.853-84.853-171.148-171.148z"/>
          </g>
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

      this.classList.remove("kuc-mobile-notification-fadeout");
      this.classList.add("kuc-mobile-notification-fadein");
      this._isOpened = true;

      this._setAutoCloseTimer();
    }

    close() {
      this._close();
      dispatchCustomEvent(this, "close");
    }

    private _close() {
      this._isOpened = false;
      this.classList.remove("kuc-mobile-notification-fadein");
      this.classList.add("kuc-mobile-notification-fadeout");

      this._clearAutoCloseTimer();
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

    render() {
      const content = (() => {
        if (this.content) {
          if (isHTMLElement(this.content)) {
            return html`<div
              class="kuc-mobile-notification__notification__title--html"
            >
              ${unsafeHTMLConverter(this.content)}
            </div>`;
          }
          return this.content;
        }
        return this.text;
      })();

      return html`
        <div class="kuc-mobile-notification__notification">
          <pre
            class="kuc-mobile-notification__notification__title"
            aria-live="assertive"
            role="${this._isOpened ? "alert" : ""}"
          ><!---->${content}</pre>
          <button
            class="kuc-mobile-notification__notification__close-button"
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

  window.customElements.define(
    "kuc-mobile-notification",
    KucMobileNotification,
  );
  createStyleOnHeader(MOBILE_NOTIFICATION_CSS);
  exportMobileNotification = KucMobileNotification;
})();

const MobileNotification = exportMobileNotification as any;
export { MobileNotification };
