import rehypePrettyCode from "rehype-pretty-code";
import { defineConfig, s } from "velite";

const prettyCodeOptions = {
  theme: "github-dark",
};

type HastElement = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

type HastNode = HastElement | { children?: HastNode[] };

function isHastElement(node: HastNode): node is HastElement {
  return "type" in node && node.type === "element";
}

function rehypeWrapTables() {
  return (tree: HastNode) => {
    function visit(node: HastNode) {
      if (!node.children) return;

      node.children = node.children.map((child) => {
        if (isHastElement(child) && child.tagName === "table") {
          return {
            type: "element",
            tagName: "div",
            properties: { className: ["table-scroll"] },
            children: [child],
          };
        }

        visit(child);
        return child;
      });
    }

    visit(tree);
  };
}

export default defineConfig({
  mdx: {
    rehypePlugins: [rehypeWrapTables, [rehypePrettyCode, prettyCodeOptions]],
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "blog/**/page.mdx",
      schema: s.object({
        title: s.string(),
        date: s.string().optional(),
        summary: s.string().optional(),
        author: s.string().optional(),
        cover: s.string().optional(),
        tags: s
          .string()
          .optional()
          .transform((tags) =>
            tags
              ? tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              : [],
          ),
        slug: s.path().transform((path) => path.split("/")[1]),
        content: s.mdx(),
      }),
    },
  },
  output: {
    data: ".velite",
    assets: "public/static/assets",
    base: "/static/assets/",
    name: "[hash:24].[ext]",
    clean: true,
  },
});
