import { PropertyValues } from "lit";
import { KucBase } from "../base/kuc-base";
declare type DialogProps = {
    icon?: "" | "info" | "success" | "error" | "warning" | "question";
    title?: string;
    content?: string | HTMLElement;
    footer?: string | HTMLElement;
};
export declare class Dialog extends KucBase {
    icon: "" | "info" | "success" | "error" | "warning" | "question";
    title: string;
    content: string | HTMLElement;
    footer: string | HTMLElement;
    private _dialogEl;
    private _focusableElements;
    private _triggeredElement;
    private _GUID;
    private _content;
    private _footer;
    constructor(props?: DialogProps);
    update(changedProperties: PropertyValues): void;
    open(): void;
    close(): void;
    render(): import("lit").TemplateResult<1>;
    private _handleFocusFirstDummy;
    private _handleFocusLastDummy;
    private _handleKeyDownDialog;
    private _handleClickCloseButton;
    private _getCloseButtonSvgTemplate;
    private _getIconTemplate;
    private _getStyleTagTemplate;
}
export {};
