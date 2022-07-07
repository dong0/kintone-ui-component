import { expect, fixture, triggerBlurFor, triggerFocusFor, } from "@open-wc/testing";
import { RadioButton } from "../index";
const initItems = [
    { label: "Item 1", value: "item-1" },
    { label: "Item 2", value: "item-2" },
    { label: "Item 3", value: "item-3" },
];
describe("RadioButton", () => {
    describe("accessibility", () => {
        it("can be focused and blured", async () => {
            var _a, _b;
            const container = new RadioButton({
                items: initItems,
                value: initItems[1].value,
            });
            const el = await fixture(container);
            const itemsEl = el.querySelector(".kuc-radio-button__group__select-menu__item__input");
            await triggerFocusFor(itemsEl);
            expect((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("kuc-radio-button__group__select-menu__item__input")).to.equal(true);
            await triggerBlurFor(itemsEl);
            expect((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains("kuc-radio-button__group__select-menu__item__input")).to.equal(false);
        });
    });
});
