import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InstallBlock } from "../../components/code-block";
import { ComponentPreview } from "../../components/component-preview";
import { PropsTable } from "../../components/props-table";
import { docItems, docItemsByName, installCommand } from "../../lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return docItems.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = docItemsByName.get(slug);
  if (!item) return {};
  return {
    title: `${item.title} — WhatsApp Components`,
    description: item.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = docItemsByName.get(slug);
  if (!item) notFound();

  return (
    <article className="space-y-8">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--page-muted)]">
          {item.type.replace("registry:", "")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {item.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--page-muted)]">
          {item.description}
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--page-muted)]">
          Install
        </h2>
        <InstallBlock command={installCommand(item.name)} />
        <p className="text-[12.5px] text-[var(--page-muted)]">
          Writes {item.files.length}{" "}
          {item.files.length === 1 ? "file" : "files"} into your project
          {item.dependencies.length > 0
            ? `, and installs ${item.dependencies.join(" and ")}`
            : ""}
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--page-muted)]">
          Preview
        </h2>
        <ComponentPreview name={item.name} />
      </section>

      {item.props.length > 0 && item.propsTypeName ? (
        <section className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--page-muted)]">
            Props
          </h2>
          <p className="text-[12.5px] text-[var(--page-muted)]">
            Read from <code className="font-mono">{item.propsTypeName}</code> in
            the component source at build time.
          </p>
          <PropsTable props={item.props} typeName={item.propsTypeName} />
        </section>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--page-muted)]">
          Files
        </h2>
        <ul className="space-y-1">
          {item.files.map((file) => (
            <li
              key={file}
              className="font-mono text-[12.5px] text-[var(--page-muted)]"
            >
              {file}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
