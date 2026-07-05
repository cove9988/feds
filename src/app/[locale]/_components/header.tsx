import Link from 'next/link';
import LanguageDropdown from './language-dropdown';
import { getTranslations } from 'next-intl/server';

type Props = {
  locale: string;
  simple?: boolean;
};

export default async function Header({ locale, simple }: Props) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const site = await getTranslations({ locale, namespace: 'site' });
  const navLinks = [
    { href: '#value', label: t('coreValue') },
    { href: '#os', label: t('aiOs') },
    { href: '#services', label: t('services') },
    { href: '#cases', label: t('cases') },
    { href: '#team', label: t('team') },
    { href: '#process', label: t('process') },
  ];

  if (simple) {
    return (
      <header className="fixed top-0 z-50 h-16 w-full border-b border-hairline bg-surface">
        <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-6">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-on-surface">
            <img alt={site('brand')} width="56" height="56" decoding="async" className="shrink-0" src="/tiger-logo.svg" />
            <span className="text-headline-md font-bold tracking-tight text-current">{site('brand')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <Link href={`/${locale}`} className="flex items-center gap-1.5 text-[14px] text-ink-secondary hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-on-surface">
          <img alt={site('brand')} width="56" height="56" decoding="async" className="shrink-0" src="/tiger-logo.svg" />
          <span className="text-headline-md font-bold tracking-tight text-current">{site('brand')}</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageDropdown />
          <Link
            href={`/${locale}/diagnosis`}
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)] px-5 py-2 text-[14px]"
          >
            {t('diagnosis')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
