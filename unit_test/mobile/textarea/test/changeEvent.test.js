import { expect, fixture } from "@open-wc/testing";
import { MobileTextArea } from "../index";
describe("MobileTextArea", () => {
    describe("changeEvent", () => {
        it("should triggered when changed the input element", async () => {
            let triggeredEvent = null;
            const container = new MobileTextArea({ value: "Orange" });
            container.addEventListener("change", (event) => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-textarea__form__textarea");
            inputEl.value = "Apple";
            inputEl.dispatchEvent(new CustomEvent("change"));
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("Apple");
            expect(triggeredEvent.detail.oldValue).to.equal("Orange");
        });
    });
});
