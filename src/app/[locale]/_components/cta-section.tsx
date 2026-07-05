import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = { locale: string };

export default async function CTASection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.cta' });

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute right-0 top-0 size-96 animate-pulse rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-headline-xl mb-6">{t('title')}</h2>
        <p className="mb-12 text-body-lg text-on-surface-variant">
          {t('description')}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/diagnosis`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)]"
          >
            {t('diagnosis')}
          </Link>
          <a
            href="mailto:sales@dahu.ai"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] border border-outline text-on-surface-variant hover:bg-white/[0.03]"
          >
            {t('contact')}
          </a>
        </div>
      </div>
    </section>
  );
}
