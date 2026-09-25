/** Clock-style duration: 95 becomes 1:35, an hour or more gains a field. */
export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

const UNITS = ["kB", "MB", "GB", "TB"];

/** Decimal units, as WhatsApp shows them. One decimal below ten, none above. */
export function formatBytes(bytes: number): string {
  const safe = Math.max(0, bytes);
  if (safe < 1000) return `${Math.round(safe)} B`;

  let value = safe / 1000;
  let unit = 0;
  while (value >= 1000 && unit < UNITS.length - 1) {
    value /= 1000;
    unit += 1;
  }

  const rounded = value < 10 ? Math.round(value * 10) / 10 : Math.round(value);
  return `${rounded} ${UNITS[unit]}`;
}

/** A stable stand-in waveform, so a clip with no data still looks like audio. */
export const DEFAULT_WAVEFORM = [
  0.25, 0.4, 0.62, 0.48, 0.78, 0.94, 0.7, 0.55, 0.82, 0.66, 0.38, 0.52, 0.74,
  0.9, 0.6, 0.44, 0.68, 0.86, 0.5, 0.34, 0.58, 0.8, 0.46, 0.3,
];
