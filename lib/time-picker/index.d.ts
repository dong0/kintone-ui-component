import { PropertyValues } from "lit";
import { KucBase } from "../base/kuc-base";
import "../base/datetime/time";
declare type TimePickerProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    hour12?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
};
export declare class TimePicker extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    value?: string | undefined;
    disabled: boolean;
    hour12: boolean;
    requiredIcon: boolean;
    visible: boolean;
    private _labelEl;
    private _errorEl;
    private _GUID;
    private _inputValue?;
    constructor(props?: TimePickerProps);
    protected shouldUpdate(_changedProperties: PropertyValues): boolean;
    willUpdate(_changedProperties: PropertyValues): void;
    update(changedProperties: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    updated(): void;
    private _updateErrorWidth;
    private _handleTimeChange;
    private _getStyleTagTemplate;
}
export {};
