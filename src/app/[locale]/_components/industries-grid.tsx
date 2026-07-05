import { getTranslations } from 'next-intl/server';

const colors = ['#62aef0', '#2a9d99', '#dd5b00', '#1aae39', '#d6b6f6', '#62aef0', '#ff64c8', '#dd5b00'];

export default async function IndustriesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.industries' });
  const items = t.raw('items') as Array<{ name: string; icon: string }>;

  return (
    <section id="industries" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-headline-lg">{t('title')}</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((ind, i) => (
            <div key={ind.name} className="glass glow-border flex items-center gap-3 rounded-lg px-4 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${colors[i]}1f` }}>
                <span className="material-symbols-outlined text-[22px]" style={{ color: colors[i] }}>{ind.icon}</span>
              </span>
              <span className="text-[15px] font-medium text-on-surface">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
