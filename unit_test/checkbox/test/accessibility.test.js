import { triggerFocusFor, triggerBlurFor, expect, fixture } from "@open-wc/testing";
import { Checkbox } from "../index";
const initItems = [
    { label: "-----", value: "-----" },
    { label: "Orange", value: "orange" },
    { label: "Apple", value: "apple" }
];
describe("Checkbox", () => {
    describe("accessibility", () => {
        it("can be focused and blured", async () => {
            var _a, _b;
            const container = new Checkbox({
                items: initItems,
                value: [initItems[1].value]
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-checkbox__group__select-menu__item__input");
            await triggerFocusFor(inputEl);
            expect((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.className).to.equal("kuc-checkbox__group__select-menu__item__input");
            triggerBlurFor(inputEl);
            expect((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.className).to.not.equal("kuc-checkbox__group__select-menu__item__input");
        });
    });
});
