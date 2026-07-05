import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import Script from 'next/script';
import './globals.css';

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const h = await headers();
  const locale = h.get('x-next-intl-locale') || 'zh';
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale} className="theme-midnight min-h-screen overflow-x-hidden bg-background text-on-surface">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200&display=swap" rel="stylesheet" />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-ads" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}</Script>
          </>
        )}
      </head>
      <body className="min-h-screen overflow-x-hidden bg-background text-on-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Rustyflow',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rustyflow.ai',
              description: 'Enterprise AI deployment services',
              sameAs: [],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
