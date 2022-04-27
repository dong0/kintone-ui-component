import { PropertyValues } from "lit";
import { KucBase } from "../../../kuc-base";
export declare class BaseDateTimeCalendarFooter extends KucBase {
    language: string;
    private _locale;
    update(changedProperties: PropertyValues): void;
    private _handleClickCalendarFooterButtonNone;
    private _handleClickCalendarFooterButtonToday;
    private _handleKeyDownCalendarFooterButtonNone;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}