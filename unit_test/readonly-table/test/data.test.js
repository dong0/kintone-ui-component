import { expect, fixture } from "@open-wc/testing";
import { ReadOnlyTable } from "../index";
const data = [
    ["Orange", "Ehime"],
    ["Apple", "Aomori"],
];
const replacedData = [
    ["Orange", "Ehime"],
    ["Banana", "Tokyo"],
];
describe("ReadOnlyTable", () => {
    describe("data", () => {
        it("should be empty body when not assigned on constructor", async () => {
            const container = new ReadOnlyTable();
            const el = await fixture(container);
            const rowsEl = el.querySelectorAll(".kuc-readonly-table__table__body__row");
            expect(rowsEl.length).to.equal(0);
        });
        it("should add rows when assigned on constructor", async () => {
            var _a, _b, _c, _d;
            const container = new ReadOnlyTable({ data });
            const el = await fixture(container);
            const rowsEl = el.querySelectorAll(".kuc-readonly-table__table__body__row");
            expect(rowsEl.length).to.equal(2);
            expect((_a = rowsEl[0].children[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal(data[0][0]);
            expect((_b = rowsEl[0].children[1].textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal(data[0][1]);
            expect((_c = rowsEl[1].children[0].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal(data[1][0]);
            expect((_d = rowsEl[1].children[1].textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(data[1][1]);
        });
        it("should add rows when assigned by setter", async () => {
            var _a, _b, _c, _d;
            const container = new ReadOnlyTable();
            container.data = data;
            const el = await fixture(container);
            const rowsEl = el.querySelectorAll(".kuc-readonly-table__table__body__row");
            expect(rowsEl.length).to.equal(2);
            expect((_a = rowsEl[0].children[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal(data[0][0]);
            expect((_b = rowsEl[0].children[1].textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal(data[0][1]);
            expect((_c = rowsEl[1].children[0].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal(data[1][0]);
            expect((_d = rowsEl[1].children[1].textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(data[1][1]);
        });
        it("should be updated rows when replaced by setter", async () => {
            var _a, _b, _c, _d;
            const container = new ReadOnlyTable({ data });
            container.data = replacedData;
            const el = await fixture(container);
            const rowsEl = el.querySelectorAll(".kuc-readonly-table__table__body__row");
            expect(rowsEl.length).to.equal(2);
            expect((_a = rowsEl[0].children[0].textContent) === null || _a === void 0 ? void 0 : _a.trim()).to.equal(replacedData[0][0]);
            expect((_b = rowsEl[0].children[1].textContent) === null || _b === void 0 ? void 0 : _b.trim()).to.equal(replacedData[0][1]);
            expect((_c = rowsEl[1].children[0].textContent) === null || _c === void 0 ? void 0 : _c.trim()).to.equal(replacedData[1][0]);
            expect((_d = rowsEl[1].children[1].textContent) === null || _d === void 0 ? void 0 : _d.trim()).to.equal(replacedData[1][1]);
        });
        it("should throw error when set wrong type on constructor", () => {
            expect(() => {
                // @ts-expect-error
                const container = new ReadOnlyTable({ data: null });
            }).to.throw(Error, "'data' property is invalid");
        });
        it("should throw error when set null array on constructor", () => {
            expect(() => {
                // @ts-expect-error
                const container = new ReadOnlyTable({ data: [null] });
            }).to.throw(Error, "'data' property is invalid");
        });
        it("should be throw error when assigned null by setter", (done) => {
            const handleError = (event) => {
                const errorMsg = event.reason.message;
                expect(errorMsg).to.equal("'data' property is invalid");
                window.removeEventListener("unhandledrejection", handleError);
                done();
            };
            window.addEventListener("unhandledrejection", handleError);
            const container = new ReadOnlyTable();
            // @ts-expect-error
            container.data = null;
            fixture(container);
        });
    });
});
