import { getTranslations } from 'next-intl/server';

export default async function ServicesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.services' });

  const services = [
    { icon: 'autorenew', num: '01', title: t('legacyUpgrade.title'), desc: t('legacyUpgrade.description'), iconBg: '#62aef01f', iconColor: '#62aef0', points: t.raw('legacyUpgrade.points') as string[] },
    { icon: 'rocket_launch', num: '02', title: t('newSystem.title'), desc: t('newSystem.description'), iconBg: '#1aae391f', iconColor: '#1aae39', points: t.raw('newSystem.points') as string[] },
    { icon: 'insights', num: '03', title: t('fdeConsulting.title'), desc: t('fdeConsulting.description'), iconBg: '#dd5b001f', iconColor: '#dd5b00', points: t.raw('fdeConsulting.points') as string[] },
    { icon: 'hub', num: '04', title: t('agentPlatform.title'), desc: t('agentPlatform.description'), iconBg: '#d6b6f61f', iconColor: '#d6b6f6', points: t.raw('agentPlatform.points') as string[] },
  ];

  return (
    <section id="services" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-headline-lg">{t('title')}</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.num} className="glass glow-border rounded-lg p-7">
              <div className="mb-4 flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-lg" style={{ backgroundColor: s.iconBg }}>
                  <span className="material-symbols-outlined text-[24px]" style={{ color: s.iconColor }}>{s.icon}</span>
                </span>
                <span className="text-label-sm tracking-widest text-on-surface-variant">{s.num}</span>
              </div>
              <h3 className="text-headline-md mb-2">{s.title}</h3>
              <p className="mb-4 text-body-md text-on-surface-variant">{s.desc}</p>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[14px] text-on-surface-variant">
                    <span className="material-symbols-outlined mt-0.5 text-[16px] text-green">check</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
