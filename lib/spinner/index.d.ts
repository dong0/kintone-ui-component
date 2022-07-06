import { KucBase } from "../base/kuc-base";
declare type SpinnerProps = {
    text?: string;
};
export declare class Spinner extends KucBase {
    private _body;
    text: string;
    constructor(props?: SpinnerProps);
    private _getSpinnerSvgTemplate;
    open(): void;
    close(): void;
    render(): import("lit").TemplateResult<1>;
    private _getStyleTagTemplate;
}
export {};
