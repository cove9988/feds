import { getTranslations } from 'next-intl/server';

type Props = { locale: string };

export default async function ProcessSteps({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.process' });
  const steps = t.raw('steps') as Array<{ number: string; title: string; icon: string; description: string }>;

  return (
    <section id="process" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-label-md mb-3 uppercase tracking-widest text-primary">{t('label')}</p>
          <h2 className="text-headline-lg mb-5">{t('title')}</h2>
          <p className="text-body-lg text-on-surface-variant">
            {t('description')}
          </p>
        </div>
        <p className="mb-10 text-center text-headline-md text-on-surface">{t('summary')}</p>
        <div className="relative">
          <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-transparent via-outline-variant to-transparent md:block" />
          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="group text-center">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-white/10 bg-surface-container-highest transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                  <span className="material-symbols-outlined text-[26px] text-primary">{step.icon}</span>
                </div>
                <h4 className="text-headline-md mb-2">
                  <span className="text-primary">{step.number}</span> {step.title}
                </h4>
                <p className="text-[14px] leading-snug text-on-surface-variant">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
