import { describe, expect, test } from "bun:test";
import {
  calendarDaysAgo,
  formatDateDivider,
  formatMessageTime,
  isSameDay,
} from "../registry/whatsapp/format-time";

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

describe("calendarDaysAgo", () => {
  test("counts calendar days, not elapsed hours", () => {
    expect(
      calendarDaysAgo(new Date(2025, 0, 6, 23, 59), new Date(2025, 0, 7, 0, 1)),
    ).toBe(1);
  });

  test("is zero within one day", () => {
    expect(
      calendarDaysAgo(new Date(2025, 0, 6, 0, 1), new Date(2025, 0, 6, 23, 59)),
    ).toBe(0);
  });

  test("crosses a month boundary", () => {
    expect(calendarDaysAgo(new Date(2025, 0, 30), new Date(2025, 1, 2))).toBe(
      3,
    );
  });
});

describe("formatDateDivider", () => {
  const now = new Date(2025, 0, 10, 12, 0);

  test("today", () => {
    expect(formatDateDivider(new Date(2025, 0, 10, 8, 0), now)).toBe("Today");
  });

  test("yesterday", () => {
    expect(formatDateDivider(new Date(2025, 0, 9, 8, 0), now)).toBe(
      "Yesterday",
    );
  });

  test("a weekday within the last week", () => {
    expect(formatDateDivider(new Date(2025, 0, 6), now)).toBe("Monday");
  });

  test("a date once past a week, year dropped when it is this year", () => {
    expect(formatDateDivider(new Date(2025, 0, 1), now)).toBe("1 January");
  });

  test("keeps the year for another year", () => {
    expect(formatDateDivider(new Date(2024, 11, 24), now)).toBe(
      "24 December 2024",
    );
  });

  test("seven days back is a date, not a weekday", () => {
    expect(formatDateDivider(new Date(2025, 0, 3), now)).toBe("3 January");
  });

  test("accepts translated labels", () => {
    expect(
      formatDateDivider(new Date(2025, 0, 10), now, { today: "Hoy" }),
    ).toBe("Hoy");
  });
});
