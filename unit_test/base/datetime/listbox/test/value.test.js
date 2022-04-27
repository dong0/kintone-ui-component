import { expect, fixture } from "@open-wc/testing";
import { BaseDateTimeListBox } from "../index";
describe("BaseDateTimeListBox", () => {
    describe("value", () => {
        it("should be update by setter", async () => {
            var _a;
            const initItems = [
                { value: "0", label: "JANUARY" },
                { value: "1", label: "FEBRUARY" }
            ];
            const container = new BaseDateTimeListBox();
            container.items = initItems;
            container.value = "1";
            const el = await fixture(container);
            const selectedItemEl = el.querySelector('.kuc-base-datetime-listbox__listbox__item[aria-selected="true"]');
            expect((_a = selectedItemEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("FEBRUARY");
        });
    });
});
