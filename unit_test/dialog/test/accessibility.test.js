import { fixture, triggerFocusFor, expect } from "@open-wc/testing";
import { Dialog } from "../index";
describe("Dialog", () => {
    describe("accessibility", () => {
        it("can be focused first dummy", async () => {
            var _a;
            const container = new Dialog();
            container.open();
            const el = await fixture(container);
            const itemsEl = el.querySelector(".kuc-dialog__first-dummy");
            await triggerFocusFor(itemsEl);
            expect((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.className).to.equal("kuc-dialog__dialog__header__close-button");
        });
        it("can be focused last dummy", async () => {
            var _a;
            const container = new Dialog();
            container.open();
            const el = await fixture(container);
            const itemsEl = el.querySelector(".kuc-dialog__last-dummy");
            await triggerFocusFor(itemsEl);
            expect((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.className).to.equal("kuc-dialog__dialog");
        });
        it("should close Dialog when pressing Escape key", async () => {
            const container = new Dialog();
            container.open();
            const el = await fixture(container);
            const toggleEl = el.querySelector(".kuc-dialog__dialog");
            toggleEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
            expect(container.hasAttribute("opened")).to.equal(false);
        });
    });
});
