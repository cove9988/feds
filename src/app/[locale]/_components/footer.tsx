import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type Props = { locale: string; simple?: boolean };

export default async function Footer({ locale, simple }: Props) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const site = await getTranslations({ locale, namespace: 'site' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const cities = t.raw('cities') as string[];

  if (simple) {
    return (
      <footer className="border-t border-hairline bg-canvas-soft py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 px-6 text-[13px] text-ink-muted sm:flex-row">
          <span>{t('copyright')}</span>
          <span className="flex gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-primary">{nav('privacy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary">{nav('terms')}</Link>
            <a href="mailto:sales@dahu.ai" className="hover:text-primary">{t('contact')}</a>
          </span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest pt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <span className="inline-flex items-center gap-2 text-on-surface">
              <img alt={site('brand')} width="56" height="56" className="shrink-0" src="/tiger-logo.svg" />
              <span className="text-headline-md font-bold tracking-tight text-current">{site('brand')}</span>
            </span>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-on-surface-variant">
              {t('description')}
            </p>
            <a href="mailto:sales@dahu.ai" className="mt-4 inline-flex items-center gap-1.5 text-[14px] text-primary hover:opacity-80">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              sales@dahu.ai
            </a>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">{t('products')}</h4>
            <ul className="mt-4 space-y-2.5">
              {[{ href: '#os', label: t('aiOs') }, { href: '#services', label: t('servicesLink') }, { href: '#industries', label: t('industries') }, { href: '#cases', label: t('casesLink') }, { href: '#process', label: t('fde') }].map((l) => (
                <li key={l.href}><a href={l.href} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">{t('company')}</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={`/${locale}/diagnosis`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{t('diagnosisLink')}</Link></li>
              <li><a href="mailto:sales@dahu.ai" className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{t('contact')}</a></li>
              <li><a href="mailto:sales@dahu.ai?subject=加入 Dahu" className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{t('joinUs')}</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">{t('legal')}</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={`/${locale}/privacy`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{t('privacyLink')}</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{t('termsLink')}</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">{t('offices')}</h4>
            <ul className="mt-4 space-y-2.5">
              {cities.map((city) => (
                <li key={city} className="flex items-center gap-2 text-[14px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary/70">location_on</span>
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 py-6 text-[13px] text-on-surface-variant/60 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p>{t('copyright')}</p>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">{t('icp')}</a>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href={`/${locale}/privacy`} className="hover:text-primary">{t('privacyLink')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary">{t('termsLink')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
