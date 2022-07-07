declare type Item = {
    label?: string;
    value?: string;
};
export declare function validateProps<Type>(props: Type): {};
export declare function validateDateValue(value: string | undefined): boolean;
export declare function validateTimeValue(value: string): boolean;
export declare function validateTimeStepNumber(timeStep: number): boolean;
export declare function validateTimeStep(timeStep: number, max: string, min: string): boolean;
export declare function isValidDate(date: string): boolean;
export declare function validateItems(value: Item[]): boolean;
export declare function validateValueArray(value: string[]): boolean;
export declare function validateValueString(value: string): boolean;
export declare function validateSelectedIndexArray(selectedIndex: number[]): boolean;
export declare function validateSelectedIndexNumber(selectedIndex: number): boolean;
export declare function validateDateTimeValue(date: string, time: string): boolean;
export declare function throwErrorAfterUpdateComplete(_this: any, message: string): Promise<void>;
export {};
