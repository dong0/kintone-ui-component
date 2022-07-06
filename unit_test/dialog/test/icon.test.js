import { elementUpdated, expect } from "@open-wc/testing";
import { Dialog } from "../index";
describe("Dialog", () => {
    describe("icon", () => {
        it('should be "" when not assigning on constructor', async () => {
            var _a;
            const container = new Dialog();
            container.open();
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.childElementCount).to.equal(0);
            expect((_a = iconEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("");
        });
        it('should be "info" when assigning by setter', async () => {
            const container = new Dialog();
            container.open();
            container.icon = "info";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.firstElementChild.classList[0]).to.equal("kuc-dialog__dialog__content__icon-info");
        });
        it('should be "success" when assigning by setter', async () => {
            const container = new Dialog();
            container.open();
            container.icon = "success";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.firstElementChild.classList[0]).to.equal("kuc-dialog__dialog__content__icon-success");
        });
        it('should be "error" when assigning by setter', async () => {
            const container = new Dialog();
            container.open();
            container.icon = "error";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.firstElementChild.classList[0]).to.equal("kuc-dialog__dialog__content__icon-error");
        });
        it('should be "warning" when assigning by setter', async () => {
            const container = new Dialog();
            container.open();
            container.icon = "warning";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.firstElementChild.classList[0]).to.equal("kuc-dialog__dialog__content__icon-warning");
        });
        it('should be "question" when assigning by setter', async () => {
            const container = new Dialog();
            container.open();
            container.icon = "question";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.firstElementChild.classList[0]).to.equal("kuc-dialog__dialog__content__icon-question");
        });
        it('should be "" when assigning invalid value by setter', async () => {
            var _a;
            const container = new Dialog();
            container.open();
            // @ts-ignore
            container.icon = "hoge";
            await elementUpdated(container);
            const iconEl = container.querySelector(".kuc-dialog__dialog__content__icon");
            expect(iconEl.childElementCount).to.equal(0);
            expect((_a = iconEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("");
        });
    });
});
