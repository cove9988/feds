import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rustyflow.ai';

const staticPaths = ['', '/diagnosis', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1.0 : 0.8,
    }))
  );
}
