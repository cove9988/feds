import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DiagnosisForm from './diagnosis-form';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'diagnosis' });
  const site = await getTranslations({ locale, namespace: 'site' });
  return {
    title: `${t('title')} · ${site('brand')}`,
    description: t('subheading'),
    openGraph: {
      title: `${t('title')} · ${site('brand')}`,
      description: t('subheading'),
    },
    twitter: {
      title: `${t('title')} · ${site('brand')}`,
      description: t('subheading'),
    },
  };
}

export default function DiagnosisPage() {
  return <DiagnosisForm />;
}
