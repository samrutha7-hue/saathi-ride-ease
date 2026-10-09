import { describe, expect, it } from "vitest";
import { createBooking, estimateFare } from "../lib/saathi";

describe("SaathiGo rules", () => {
  it("sample fare is between ₹80 and ₹190", () => {
    for (const d of ["City Care Hospital, MG Road", "Market", "x y z"]) {
      const f = estimateFare(d);
      expect(f).toBeGreaterThanOrEqual(80);
      expect(f).toBeLessThanOrEqual(190);
    }
  });
  it("booking IDs are clearly marked as demo", () => {
    expect(createBooking("A home", "B place").id).toMatch(/^SG-DEMO-\d{5}$/);
  });
});
