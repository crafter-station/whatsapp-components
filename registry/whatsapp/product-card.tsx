import type { ReactNode } from "react";
import { cn } from "./cn";

export type ProductCardProps = {
  title: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  /** A button or link under the price. */
  action?: ReactNode;
  /** Stacks the image above the text instead of beside it. */
  stacked?: boolean;
  className?: string;
  priceClassName?: string;
};

export function ProductCard({
  title,
  price,
  imageUrl,
  imageAlt = "",
  description,
  action,
  stacked = false,
  className,
  priceClassName,
}: ProductCardProps) {
  return (
    <span
      className={cn(
        "-mx-[5px] -mt-[2px] mb-1 block overflow-hidden rounded-[10px] bg-wa-surface",
        className,
      )}
    >
      <span
        className={cn("flex gap-3 p-2", stacked ? "flex-col" : "items-center")}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className={cn(
              "shrink-0 rounded-[8px] object-cover",
              stacked ? "h-auto w-full" : "h-[58px] w-[58px]",
            )}
          />
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium leading-[19px] text-wa-text">
            {title}
          </span>
          <span
            className={cn(
              "mt-0.5 block text-[17px] font-bold leading-[22px] text-wa-text",
              priceClassName,
            )}
          >
            {price}
          </span>
          {description ? (
            <span className="mt-1 line-clamp-2 block text-[12.5px] leading-[17px] text-wa-text-muted">
              {description}
            </span>
          ) : null}
        </span>
      </span>
      {action ? <span className="block px-2 pb-2">{action}</span> : null}
    </span>
  );
}
