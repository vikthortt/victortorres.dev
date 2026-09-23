import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.status === 'published');

  return rss({
    title: 'Victor Torres — Notes',
    description: 'Writing on frontend development and React.',
    site: context.site ?? 'https://victortorres.dev',
    items: posts
      .sort((a, b) => b.data.created_date.valueOf() - a.data.created_date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.created_date,
        link: `/blog/${post.id}`,
        categories: post.data.tags,
      })),
  });
}
