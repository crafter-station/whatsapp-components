import { describe, expect, test } from "bun:test";
import {
  DEFAULT_WAVEFORM,
  formatBytes,
  formatDuration,
} from "../registry/whatsapp/format-media";

describe("formatDuration", () => {
  test("pads the seconds", () => {
    expect(formatDuration(95)).toBe("1:35");
  });

  test("keeps a leading zero minute", () => {
    expect(formatDuration(7)).toBe("0:07");
  });

  test("adds an hours field past an hour", () => {
    expect(formatDuration(3661)).toBe("1:01:01");
  });

  test("does not add an hours field at 59:59", () => {
    expect(formatDuration(3599)).toBe("59:59");
  });

  test("floors fractional seconds", () => {
    expect(formatDuration(90.9)).toBe("1:30");
  });

  test("clamps a negative duration to zero", () => {
    expect(formatDuration(-5)).toBe("0:00");
  });
});

describe("formatBytes", () => {
  test("stays in bytes below a thousand", () => {
    expect(formatBytes(999)).toBe("999 B");
  });

  test("switches to kB at a thousand", () => {
    expect(formatBytes(1000)).toBe("1 kB");
  });

  test("keeps one decimal below ten", () => {
    expect(formatBytes(1500)).toBe("1.5 kB");
  });

  test("drops the decimal above ten", () => {
    expect(formatBytes(15_400)).toBe("15 kB");
  });

  test("climbs to MB", () => {
    expect(formatBytes(2_400_000)).toBe("2.4 MB");
  });

  test("climbs to GB", () => {
    expect(formatBytes(3_200_000_000)).toBe("3.2 GB");
  });

  test("clamps a negative size to zero", () => {
    expect(formatBytes(-10)).toBe("0 B");
  });
});

describe("DEFAULT_WAVEFORM", () => {
  test("every bar is inside the 0..1 range the renderer assumes", () => {
    for (const value of DEFAULT_WAVEFORM) {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  test("has enough bars to look like audio", () => {
    expect(DEFAULT_WAVEFORM.length).toBeGreaterThanOrEqual(16);
  });
});
