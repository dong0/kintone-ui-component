import { KucBase } from "../base/kuc-base";
declare type TextAreaProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
};
export declare class TextArea extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    placeholder: string;
    value: string;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    private _GUID;
    private _onResize;
    private _textarea;
    constructor(props?: TextAreaProps);
    private _handleFocusTextarea;
    private _handleChangeTextarea;
    private _handleInputTextArea;
    private _handleMouseDownResize;
    private _handleMouseUpDocument;
    private _handleMouseMoveDocument;
    render(): import("lit").TemplateResult<1>;
    private _getResizerButtonSvgTemplate;
    firstUpdated(): void;
    private _getStyleTagTemplate;
}
export {};
