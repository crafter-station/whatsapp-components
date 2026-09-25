import { DateDivider } from "@/registry/whatsapp/date-divider";

const now = new Date(2025, 0, 10, 12, 0);

export default function Demo() {
  return (
    <div className="flex flex-col gap-1">
      <DateDivider date={new Date(2025, 0, 10)} now={now} />
      <DateDivider date={new Date(2025, 0, 9)} now={now} />
      <DateDivider date={new Date(2025, 0, 6)} now={now} />
      <DateDivider date={new Date(2024, 11, 24)} now={now} />
      <DateDivider
        date={new Date(2025, 0, 10)}
        now={now}
        labels={{ today: "Hoy" }}
      />
    </div>
  );
}
