import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import ProjectsGrid from '@/components/home/ProjectsGrid';
import StackSection from '@/components/home/StackSection';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jordan-jimenez.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: { absolute: t('home.title') },
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      images: [{ url: '/og/home.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: BASE,
      languages: { fr: BASE, en: `${BASE}/en` },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsGrid />
      <StackSection />
    </>
  );
}