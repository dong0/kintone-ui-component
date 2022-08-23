import { expect, fixture } from "@open-wc/testing";
import { BaseDateTimeListBox } from "../index";
describe("BaseDateTimeListBox", () => {
    describe("items", () => {
        it("should be update by setter", async () => {
            var _a, _b, _c;
            const initItems = [
                { value: "0", label: "JANUARY" },
                { value: "1", label: "FEBRUARY" },
                { value: "2", label: "MARCH" },
            ];
            const container = new BaseDateTimeListBox();
            container.items = initItems;
            const el = await fixture(container);
            const itemsEl = el.querySelectorAll(".kuc-base-datetime-listbox__listbox__item");
            expect(itemsEl.length).to.equal(3);
            expect(itemsEl[0].getAttribute("value")).to.equal("0");
            expect((_a = itemsEl[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("JANUARY");
            expect(itemsEl[1].getAttribute("value")).to.equal("1");
            expect((_b = itemsEl[1].textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal("FEBRUARY");
            expect(itemsEl[2].getAttribute("value")).to.equal("2");
            expect((_c = itemsEl[2].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal("MARCH");
        });
    });
});
