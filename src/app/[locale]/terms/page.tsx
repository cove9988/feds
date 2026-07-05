import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  const site = await getTranslations({ locale, namespace: 'site' });
  return {
    title: `${t('title')} · ${site('brand')}`,
    description: site('description'),
    openGraph: {
      title: `${t('title')} · ${site('brand')}`,
    },
    twitter: {
      title: `${t('title')} · ${site('brand')}`,
    },
  };
}

export default function TermsPage({ params }: Props) {
  const t = useTranslations('terms');
  const sections = t.raw('sections') as { title: string; content: string }[];

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-28">
      <h1 className="text-headline-lg text-on-surface">{t('title')}</h1>
      <p className="mt-2 text-[14px] text-ink-faint">{t('lastUpdated')}</p>
      <div className="mt-8 space-y-7">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-headline-md text-on-surface">{section.title}</h2>
            <div className="mt-2.5 space-y-2 text-[15px] leading-relaxed text-ink-secondary">
              <p>{section.content}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
