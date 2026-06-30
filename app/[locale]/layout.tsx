import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jordan-jimenez.dev';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jordan Jimenez',
  jobTitle: 'Fullstack & DevOps Developer',
  url: BASE,
  sameAs: [
    'https://github.com/jimenezjordan',
    'https://www.linkedin.com/in/jordan-jimenez-a8423a224/',
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    metadataBase: new URL(BASE),
    title: { default: t('home.title'), template: `%s — Jordan Jimenez` },
    description: t('home.description'),
    openGraph: {
      siteName: 'Jordan Jimenez',
      images: [{ url: '/og/home.png', width: 1200, height: 630 }],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
          >
            Aller au contenu principal
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}