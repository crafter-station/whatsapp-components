/**
 * Local-clock formatting, kept free of Intl so previews render identically on
 * the server and the client. Reads local hours, so a Date built from local
 * components formats the same in any timezone.
 */

export type TimeFormatOptions = {
  /** 12-hour clock with an "a.m." / "p.m." suffix. Defaults to true. */
  hour12?: boolean;
  /** Suffixes for the 12-hour clock. Defaults to Spanish-style lowercase. */
  meridiem?: [am: string, pm: string];
};

export function formatMessageTime(
  date: Date,
  options: TimeFormatOptions = {},
): string {
  const { hour12 = true, meridiem = ["a.m.", "p.m."] } = options;
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (!hour12) {
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  const displayHour = hours % 12 || 12;
  const suffix = hours < 12 ? meridiem[0] : meridiem[1];
  return `${displayHour}:${minutes} ${suffix}`;
}

/** True when both dates fall on the same local calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
