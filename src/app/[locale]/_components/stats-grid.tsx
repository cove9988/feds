import { getTranslations } from 'next-intl/server';

type Props = { locale: string };

export default async function StatsGrid({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.stats' });

  const stats = [
    { value: '80%', label: t('costReduction'), desc: t('costDesc') },
    { value: '65%', label: t('softwareSavings'), desc: t('softwareDesc') },
    { value: '70%', label: t('timeReduction'), desc: t('timeDesc') },
    { value: '3×', label: t('decisionSpeed'), desc: t('decisionDesc') },
    { value: t('fastestLaunchValue'), label: t('fastestLaunchLabel'), desc: t('fastestLaunchDesc') },
    { value: t('fastestResponseValue'), label: t('fastestResponseLabel'), desc: t('fastestResponseDesc') },
  ];

  return (
    <section className="border-y border-white/5 bg-surface-container-low/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-[34px] font-extrabold tracking-tight text-primary">{s.value}</div>
              <div className="mt-1 text-[15px] font-medium text-on-surface">{s.label}</div>
              <div className="mt-0.5 text-[12px] leading-snug text-on-surface-variant/70">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
