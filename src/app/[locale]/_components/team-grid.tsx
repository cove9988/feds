import { getTranslations } from 'next-intl/server';

type Props = { locale: string };

export default async function TeamGrid({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.team' });
  const members = t.raw('members') as Array<{ name: string; role: string; description: string; icon: string; gradient: string; tags: string[] }>;
  const schoolTags = t.raw('tags') as string[];

  return (
    <section id="team" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-label-md mb-3 uppercase tracking-widest text-primary">{t('label')}</p>
          <h2 className="text-headline-lg mb-5">{t('title')}</h2>
          <p className="text-body-lg text-on-surface-variant">
            {t('description')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {schoolTags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[12px] text-on-surface-variant">{tag}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {members.map((m) => (
            <div key={m.name} className="glass glow-border rounded-lg p-7">
              <div className="mb-4 flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full text-white" style={{ background: m.gradient }}>
                  <span className="material-symbols-outlined text-[26px]">{m.icon}</span>
                </span>
                <div>
                  <h3 className="text-headline-md leading-tight">{m.name}</h3>
                  <p className="text-[13px] text-primary">{m.role}</p>
                </div>
              </div>
              <p className="text-body-md leading-relaxed text-on-surface-variant">{m.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[12px] text-on-surface-variant">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
