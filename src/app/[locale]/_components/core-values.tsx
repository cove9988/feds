import { getTranslations } from 'next-intl/server';

type Props = { locale: string };

export default async function CoreValues({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.coreValues' });

  const cards = t.raw('cards') as Array<{ title: string; description: string; icon: string }>;
  const iconStyles = [
    { iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary' },
    { iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  ];

  return (
    <section id="value" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-headline-lg">{t('title')}</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <div key={card.title} className="glass glow-border rounded-lg p-6">
              <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${iconStyles[index].iconBg}`}>
                <span className={`material-symbols-outlined text-3xl ${iconStyles[index].iconColor}`}>{card.icon}</span>
              </div>
              <h3 className="text-headline-md mb-2">{card.title}</h3>
              <p className="text-body-md text-on-surface-variant">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
