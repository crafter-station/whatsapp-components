import { describe, expect, test } from "bun:test";
import { formatMessageTime, isSameDay } from "../registry/whatsapp/format-time";

describe("formatMessageTime", () => {
  test("formats afternoon on a 12-hour clock", () => {
    expect(formatMessageTime(new Date(2025, 0, 6, 20, 2))).toBe("8:02 p.m.");
  });

  test("formats morning on a 12-hour clock", () => {
    expect(formatMessageTime(new Date(2025, 0, 6, 9, 5))).toBe("9:05 a.m.");
  });

  test("renders midnight as 12 a.m., not 0", () => {
    expect(formatMessageTime(new Date(2025, 0, 6, 0, 0))).toBe("12:00 a.m.");
  });

  test("renders noon as 12 p.m., not 0", () => {
    expect(formatMessageTime(new Date(2025, 0, 6, 12, 0))).toBe("12:00 p.m.");
  });

  test("pads both fields on a 24-hour clock", () => {
    expect(
      formatMessageTime(new Date(2025, 0, 6, 7, 4), { hour12: false }),
    ).toBe("07:04");
  });

  test("accepts custom meridiem labels", () => {
    expect(
      formatMessageTime(new Date(2025, 0, 6, 20, 2), {
        meridiem: ["AM", "PM"],
      }),
    ).toBe("8:02 PM");
  });
});

describe("isSameDay", () => {
  test("true within one local day", () => {
    expect(
      isSameDay(new Date(2025, 0, 6, 0, 1), new Date(2025, 0, 6, 23, 59)),
    ).toBe(true);
  });

  test("false across midnight", () => {
    expect(
      isSameDay(new Date(2025, 0, 6, 23, 59), new Date(2025, 0, 7, 0, 1)),
    ).toBe(false);
  });

  test("false for the same day-of-month in another month", () => {
    expect(isSameDay(new Date(2025, 0, 6), new Date(2025, 1, 6))).toBe(false);
  });
});
