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

/** Whole local calendar days from `date` to `now`. Negative for the future. */
export function calendarDaysAgo(date: Date, now: Date): number {
  const startOf = (value: Date) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  return Math.round((startOf(now) - startOf(date)) / 86_400_000);
}

export type DateDividerOptions = {
  today?: string;
  yesterday?: string;
  /** Sunday first, matching Date#getDay. */
  weekdays?: string[];
  months?: string[];
};

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Today, Yesterday, a weekday within the last week, then a date — the ladder
 * WhatsApp uses. The year is dropped when it is the current one.
 */
export function formatDateDivider(
  date: Date,
  now: Date = new Date(),
  options: DateDividerOptions = {},
): string {
  const {
    today = "Today",
    yesterday = "Yesterday",
    weekdays = WEEKDAYS,
    months = MONTHS,
  } = options;

  const daysAgo = calendarDaysAgo(date, now);
  if (daysAgo === 0) return today;
  if (daysAgo === 1) return yesterday;
  if (daysAgo > 1 && daysAgo < 7) return weekdays[date.getDay()];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return date.getFullYear() === now.getFullYear()
    ? `${day} ${month}`
    : `${day} ${month} ${date.getFullYear()}`;
}
