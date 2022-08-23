import { LitElement } from "lit";
declare type CustomEventDetail = {
    data?: string | null;
    oldValue?: string | string[];
    value?: string | string[];
    error?: string;
};
export declare abstract class KucBase extends LitElement {
    createRenderRoot(): this;
}
export declare const dispatchCustomEvent: (el: HTMLElement, eventName: string, detail?: CustomEventDetail) => boolean;
export declare const createStyleOnHeader: (styleText: string) => void;
export { CustomEventDetail };
export declare const generateGUID: () => string;
