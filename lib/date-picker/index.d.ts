import { PropertyValues } from "lit";
import { KucBase } from "../base/kuc-base";
import "../base/datetime/date";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
declare type DatePickerProps = {
    className?: string;
    error?: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    requiredIcon?: boolean;
    visible?: boolean;
    language?: "ja" | "en" | "zh" | "auto";
    value?: string;
};
export declare class DatePicker extends KucBase {
    className: string;
    error: string;
    id: string;
    label: string;
    disabled: boolean;
    requiredIcon: boolean;
    language: string;
    value?: string | undefined;
    visible: boolean;
    private _errorFormat;
    private _errorText;
    private _inputValue?;
    private _invalidValue;
    private _valueConverted;
    private _GUID;
    private _dateInput;
    constructor(props?: DatePickerProps);
    protected shouldUpdate(_changedProperties: PropertyValues): boolean;
    update(changedProperties: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    updated(): void;
    private _updateErrorText;
    private _getStyleTagTemplate;
    private _getLanguage;
    private _handleDateChange;
    private _disptchChangeEvent;
}