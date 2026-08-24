import { defineConfig, s } from "velite";

export default defineConfig({
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
