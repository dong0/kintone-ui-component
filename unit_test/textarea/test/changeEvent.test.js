import { expect, fixture } from "@open-wc/testing";
import { TextArea } from "../index";
describe("TextArea", () => {
    describe("changeEvent", () => {
        it("should triggered when changed the input element", async () => {
            let triggeredEvent = null;
            const container = new TextArea({ value: "Orange" });
            container.addEventListener("change", (event) => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-textarea__group__textarea");
            inputEl.value = "Apple";
            inputEl.dispatchEvent(new CustomEvent("change"));
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("Apple");
            expect(triggeredEvent.detail.oldValue).to.equal("Orange");
        });
    });
});
