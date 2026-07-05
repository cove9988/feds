import { getTranslations } from 'next-intl/server';
import HeroSection from './_components/hero-section';
import StatsGrid from './_components/stats-grid';
import CoreValues from './_components/core-values';
import WhyNative from './_components/why-native';
import ProductOS from './_components/product-os';
import ServicesGrid from './_components/services-grid';
import EntryPoints from './_components/entry-points';
import IndustriesGrid from './_components/industries-grid';
import CasesCarousel from './_components/cases-carousel';
import TeamGrid from './_components/team-grid';
import ProcessSteps from './_components/process-steps';
import CTASection from './_components/cta-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const site = await getTranslations({ locale, namespace: 'site' });
  const home = await getTranslations({ locale, namespace: 'home' });
  return {
    title: `${site('title')} | ${home('hero.subtitle')}`,
    description: site('description'),
    openGraph: {
      title: `${site('title')} | ${home('hero.subtitle')}`,
    },
    twitter: {
      title: `${site('title')} | ${home('hero.subtitle')}`,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <HeroSection locale={locale} />
      <StatsGrid locale={locale} />
      <CoreValues locale={locale} />
      <WhyNative locale={locale} />
      <ProductOS locale={locale} />
      <ServicesGrid locale={locale} />
      <EntryPoints locale={locale} />
      <IndustriesGrid locale={locale} />
      <CasesCarousel locale={locale} />
      <TeamGrid locale={locale} />
      <ProcessSteps locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
