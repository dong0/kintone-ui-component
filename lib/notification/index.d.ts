import { KucBase } from "../base/kuc-base";
declare type NotificationProps = {
    className?: string;
    text?: string;
    type?: "info" | "danger" | "success";
    duration?: number;
};
export declare class Notification extends KucBase {
    className: string;
    text: string;
    type: "info" | "danger" | "success";
    duration: number;
    private _isOpened;
    private _timeoutID;
    constructor(props?: NotificationProps);
    private _handleClickCloseButton;
    private _getCloseButtonColor;
    private _getCloseButtonSvgTemplate;
    open(): void;
    close(): void;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
    private _setAutoCloseTimer;
    private _clearAutoCloseTimer;
}
export {};
