import { expect, fixture } from "@open-wc/testing";
import { BaseMobileDateTimeCalendar } from "../index";
describe("BaseMobileDateTimeCalendar", () => {
    describe("language", () => {
        it("should be 'en' when not assigning", async () => {
            const container = new BaseMobileDateTimeCalendar();
            const el = await fixture(container);
            const bodyWeekDayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-body__table__header");
            const footerButtonTodayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--today");
            const footerButtonNoneEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--none");
            const headerCenterEl = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center");
            expect(headerCenterEl.childElementCount).to.equal(2);
            expect(headerCenterEl.children[0].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__month")).to.equal(true);
            expect(headerCenterEl.children[1].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__year")).to.equal(true);
            expect(bodyWeekDayEl.innerText).to.equal("SUN");
            expect(footerButtonTodayEl.innerText).to.equal("Today");
            expect(footerButtonNoneEl.innerText).to.equal("None");
        });
        it("should be 'ja' when assigning 'ja' by setter", async () => {
            const container = new BaseMobileDateTimeCalendar();
            container.language = "ja";
            const el = await fixture(container);
            const bodyWeekDayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-body__table__header");
            const footerButtonTodayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--today");
            const footerButtonNoneEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--none");
            const headerCenterEl = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center");
            const yearEl = headerCenterEl.children[0];
            expect(headerCenterEl.childElementCount).to.equal(2);
            expect(headerCenterEl.children[0].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__year")).to.equal(true);
            expect(headerCenterEl.children[1].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__month")).to.equal(true);
            expect(yearEl.textContent).to.contain("年");
            expect(bodyWeekDayEl.innerText).to.equal("日");
            expect(footerButtonTodayEl.innerText).to.equal("今日");
            expect(footerButtonNoneEl.innerText).to.equal("選択を解除");
        });
        it("should be 'zh' when assigning 'zh' by setter", async () => {
            const container = new BaseMobileDateTimeCalendar();
            container.language = "zh";
            const el = await fixture(container);
            const bodyWeekDayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-body__table__header");
            const footerButtonTodayEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--today");
            const footerButtonNoneEl = el.querySelector(".kuc-base-mobile-datetime-calendar-footer__group__button--none");
            const headerCenterEl = el.querySelector(".kuc-base-mobile-datetime-calendar-header__group__center");
            const yearEl = headerCenterEl.children[0];
            expect(headerCenterEl.childElementCount).to.equal(2);
            expect(headerCenterEl.children[0].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__year")).to.equal(true);
            expect(headerCenterEl.children[1].classList.contains("kuc-base-mobile-datetime-calendar-header__group__center__month")).to.equal(true);
            expect(yearEl.textContent).to.contain("年");
            expect(bodyWeekDayEl.innerText).to.equal("周日");
            expect(footerButtonTodayEl.innerText).to.equal("今天");
            expect(footerButtonNoneEl.innerText).to.equal("清空");
        });
    });
});
