import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
  loader: glob({ base: './src/content/logs', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date({ coerce: true }), // transform string to Date object
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { logs };
