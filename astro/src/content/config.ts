import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
  }),
});

export const collections = { posts };
