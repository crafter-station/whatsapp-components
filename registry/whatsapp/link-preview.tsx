import { cn } from "./cn";

export type LinkPreviewProps = {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  /** Large image on top instead of a thumbnail beside the text. */
  large?: boolean;
  className?: string;
};

function hostOf(url: string): string {
  const match = url.match(/^[a-z]+:\/\/([^/?#]+)/i);
  return (match?.[1] ?? url).replace(/^www\./, "");
}

export function LinkPreview({
  url,
  title,
  description,
  imageUrl,
  siteName,
  large = false,
  className,
}: LinkPreviewProps) {
  const host = siteName ?? hostOf(url);

  return (
    <a
      href={url}
      className={cn(
        "-mx-[5px] -mt-[2px] mb-1 block overflow-hidden rounded-[6px] bg-wa-text/[0.06]",
        className,
      )}
    >
      {large && imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="block max-h-[170px] w-full object-cover"
        />
      ) : null}
      <span className="flex items-start gap-2.5 px-2.5 py-2">
        {!large && imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-[58px] w-[58px] shrink-0 rounded-[4px] object-cover"
          />
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-medium leading-[18px] text-wa-text">
            {title}
          </span>
          {description ? (
            <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-[17px] text-wa-text-muted">
              {description}
            </span>
          ) : null}
          <span className="mt-1 block truncate text-[12px] leading-[16px] text-wa-text-muted">
            {host}
          </span>
        </span>
      </span>
    </a>
  );
}
