import { getTranslations } from 'next-intl/server';

type Card = {
  title: string;
  description: string;
  icon: string;
  tags: string[];
  iconBg: string;
  iconColor: string;
};

export default async function EntryPoints({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.entryPoints' });
  const cards = t.raw('cards') as Card[];

  return (
    <section id="entry-points" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-headline-lg">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="glass glow-border rounded-lg p-7">
              <span className="mb-5 inline-grid size-12 place-items-center rounded-lg" style={{ backgroundColor: card.iconBg }}>
                <span className="material-symbols-outlined text-[26px]" style={{ color: card.iconColor }}>{card.icon}</span>
              </span>
              <h3 className="text-headline-md mb-2">{card.title}</h3>
              <p className="mb-4 text-body-md text-on-surface-variant">{card.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-on-surface-variant">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
