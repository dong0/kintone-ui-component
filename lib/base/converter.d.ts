export declare const visiblePropConverter: {
    fromAttribute(value: string | null): boolean;
    toAttribute(value: boolean): "" | null;
};
export declare const unsafeHTMLConverter: (element: string | HTMLElement) => import("lit/directive").DirectiveResult<typeof import("lit/directives/unsafe-html.js").UnsafeHTMLDirective>;
export declare const dateValueConverter: (date: string | undefined) => string;
export declare const timeValueConverter: (time: string) => string;
