import { PropertyValues } from "lit";
import { KucBase } from "../../base/kuc-base";
declare type Item = {
    label?: string;
    value?: string;
};
declare type MobileDropdownProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    value?: string;
    selectedIndex?: number;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
    items?: Item[];
};
export declare class MobileDropdown extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    value: string;
    selectedIndex: number;
    disabled: boolean;
    requiredIcon: boolean;
    visible: boolean;
    items: Item[];
    private _selectEl;
    private _GUID;
    constructor(props?: MobileDropdownProps);
    private _setInitialValue;
    private _handleChangeInput;
    shouldUpdate(changedProperties: PropertyValues): boolean;
    willUpdate(changedProperties: PropertyValues): void;
    update(changedProperties: PropertyValues): void;
    private _getSelectedIndex;
    private _getValue;
    private _isCheckedItem;
    private _getItemTemplate;
    render(): import("lit").TemplateResult<1>;
    updated(changedProperties: PropertyValues): void;
    private _getStyleTagTemplate;
}
export {};
