import { KucBase } from "../../base/kuc-base";
declare type MobileNotificationProps = {
    className?: string;
    text?: string;
    duration?: number;
};
export declare class MobileNotification extends KucBase {
    className: string;
    text: string;
    duration: number;
    private _isOpened;
    private _timeoutID;
    constructor(props?: MobileNotificationProps);
    private _handleClickCloseButton;
    private _getCloseButtonSvgTemplate;
    open(): void;
    close(): void;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
    private _setAutoCloseTimer;
    private _clearAutoCloseTimer;
}
export {};
