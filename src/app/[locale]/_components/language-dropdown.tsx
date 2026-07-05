'use client';
import { useParams, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function LanguageDropdown() {
  const t = useTranslations('language');
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocale = params.locale as string;

  function switchLocale(nextLocale: string) {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    window.location.href = segments.join('/');
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="切换语言 / Language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors border-white/10 bg-white/[0.03] text-on-surface-variant hover:border-primary/40 hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">language</span>
        <span className="text-label-md tracking-normal">{currentLocale === 'zh' ? '中' : currentLocale === 'en' ? 'EN' : '日'}</span>
        <span className={`material-symbols-outlined text-[18px] transition-transform ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-surface-container-high shadow-xl">
          {routing.locales.map((locale) => {
            const isActive = currentLocale === locale;
            return (
              <button
                key={locale}
                onClick={() => { switchLocale(locale); setOpen(false); }}
                disabled={isActive}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-white/[0.03] hover:text-on-surface'
                }`}
              >
                <span className={`text-xs ${isActive ? 'text-primary' : 'text-ink-faint'}`}>
                  {locale === 'zh' ? '中' : locale === 'en' ? 'EN' : '日'}
                </span>
                <span>{t(locale)}</span>
                {isActive && <span className="ml-auto material-symbols-outlined text-[16px]">check</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
