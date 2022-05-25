import { KucBase } from "../../base/kuc-base";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
declare type MobileTextProps = {
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
export declare class MobileText extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    placeholder: string;
    prefix: string;
    suffix: string;
    textAlign: "left" | "right";
    value: string;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    private _GUID;
    constructor(props?: MobileTextProps);
    private _handleFocusInput;
    private _handleChangeInput;
    private _handleInputText;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
