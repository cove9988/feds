import { getTranslations } from 'next-intl/server';
import CanvasParticles from './canvas-particles';
import LlmOrbSvg from './llm-orb-svg';
import Link from 'next/link';

type Props = { locale: string };

export default async function HeroSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <CanvasParticles />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div className="space-y-10">
          <div className="glass animate-floaty inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            <span className="text-label-sm tracking-widest text-primary">{t('badge')}</span>
          </div>
          <h1 className="text-[40px] font-extrabold leading-tight tracking-[-0.04em] lg:text-[64px]">
            {t.rich('heading', { highlight: (chunks) => <span className="text-primary text-glow">{chunks}</span> })}
          </h1>
          <p className="max-w-xl text-body-lg text-on-surface-variant">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <Link
              href={`/${locale}/diagnosis`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)]"
            >
              {t('subtitle')}
            </Link>
            <a
              href="#value"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] border border-outline text-on-surface-variant hover:bg-white/[0.03]"
            >
              {t('cta')}
            </a>
          </div>
        </div>
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="h-[500px] w-[500px]">
            <LlmOrbSvg />
          </div>
          <div className="absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </div>
      </div>
    </section>
  );
}
