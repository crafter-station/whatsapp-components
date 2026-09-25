import { ProductCard } from "@/registry/whatsapp/product-card";
import type { MessageContent } from "@/registry/whatsapp/types";

/**
 * Conversation puts a product caption under the card. The reference mockup
 * leads with the text instead, so this uses the renderContent escape hatch
 * rather than growing the content type with a layout preference.
 */
export function renderProductLead(content: MessageContent) {
  if (content.type !== "product") return undefined;

  return (
    <>
      {content.caption ? (
        <span className="mb-1.5 block">{content.caption}</span>
      ) : null}
      <ProductCard
        title={content.title}
        price={content.price}
        imageUrl={content.imageUrl}
        imageAlt={content.imageAlt}
        description={content.description}
        className="mt-0"
      />
    </>
  );
}
