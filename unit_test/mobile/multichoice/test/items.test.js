import { expect, fixture } from "@open-wc/testing";
import { MobileMultiChoice } from "../index";
describe("MobileMultiChoice", () => {
    describe("items", () => {
        const initItems = [
            { label: "-----", value: "-----" },
            { label: "Orange", value: "orange" },
            { label: "Apple", value: "apple" },
        ];
        const duplicateItems = [
            { label: "Orange", value: "orange" },
            { label: "Apple", value: "orange" },
        ];
        const itemsForReplace = [
            { label: "Orange", value: "orange" },
            { label: "Apple", value: "apple" },
        ];
        const initItemsWithoutLabel = [
            { value: "-----" },
            { value: "orange" },
            { value: "apple" },
        ];
        const initItemsWithoutValue = [{ label: "-----" }];
        const expectedLabels = ["-----", "Orange", "Apple"];
        const expectedValues = ["-----", "orange", "apple"];
        it("does not exists on element when initializing without props option", async () => {
            const container = new MobileMultiChoice();
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(0);
        });
        it("exists on element when initializing with props option", async () => {
            var _a, _b, _c, _d, _e, _f;
            const container = new MobileMultiChoice({ items: initItems });
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(3);
            expect((_a = itemsEl[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.have.equal(expectedLabels[0]);
            expect((_b = itemsEl[0].getAttribute("value")) === null || _b === void 0 ? void 0 : _b.trim()).to.have.equal(expectedValues[0]);
            expect((_c = itemsEl[1].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.have.equal(expectedLabels[1]);
            expect((_d = itemsEl[1].getAttribute("value")) === null || _d === void 0 ? void 0 : _d.trim()).to.have.equal(expectedValues[1]);
            expect((_e = itemsEl[2].textContent) === null || _e === void 0 ? void 0 : _e.trim()).to.have.equal(expectedLabels[2]);
            expect((_f = itemsEl[2].getAttribute("value")) === null || _f === void 0 ? void 0 : _f.trim()).to.have.equal(expectedValues[2]);
            expect(container.items).to.be.equal(initItems);
        });
        it("exists on element and set item label the same as value when initializing with props option without label", async () => {
            var _a, _b, _c, _d, _e, _f;
            const container = new MobileMultiChoice({ items: initItemsWithoutLabel });
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(3);
            expect((_a = itemsEl[0].getAttribute("value")) === null || _a === void 0 ? void 0 : _a.trim()).to.have.equal(expectedValues[0]);
            expect((_b = itemsEl[0].textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.have.equal(expectedValues[0]);
            expect((_c = itemsEl[1].getAttribute("value")) === null || _c === void 0 ? void 0 : _c.trim()).to.have.equal(expectedValues[1]);
            expect((_d = itemsEl[1].textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.have.equal(expectedValues[1]);
            expect((_e = itemsEl[2].getAttribute("value")) === null || _e === void 0 ? void 0 : _e.trim()).to.have.equal(expectedValues[2]);
            expect((_f = itemsEl[2].textContent) === null || _f === void 0 ? void 0 : _f.trim()).to.have.equal(expectedValues[2]);
        });
        it('exists on element and set item value "" when initializing with props option without value', async () => {
            var _a;
            const container = new MobileMultiChoice({ items: initItemsWithoutValue });
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(1);
            expect((_a = itemsEl[0].getAttribute("value")) === null || _a === void 0 ? void 0 : _a.trim()).to.have.equal("");
        });
        it("exists on element when changing by setter", async () => {
            var _a, _b, _c, _d, _e, _f;
            const container = new MobileMultiChoice();
            container.items = initItems;
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(3);
            expect((_a = itemsEl[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.have.equal(expectedLabels[0]);
            expect((_b = itemsEl[0].getAttribute("value")) === null || _b === void 0 ? void 0 : _b.trim()).to.have.equal(expectedValues[0]);
            expect((_c = itemsEl[1].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.have.equal(expectedLabels[1]);
            expect((_d = itemsEl[1].getAttribute("value")) === null || _d === void 0 ? void 0 : _d.trim()).to.have.equal(expectedValues[1]);
            expect((_e = itemsEl[2].textContent) === null || _e === void 0 ? void 0 : _e.trim()).to.have.equal(expectedLabels[2]);
            expect((_f = itemsEl[2].getAttribute("value")) === null || _f === void 0 ? void 0 : _f.trim()).to.have.equal(expectedValues[2]);
            expect(container.items).to.be.equal(initItems);
        });
        it("items prop replace successfully", async () => {
            var _a, _b, _c, _d;
            const container = new MobileMultiChoice({
                items: initItems,
            });
            container.items = itemsForReplace;
            const el = await fixture(container);
            const itemsEl = el.getElementsByTagName("option");
            expect(itemsEl.length).to.be.equal(2);
            expect((_a = itemsEl[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.have.equal(expectedLabels[1]);
            expect((_b = itemsEl[0].getAttribute("value")) === null || _b === void 0 ? void 0 : _b.trim()).to.have.equal(itemsForReplace[0].value);
            expect((_c = itemsEl[1].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.have.equal(expectedLabels[2]);
            expect((_d = itemsEl[1].getAttribute("value")) === null || _d === void 0 ? void 0 : _d.trim()).to.have.equal(itemsForReplace[1].value);
            expect(container.items).to.be.equal(itemsForReplace);
        });
        it("show error when initializing with props is null", (done) => {
            const handleError = (event) => {
                const errorMsg = event.reason.message;
                expect(errorMsg).to.equal("'items' property is not array.");
                window.removeEventListener("unhandledrejection", handleError);
                done();
            };
            window.addEventListener("unhandledrejection", handleError);
            // @ts-ignore
            const container = new MobileMultiChoice({ items: "12,12" });
            fixture(container);
        });
        it("show error when when changing by setter to null", (done) => {
            const handleError = (event) => {
                const errorMsg = event.reason.message;
                expect(errorMsg).to.equal("'items' property is not array.");
                window.removeEventListener("unhandledrejection", handleError);
                done();
            };
            window.addEventListener("unhandledrejection", handleError);
            // @ts-ignore
            const container = new MobileMultiChoice();
            container.items = null;
            fixture(container);
        });
    });
});
