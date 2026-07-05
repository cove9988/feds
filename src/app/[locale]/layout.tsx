import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import Header from './_components/header';
import Footer from './_components/footer';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  const brand = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('title'),
    description: t('description'),
    applicationName: brand('brand'),
    authors: [{ name: brand('brand') }],
    generator: 'Next.js',
    keywords: t('keywords'),
    creator: brand('brand'),
    publisher: brand('brand'),
    robots: 'index, follow',
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://www.6amtech.cn',
      siteName: brand('brand') + ' · Rustyflow',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  const h = await headers();
  const pagePath = h.get('x-page-path') || '';
  const isLegalPage = pagePath.includes('/privacy') || pagePath.includes('/terms');
  const isDiagnosis = pagePath.includes('/diagnosis');

  return (
    <NextIntlClientProvider messages={messages}>
      {isLegalPage ? <Header locale={locale} simple /> : <Header locale={locale} />}
      <main>{children}</main>
      {isDiagnosis ? null : isLegalPage ? <Footer locale={locale} simple /> : <Footer locale={locale} />}
    </NextIntlClientProvider>
  );
}
