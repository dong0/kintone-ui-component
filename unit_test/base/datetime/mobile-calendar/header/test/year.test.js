import { expect, fixture, elementUpdated } from "@open-wc/testing";
import "../index";
describe("BaseMobileDateTimeCalendarHeader", () => {
    describe("year", () => {
        it("should be 2021 when not assigning", async () => {
            const container = document.createElement("kuc-base-mobile-datetime-calendar-header");
            const el = await fixture(container);
            const yearToggle = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center__year__select");
            yearToggle.click();
            await elementUpdated(container);
            expect(yearToggle.value).to.equal("2021");
            expect(yearToggle.options.length).to.equal(201);
        });
        it("should be 2022 when assigning 2022 by setter", async () => {
            const container = document.createElement("kuc-base-mobile-datetime-calendar-header");
            container.setAttribute("year", "2022");
            const el = await fixture(container);
            const yearToggle = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center__year__select");
            expect(yearToggle.value).to.equal("2022");
        });
        it("should be 99 when assigning 99 by setter", async () => {
            const container = document.createElement("kuc-base-mobile-datetime-calendar-header");
            container.setAttribute("year", "99");
            const el = await fixture(container);
            const yearToggle = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center__year__select");
            expect(yearToggle.value).to.equal("99");
        });
        it("should be 9999 when assigning 99999 by setter", async () => {
            const container = document.createElement("kuc-base-mobile-datetime-calendar-header");
            container.setAttribute("year", "99999");
            const el = await fixture(container);
            const yearToggle = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center__year__select");
            expect(yearToggle.value).to.equal("9999");
        });
        it("should be 2021 when assigning invalid value by setter", async () => {
            const container = document.createElement("kuc-base-mobile-datetime-calendar-header");
            container.setAttribute("year", "123.33");
            const el = await fixture(container);
            const yearToggle = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center__year__select");
            expect(yearToggle.value).to.equal("2022");
        });
    });
});
