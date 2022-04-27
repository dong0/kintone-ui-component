import { expect, fixture } from "@open-wc/testing";
import { BaseDateTimeCalendar } from "../index";
describe("BaseDateTimeCalendar", () => {
    describe("value", () => {
        it("should be selected when updating value prop", async () => {
            const container = new BaseDateTimeCalendar();
            container.value = "2021-08-22";
            const el = await fixture(container);
            const selectedEl = el.querySelector(".kuc-base-datetime-calendar-body__table__date__button[aria-current=true]");
            expect(selectedEl.getAttribute("data-date")).to.equal("2021-08-22");
        });
        it("should be first day when updating value prop with empty string", async () => {
            var _a;
            const container = new BaseDateTimeCalendar();
            container.value = "";
            const el = await fixture(container);
            const selectedEl = el.querySelector(".kuc-base-datetime-calendar-body__table__date__button[aria-current=true]");
            expect((_a = selectedEl.dataset.date) === null || _a === void 0 ? void 0 : _a.slice(8)).to.equal("01");
        });
    });
});