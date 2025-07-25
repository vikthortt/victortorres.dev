import {defineCollection, reference, z} from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: 'src/blog' }),
  schema: z.object({
    series: z.string().optional(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    image_credit: z.string().optional(),
    image_credit_url: z.string().optional(),
    image_credit_source: z.string().optional(),
    image_credit_source_url: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    created_date: z.date(),
    published_date: z.date().optional(),
    modified_date: z.date().optional(),
    category: z.string().default('Reflections'),
    tags: z.array(z.string()).optional(),
    canonical_url: z.string().optional(),
    slug: z.string().optional(),
    metadata: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      social_title: z.string().optional(),
      social_description: z.string().optional(),
      social_image: z.string().optional(),
    }).optional(),
    author: z.object({
      name: z.string(),
      bio: z.string().optional(),
      social: z.array(z.object({
        platform: z.string(), // e.g., 'Twitter', 'GitHub'
        handle: z.string(), // e.g., '@username'
        url: z.string().optional(),
      })).optional(),
      url: z.string().optional(),
      image: z.string().optional(),
    }).optional(),
    reading_time: z.number().optional(),
    toc: z.array(z.object({
      id: z.string(),
      text: z.string(),
      level: z.number().default(0),
    })).optional(),
    related_posts: z.array(reference('blog')).optional(),
  })
})

export const collections = { blog }
