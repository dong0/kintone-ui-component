import { KucBase } from "../base/kuc-base";
declare type ButtonProps = {
    className?: string;
    id?: string;
    text?: string;
    type?: "normal" | "submit" | "alert";
    disabled?: boolean;
    visible?: boolean;
};
export declare class Button extends KucBase {
    className: string;
    id: string;
    text: string;
    type: string;
    disabled: boolean;
    visible: boolean;
    constructor(props?: ButtonProps);
    private _handleClickButton;
    private _getButtonColorType;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
export {};
