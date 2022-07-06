import { elementUpdated, expect } from "@open-wc/testing";
import { Dialog } from "../index";
describe("Dialog", () => {
    describe("content", () => {
        it("should be empty when not assgined on constructor", async () => {
            var _a;
            const container = new Dialog();
            container.open();
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.childElementCount).to.equal(0);
            expect((_a = contentEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("");
        });
        it('should be "content" when assgined string on constructor', async () => {
            var _a;
            const container = new Dialog({ content: "content" });
            container.open();
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect((_a = contentEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("content");
        });
        it("should be HTMLElement when assgined HTMLElement on constructor", async () => {
            const htmlElement = document.createElement("div");
            htmlElement.className = "kuc-element-class";
            const container = new Dialog({ content: htmlElement });
            container.open();
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be HTMLElement when assgined html string on constructor", async () => {
            const htmlString = `<div class="kuc-element-class">content</div>`;
            const container = new Dialog({ content: htmlString });
            container.open();
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it('should be "content" when set string by setter', async () => {
            var _a;
            const container = new Dialog();
            container.open();
            container.content = "content";
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect((_a = contentEl.textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal("content");
        });
        it("should be HTMLElement when set HTMLElement by setter", async () => {
            const htmlElement = document.createElement("div");
            htmlElement.className = "kuc-element-class";
            const container = new Dialog();
            container.open();
            container.content = htmlElement;
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be HTMLElement when set html string by setter", async () => {
            const htmlString = `<div class="kuc-element-class">content</div>`;
            const container = new Dialog();
            container.open();
            container.content = htmlString;
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.firstElementChild.className).to.equal("kuc-element-class");
        });
        it("should be repacled to 'replaced content' when updated by setter", async () => {
            const container = new Dialog({ content: "content" });
            container.open();
            container.content = "replaced content";
            await elementUpdated(container);
            const contentEl = container.querySelector(".kuc-dialog__dialog__content__content");
            expect(contentEl.textContent.trim()).to.equal("replaced content");
        });
    });
});
