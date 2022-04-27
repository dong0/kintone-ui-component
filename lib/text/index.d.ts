import { KucBase } from "../base/kuc-base";
declare type TextProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    textAlign?: "left" | "right";
    value?: string;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
};
export declare class Text extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    placeholder: string;
    prefix: string;
    suffix: string;
    textAlign: string;
    value: string;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    private _GUID;
    constructor(props?: TextProps);
    private _handleFocusInput;
    private _handleChangeInput;
    private _handleInputText;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
export {};
