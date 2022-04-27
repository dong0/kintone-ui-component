import { PropertyValues } from "lit";
import { KucBase } from "../../base/kuc-base";
declare type Item = {
    label?: string;
    value?: string;
};
declare type MobileMultiChoiceProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
    items?: Item[];
    value?: string[];
    selectedIndex?: number[];
};
export declare class MobileMultiChoice extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    items: Item[];
    selectedIndex: number[];
    value: string[];
    private _valueMapping;
    private _GUID;
    constructor(props?: MobileMultiChoiceProps);
    private _setInitialValue;
    private _handleChangeInput;
    shouldUpdate(changedProperties: PropertyValues): boolean;
    willUpdate(changedProperties: PropertyValues): void;
    update(changedProperties: PropertyValues): void;
    private _getValueMapping;
    private _getValidValue;
    private _getValidSelectedIndex;
    private _setValueAndSelectedIndex;
    private _isCheckedItem;
    private _getItemTemplate;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
export {};
