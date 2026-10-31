import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { perspectives, news, renderMarkdown } from '../data/content';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const items = [
    ...perspectives.map((a) => ({ ...a, link: `/insights/perspectives/${a.slug}/`, categories: ['Perspectives', ...a.tags] })),
    ...news.map((a) => ({ ...a, link: `/insights/news/${a.slug}/`, categories: ['News', ...a.tags] })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return rss({
    title: 'Alloyed Insights',
    description: 'Perspectives and news from Alloyed (formerly SEBPO) on managed operations, automation and outsourcing for media, advertising and financial services.',
    site: context.site ?? site.url,
    items: items.map((a) => ({ title: a.title, pubDate: new Date(a.date), description: a.excerpt, link: a.link, categories: a.categories, content: renderMarkdown(a.bodyMarkdown) })),
    customData: '<language>en-us</language>',
  });
}
