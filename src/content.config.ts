import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const rlCourse = defineCollection({
  loader: glob({ base: "./src/content/rl-course", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { "rl-course": rlCourse };
