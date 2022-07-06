import { elementUpdated, expect } from "@open-wc/testing";
import { Dialog } from "../index";
describe("Dialog", () => {
    describe("footer", () => {
        it("should be empty when not assgined on constructor", async () => {
            var _a;
            const container = new Dialog();
            container.open();
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.childElementCount).to.equal(0);
            expect((_a = footerEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("");
        });
        it('should be "footer" when assgined string on constructor', async () => {
            var _a;
            const container = new Dialog({ footer: "footer" });
            container.open();
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect((_a = footerEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("footer");
        });
        it("should be HTMLElement when assgined HTMLElement on constructor", async () => {
            const htmlElement = document.createElement("div");
            htmlElement.className = "kuc-element-class";
            const container = new Dialog({ footer: htmlElement });
            container.open();
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be HTMLElement when assgined html string on constructor", async () => {
            const htmlString = `<div class="kuc-element-class">footer</div>`;
            const container = new Dialog({ footer: htmlString });
            container.open();
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it('should be "footer" when set string by setter', async () => {
            var _a;
            const container = new Dialog();
            container.open();
            container.footer = "footer";
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect((_a = footerEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("footer");
        });
        it("should be HTMLElement when set HTMLElement by setter", async () => {
            const htmlElement = document.createElement("div");
            htmlElement.className = "kuc-element-class";
            const container = new Dialog();
            container.open();
            container.footer = htmlElement;
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be HTMLElement when set html string by setter", async () => {
            const htmlString = `<div class="kuc-element-class">footer</div>`;
            const container = new Dialog();
            container.open();
            container.footer = htmlString;
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be repacled to 'replaced footer' when updated by setter", async () => {
            const container = new Dialog({ footer: "footer" });
            container.open();
            container.footer = "replaced footer";
            await elementUpdated(container);
            const footerEl = container.querySelector(".kuc-dialog__dialog__footer");
            expect(footerEl.textContent.trim()).to.equal("replaced footer");
        });
    });
});
