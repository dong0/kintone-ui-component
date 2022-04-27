import { PropertyValues } from "lit";
import { KucBase } from "../../base/kuc-base";
declare type Item = {
    label?: string;
    value?: string;
};
declare type RadioButtonProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    value?: string;
    selectedIndex?: number;
    borderVisible?: boolean;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
    items?: Item[];
};
export declare class MobileRadioButton extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    value: string;
    selectedIndex: number;
    borderVisible: boolean;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    items: Item[];
    private _inputEls;
    private _GUID;
    constructor(props?: RadioButtonProps);
    private _setInitialValue;
    willUpdate(changedProperties: PropertyValues): void;
    private _handleChangeInput;
    private _getRadioIconSvgTemplate;
    private _isCheckedItem;
    private _getItemTemplate;
    shouldUpdate(changedProperties: PropertyValues): boolean;
    update(changedProperties: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    updated(): void;
    private _getSelectedIndex;
    private _getValue;
    private _getStyleTagTemplate;
}
export {};
