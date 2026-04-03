import { describe, expect, it } from "vitest";
import { curb65Engine } from "@/features/clinical-calculators/engines/engine";

describe("curb65Engine", () => {
  it("pontua 1 apenas pela idade", () => {
    const parsed = curb65Engine.parse({
      confusion: "no",
      urea: 5,
      respiratoryRate: 18,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 70,
      age: 70,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(curb65Engine.compute(parsed.data).headline.value).toBe("1");
  });

  it("pontua 3 com confusão, ureia alta e FR 34", () => {
    const parsed = curb65Engine.parse({
      confusion: "yes",
      urea: 8.5,
      respiratoryRate: 34,
      systolicBloodPressure: 120,
      diastolicBloodPressure: 70,
      age: 40,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(curb65Engine.compute(parsed.data).headline.value).toBe("3");
  });

  it("zera quando todos os critérios estão ausentes", () => {
    const parsed = curb65Engine.parse({
      confusion: "no",
      urea: 4,
      respiratoryRate: 16,
      systolicBloodPressure: 122,
      diastolicBloodPressure: 80,
      age: 35,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(curb65Engine.compute(parsed.data).headline.value).toBe("0");
  });

  it("pontua por PAS baixa", () => {
    const parsed = curb65Engine.parse({
      confusion: "no",
      urea: 4,
      respiratoryRate: 16,
      systolicBloodPressure: 85,
      diastolicBloodPressure: 70,
      age: 35,
    });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    expect(curb65Engine.compute(parsed.data).headline.value).toBe("1");
  });
});
