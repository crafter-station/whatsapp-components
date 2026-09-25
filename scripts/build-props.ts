import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/**
 * Reads the prop types straight out of the component source with the
 * TypeScript checker, so the docs tables cannot drift from the code. Uses the
 * checker rather than the syntax tree so intersections like
 * `AudioMessageProps & { ... }` resolve to their full member list.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = join(root, "registry/whatsapp");

export type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
};

/**
 * Sorted, because readdir order is whatever the filesystem feels like: APFS
 * and ext4 disagree, so an unsorted walk writes a different key order on a
 * Mac than on CI and the committed file is never clean on both.
 */
const files = readdirSync(registryDir)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .sort()
  .map((file) => join(registryDir, file));

const program = ts.createProgram(files, {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
});
const checker = program.getTypeChecker();

/** `defaultValue = x` in the destructured parameter list of the component. */
function collectDefaults(source: ts.SourceFile): Map<string, string> {
  const defaults = new Map<string, string>();

  const visit = (node: ts.Node) => {
    if (
      (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) &&
      node.parameters.length > 0
    ) {
      const [parameter] = node.parameters;
      if (ts.isObjectBindingPattern(parameter.name)) {
        for (const element of parameter.name.elements) {
          if (element.initializer && ts.isIdentifier(element.name)) {
            defaults.set(
              (element.propertyName ?? element.name).getText(source),
              element.initializer.getText(source),
            );
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return defaults;
}

const result: Record<string, PropDoc[]> = {};

for (const file of files) {
  const source = program.getSourceFile(file);
  if (!source) continue;

  const defaults = collectDefaults(source);

  for (const statement of source.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) continue;
    if (!statement.name.text.endsWith("Props")) continue;
    if (
      !statement.modifiers?.some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      )
    ) {
      continue;
    }

    const type = checker.getTypeAtLocation(statement.name);
    const props: PropDoc[] = [];

    for (const symbol of checker.getPropertiesOfType(type)) {
      const declaration = symbol.declarations?.[0];
      if (!declaration) continue;

      const optional = (symbol.flags & ts.SymbolFlags.Optional) !== 0;
      const description = ts.displayPartsToString(
        symbol.getDocumentationComment(checker),
      );

      /**
       * The written type, not the resolved one. The checker expands ReactNode
       * into a dozen-member union with absolute import paths, which is true
       * and useless in a table.
       */
      const written =
        ts.isPropertySignature(declaration) && declaration.type
          ? declaration.type.getText(declaration.getSourceFile())
          : undefined;

      const propType =
        written ??
        checker
          .typeToString(
            checker.getTypeOfSymbolAtLocation(symbol, declaration),
            declaration,
            ts.TypeFormatFlags.InTypeAlias,
          )
          .replace(/ \| undefined$/, "");

      props.push({
        name: symbol.getName(),
        type: propType.replace(/\s+/g, " ").trim(),
        required: !optional,
        ...(description ? { description } : {}),
        ...(defaults.has(symbol.getName())
          ? { defaultValue: defaults.get(symbol.getName()) }
          : {}),
      });
    }

    props.sort((a, b) => {
      if (a.required !== b.required) return a.required ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    result[statement.name.text] = props;
  }
}

/** Sorted again on the way out, so the file does not depend on walk order. */
const sorted = Object.fromEntries(
  Object.keys(result)
    .sort()
    .map((name) => [name, result[name]]),
);

const output = join(root, "apps/dashboard/app/props.generated.json");
writeFileSync(output, `${JSON.stringify(sorted, null, 2)}\n`);

const total = Object.values(result).reduce((sum, list) => sum + list.length, 0);
console.log(
  `props: ${Object.keys(result).length} types, ${total} props -> ${output}`,
);
