import { expect, fixture, elementUpdated } from "@open-wc/testing";
import { MobileTimePicker } from "..";

describe("MobileTimePicker", () => {
  describe("value", () => {
    it("should be empty string when not assigning", async () => {
      const container = new MobileTimePicker();
      const el = await fixture(container);
      const selectHourEl = el.querySelector(
        ".kuc-base-mobile-time__group__hours"
      ) as HTMLSelectElement;
      const selectMinuteEl = el.querySelector(
        ".kuc-base-mobile-time__group__minutes"
      ) as HTMLSelectElement;

      expect(selectHourEl.value).to.be.equal("");
      expect(selectMinuteEl.value).to.be.equal("");
    });

    it('should be "13:15" when assigned "13:15" by setter', async () => {
      const container = new MobileTimePicker({ value: "13:15" });
      const el = await fixture(container);
      const selectHourEl = el.querySelector(
        ".kuc-base-mobile-time__group__hours"
      ) as HTMLSelectElement;
      const selectMinuteEl = el.querySelector(
        ".kuc-base-mobile-time__group__minutes"
      ) as HTMLSelectElement;

      expect(selectHourEl.value).to.be.equal("13");
      expect(selectMinuteEl.value).to.be.equal("15");
    });

    it('should be "13:15" when changed to "13:15" in constructor', async () => {
      const container = new MobileTimePicker({ value: "11:15" });
      const el = await fixture(container);
      container.setAttribute("value", "13:15");
      await elementUpdated(container);
      el.setAttribute("value", "13:15");
      const selectHourEl = el.querySelector(
        ".kuc-base-mobile-time__group__hours"
      ) as HTMLSelectElement;
      const selectMinuteEl = el.querySelector(
        ".kuc-base-mobile-time__group__minutes"
      ) as HTMLSelectElement;

      expect(selectHourEl.value).to.be.equal("13");
      expect(selectMinuteEl.value).to.be.equal("15");
    });

    it("should throw error when set invalid value", async () => {
      const container = new MobileTimePicker({ value: "12:234" });
      try {
        const el = await fixture(container);
      } catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).to.be.equal("Format is not valid.");
      }
    });
  });
});
