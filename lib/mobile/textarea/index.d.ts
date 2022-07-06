import { KucBase } from "../../base/kuc-base";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
declare type MobileTextAreaProps = {
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
export declare class MobileTextArea extends KucBase {
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
    constructor(props?: MobileTextAreaProps);
    private _handleFocusInput;
    private _handleChangeInput;
    private _handleInputTextArea;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
