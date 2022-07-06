import { expect, fixture } from "@open-wc/testing";
import { MobileText } from "../index";
describe("MobileText", () => {
    describe("changeEvent", () => {
        it("should triggered when changed the input element", async () => {
            let triggeredEvent = null;
            const container = new MobileText({ value: "Orange" });
            container.addEventListener("change", (event) => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const inputEl = el.querySelector(".kuc-mobile-text__input-form__input");
            inputEl.value = "Apple";
            inputEl.dispatchEvent(new CustomEvent("change"));
            expect(triggeredEvent.type).to.equal("change");
            expect(triggeredEvent.detail.value).to.equal("Apple");
            expect(triggeredEvent.detail.oldValue).to.equal("Orange");
        });
    });
});
