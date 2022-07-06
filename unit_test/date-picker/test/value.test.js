import { expect, fixture, elementUpdated } from "@open-wc/testing";
import { DatePicker } from "../index";
import { getTodayStringByLocale } from "../../base/datetime/utils";
describe("DatePicker", () => {
    describe("value", () => {
        it("should be empty string when not assigning", async () => {
            const container = new DatePicker();
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-base-date__input");
            expect(inputEl.value).to.be.equal("");
        });
        it('should be "12/12/2021" when assigning on constructor', async () => {
            const container = new DatePicker({ value: "2021-12-12" });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-base-date__input");
            expect(inputEl.value).to.be.equal("12/12/2021");
        });
        it('should be "12/13/2021" when changed to "12/13/2021" by setter', async () => {
            const container = new DatePicker({ value: "2021-12-12" });
            container.value = "2021-12-13";
            const el = await fixture(container);
            el.setAttribute("value", "13:15");
            const inputEl = el.querySelector(".kuc-base-date__input");
            expect(inputEl.value).to.be.equal("12/13/2021");
        });
        it("should throw error when set invalid value", async () => {
            const container = new DatePicker({ value: "12,12" });
            try {
                const el = await fixture(container);
            }
            catch (error) {
                let errorMessage = "";
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                expect(errorMessage).to.be.equal("Format is not valid.");
            }
        });
        it("should be today value when press today button on calendar", async () => {
            const container = new DatePicker({ value: "2021-12-12", language: "ja" });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            inputDateEl.click();
            await elementUpdated(container);
            await elementUpdated(el);
            const todayBtnEl = el.querySelector(".kuc-base-datetime-calendar-footer__group__button--today");
            todayBtnEl.click();
            await elementUpdated(el);
            const todayStr = getTodayStringByLocale();
            expect(inputDateEl.value).to.be.equal(todayStr);
        });
        it("should be empty value and UI when set '' on constructor", async () => {
            const container = new DatePicker({ value: "", language: "ja" });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            expect(inputDateEl.value).to.be.equal("");
            expect(container.value).to.be.equal("");
        });
        it("should be empty value and UI when set '' by setter", async () => {
            const container = new DatePicker({ value: "2022-12-12", language: "ja" });
            const el = await fixture(container);
            container.value = "";
            await elementUpdated(el);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            expect(inputDateEl.value).to.be.equal("");
            expect(container.value).to.be.equal("");
        });
        it("should be empty value and UI when set undefined on constructor", async () => {
            const container = new DatePicker({ value: undefined, language: "ja" });
            const el = await fixture(container);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            expect(inputDateEl.value).to.be.equal("");
            expect(container.value).to.be.equal("");
        });
        it("should be undefined value and empty on UI when set undefined on setter", async () => {
            const container = new DatePicker({ value: "2022-12-12", language: "ja" });
            const el = await fixture(container);
            container.value = undefined;
            await elementUpdated(el);
            const inputDateEl = el.querySelector(".kuc-base-date__input");
            expect(inputDateEl.value).to.be.equal("");
            expect(container.value).to.be.equal(undefined);
        });
    });
});
