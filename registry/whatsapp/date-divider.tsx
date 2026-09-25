import { cn } from "./cn";
import { type DateDividerOptions, formatDateDivider } from "./format-time";

export type DateDividerProps = {
  date: Date;
  /** Overrides the derived Today / Yesterday / weekday label. */
  label?: string;
  /** Reference point for the relative labels. Defaults to now. */
  now?: Date;
  labels?: DateDividerOptions;
  className?: string;
};

export function DateDivider({
  date,
  label,
  now,
  labels,
  className,
}: DateDividerProps) {
  return (
    <div className={cn("flex justify-center py-1", className)}>
      <span className="rounded-lg bg-wa-system-bg px-3 py-1 font-wa text-[12.5px] uppercase leading-[18px] text-wa-system-text shadow-wa-bubble">
        {label ?? formatDateDivider(date, now, labels)}
      </span>
    </div>
  );
}
