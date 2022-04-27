import { LitElement } from "lit";
import { v4 as uuid } from "uuid";
export class KucBase extends LitElement {
    createRenderRoot() {
        return this;
    }
}
export const dispatchCustomEvent = (el, eventName, detail) => {
    const event = new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true
    });
    return el.dispatchEvent(event);
};
export const generateGUID = () => uuid();
