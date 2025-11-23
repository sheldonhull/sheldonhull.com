import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    // Series support for multi-part posts
    series: z.string().optional(),  // Series name/identifier
    seriesOrder: z.number().optional(),  // Order within the series (1, 2, 3, etc.)
    // Image support for Astro optimization
    cover: image().optional(),  // Featured image (optimized by Astro)
    coverAlt: z.string().optional(),
    images: z.array(z.string()).optional(),  // Legacy: image paths array
  }),
});

export const collections = { posts };
