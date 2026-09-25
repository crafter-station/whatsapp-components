import { cn } from "./cn";

export type LocationMessageProps = {
  latitude: number;
  longitude: number;
  name?: string;
  address?: string;
  /** A static map image. Without one, a drawn placeholder stands in. */
  previewUrl?: string;
  href?: string;
  className?: string;
};

export function LocationMessage({
  latitude,
  longitude,
  name,
  address,
  previewUrl,
  href,
  className,
}: LocationMessageProps) {
  const label = name ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  const Wrapper = href ? "a" : "span";

  return (
    <Wrapper
      href={href}
      className={cn("-mx-[6px] -mt-[3px] block w-[250px]", className)}
    >
      <span className="relative block h-[135px] overflow-hidden rounded-[6px] bg-wa-surface">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={name ? `Map showing ${name}` : "Map"}
            className="h-full w-full object-cover"
          />
        ) : (
          <MapPlaceholder />
        )}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-wa-accent">
          <PinIcon />
        </span>
      </span>
      {name || address ? (
        <span className="block bg-wa-surface/70 px-2.5 py-2">
          <span className="block truncate text-[14px] leading-[19px] text-wa-text">
            {label}
          </span>
          {address ? (
            <span className="mt-0.5 block truncate text-[12px] leading-[16px] text-wa-text-muted">
              {address}
            </span>
          ) : null}
        </span>
      ) : null}
    </Wrapper>
  );
}

/** A drawn stand-in, so a location renders without a maps API key. */
function MapPlaceholder() {
  return (
    <svg
      viewBox="0 0 250 135"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-full w-full text-wa-text-muted/25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        width="250"
        height="135"
        className="fill-wa-text-muted/10"
        stroke="none"
      />
      <path d="M-10 38h270M-10 96h270M52 -10v155M168 -10v155" />
      <path d="M-10 118L70 68l54 22 60-44 66 26" strokeWidth="3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.2a7.3 7.3 0 0 0-7.3 7.3c0 5.2 6.5 11.7 6.78 11.98a.74.74 0 0 0 1.04 0C12.8 21.2 19.3 14.7 19.3 9.5A7.3 7.3 0 0 0 12 2.2zm0 10a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z" />
    </svg>
  );
}
