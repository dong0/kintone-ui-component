import Locale from '../../../react/DateTime/components/localizationData/locale-dto';
import Control, { ControlProps } from '../../Control';
import '../../../css/DropdownCalendar.css';
declare type CalendarProps = ControlProps & {
    date?: Date | null;
    locale: Locale;
    onDateClick?: (date: Date | null) => void;
    onClickOutside?: (e: FocusEvent) => void;
};
declare class Calendar extends Control {
    protected _props: CalendarProps;
    protected element: HTMLElement;
    private _calendarHeader;
    private _monthYearContainer;
    private _previousButton;
    private _nextButton;
    private _displayDate;
    private _displayMonth;
    private _displayYear;
    private _monthYearDropdownsRow;
    private _displayMonthDropdown;
    private _displayYearDropdown;
    private _daysContainer;
    private _quickSelectionsContainer;
    private _todayButton;
    private _noneButton;
    private _weekDayLabelsSpans;
    private _displayDaysSpans;
    constructor(params: CalendarProps);
    _renderCalendarContainer(): void;
    _renderCalendarHeader(): void;
    _renderMonthYearContainer(): void;
    _renderPreviousButton(): void;
    _scrollToSeletedOptions: () => void;
    _renderDisplayMonthDropdown(): void;
    _onChangeCreateYearDropdown: (value: any) => void;
    _renderDisplayYearDropdown(): void;
    _renderNextButton(): void;
    _renderDaysContainer(): void;
    _renderQuickSelectionsContainer(): void;
    _renderTodayButton(): void;
    _renderNoneButton(): void;
    _renderWeekDaysLabels(): void;
    _renderDaysLabels(): void;
    render(): HTMLElement;
    _setOnclickForDaysLabels(daySpan: HTMLElement): void;
    setValue(date: Date | undefined | null): void;
    getValue(): Date | null | undefined;
    setLocale(locale: Locale): void;
    rerender(changedAttr: string[], options?: object): void;
    getElement(): HTMLElement;
}
export default Calendar;
