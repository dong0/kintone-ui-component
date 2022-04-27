import { PropertyValues } from "lit";
import { KucBase } from "../../kuc-base";
declare type BaseMobileTimeProps = {
    value?: string;
    disabled?: boolean;
    hour12?: boolean;
};
export declare class BaseMobileTime extends KucBase {
    value: string;
    disabled: boolean;
    hour12: boolean;
    /**
     * Please consider name again and change @state to @property when publishing the function.
     */
    private _timeStep;
    private _hours;
    private _minutes;
    private _suffix;
    private _hourOptions;
    private _minuteOptions;
    private _hoursEl;
    private _minutesEl;
    constructor(props?: BaseMobileTimeProps);
    update(changedProperties: PropertyValues): void;
    render(): import("lit").TemplateResult<1>;
    updated(changedProperties: PropertyValues): void;
    private _updateInputValue;
    private _setValueToInput;
    private _handleChangeMinutes;
    private _handleChangeHours;
    private _getTimeValueString;
    private _dispatchEventTimeChange;
    private _getOptionsMinuteTemplate;
    private _getOptionsHourTemplate;
    private _getStyleTagTemplate;
}
export {};
