'use client';

import { useParams, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      const segments = pathname.split('/');
      segments[1] = nextLocale;
      window.location.href = segments.join('/');
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      {routing.locales.map((locale) => {
        const isActive = params.locale === locale;
        return (
          <button
            key={locale}
            onClick={() => switchLocale(locale)}
            disabled={isActive || isPending}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              isActive
                ? 'bg-primary/20 text-primary'
                : 'text-on-surface-variant/60 hover:text-on-surface'
            }`}
          >
            {locale === 'zh' ? '中' : locale === 'en' ? 'EN' : '日'}
          </button>
        );
      })}
    </div>
  );
}
