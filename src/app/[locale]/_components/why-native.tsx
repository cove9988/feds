import { getTranslations } from 'next-intl/server';

const afterColors = ['#62aef0', '#d6b6f6', '#1aae39', '#dd5b00'];

export default async function WhyNative({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.whyNative' });
  const items = t.raw('items') as string[];

  return (
    <section id="why" className="border-y border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-label-md mb-2 uppercase tracking-widest text-primary">Why AI Native</p>
            <h2 className="text-headline-lg">{t('title')}</h2>
          </div>
          <p className="max-w-md text-body-md text-on-surface-variant">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 md:[height:560px]">
          {/* Main card - col-span-7 row-span-2 */}
          <div className="glass glow-border relative overflow-hidden rounded-lg p-8 md:col-span-7 md:row-span-2">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-[100px]" />
            <div className="relative flex h-full flex-col">
              <span className="material-symbols-outlined mb-4 text-3xl text-primary">architecture</span>
              <h3 className="text-headline-lg mb-3">{t('tag')}</h3>
              <p className="max-w-lg text-body-md text-on-surface-variant">
                {t('description')}
              </p>
              <div className="mt-7 flex-1">
                <div className="grid h-full grid-cols-3 items-center gap-3">
                  {/* Before column */}
                  <div className="space-y-2.5">
                    {[items[0], items[1]].map((item) => (
                      <div key={item} className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-[12px] text-on-surface-variant">{item}</div>
                    ))}
                  </div>
                  {/* Arrow + AI icon */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-xl text-primary/70">east</span>
                    <div className="glass flex size-16 items-center justify-center rounded-full border border-primary/30">
                      <span className="material-symbols-outlined text-2xl text-primary">bolt</span>
                    </div>
                    <span className="text-label-sm tracking-normal text-on-surface-variant">{items[2]}</span>
                    <span className="material-symbols-outlined text-xl text-primary/70">east</span>
                  </div>
                  {/* After column */}
                  <div className="space-y-2.5">
                    {[items[3], items[4], items[5], items[6]].map((label, i) => (
                      <div key={label} className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-[12px] text-on-surface">
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: afterColors[i] }} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right top card */}
          <div className="glass glow-border rounded-lg p-8 md:col-span-5">
            <span className="material-symbols-outlined mb-4 text-3xl text-secondary">bolt</span>
            <h3 className="text-headline-md mb-2">{items[7]}</h3>
            <p className="text-body-md text-on-surface-variant">
              {t('globalEdge')}
            </p>
          </div>
          {/* Right bottom card */}
          <div className="glass glow-border rounded-lg p-8 md:col-span-5">
            <span className="material-symbols-outlined mb-4 text-3xl text-tertiary">shield</span>
            <h3 className="text-headline-md mb-2">{t('complianceTitle')}</h3>
            <p className="text-body-md text-on-surface-variant">
              {t('compliance')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
