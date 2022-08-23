import { expect, fixture } from "@open-wc/testing";
import { MobileTextArea } from "../index";
describe("MobileTextArea", () => {
    describe("inputEvent", () => {
        it("should triggered when inputting", async () => {
            let triggeredEvent = null;
            const container = new MobileTextArea({ value: "Orange" });
            container.addEventListener("input", (event) => {
                triggeredEvent = event;
            });
            const el = await fixture(container);
            const textAreaEl = el.querySelector(".kuc-mobile-textarea__form__textarea");
            textAreaEl.value = "OrangeApple";
            textAreaEl.dispatchEvent(new InputEvent("input", {
                data: "Apple",
            }));
            expect(triggeredEvent.type).to.equal("input");
            expect(triggeredEvent.detail.value).to.equal("OrangeApple");
            expect(triggeredEvent.detail.data).to.equal("Apple");
        });
    });
});
