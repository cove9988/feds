import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import TerminalCard from './terminal-card';

type Props = { locale: string };

export default async function ProductOS({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.product' });

  const features = [
    { icon: 'lock', title: t('features.privateDeploy'), desc: t('features.privateDeployDesc') },
    { icon: 'cable', title: t('features.seamlessIntegration'), desc: t('features.seamlessIntegrationDesc') },
    { icon: 'groups', title: t('features.aiCollaboration'), desc: t('features.aiCollaborationDesc') },
    { icon: 'expand', title: t('features.scalable'), desc: t('features.scalableDesc') },
  ];

  return (
    <section id="os" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-label-md mb-3 uppercase tracking-widest text-primary">{t('title')}</p>
            <h2 className="text-headline-lg mb-5">{t('subtitle')}</h2>
            <p className="mb-6 text-body-lg text-on-surface-variant">
              {t('description')}
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="material-symbols-outlined mt-0.5 text-[22px] text-primary">{f.icon}</span>
                  <div>
                    <p className="text-[16px] font-medium text-on-surface">{f.title}</p>
                    <p className="text-[14px] leading-snug text-on-surface-variant">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/diagnosis`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)]"
            >
              {t('cta')}
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -right-10 top-1/2 -z-10 size-72 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
            <TerminalCard
              title={t('agents.title')}
              subtitle={t('agents.subtitle')}
              osTitle={t('agents.osTitle')}
              online={t('agents.online')}
              statusRunning={t('agents.statusRunning')}
              statusStandby={t('agents.statusStandby')}
              agents={[
                { name: t('agents.salesInquiry'), color: '#62aef0', progress: 92 },
                { name: t('agents.contractQuote'), color: '#d6b6f6', progress: 78 },
                { name: t('agents.knowledgeBase'), color: '#1aae39', progress: 64 },
                { name: t('agents.approvalFlow'), color: '#dd5b00', progress: 45 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
