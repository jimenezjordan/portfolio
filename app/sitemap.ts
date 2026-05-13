import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jordan-jimenez.dev';
const routes = ['', '/projets', '/projets/formrh', '/projets/degres-jours', '/parcours', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return (['fr', 'en'] as const).flatMap(locale =>
    routes.map(route => ({
      url: locale === 'fr' ? `${BASE}${route}` : `${BASE}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
