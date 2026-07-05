import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

function InsuranceMockup() {
  return (
    <div className="flex h-full flex-col justify-center bg-gradient-to-br from-[#0a1628] to-[#1a2a4a] px-5">
      <p className="text-[8px] tracking-[0.25em] text-white/50">INSURANCE · PROTECTION</p>
      <p className="mt-1 font-serif text-[22px] leading-tight text-white">
        InsureGuard<br /><span className="text-[#62aef0]">Protect</span>
      </p>
      <div className="mt-3 flex gap-1.5">
        <span className="rounded-full bg-[#62aef0] px-2.5 py-1 text-[7px] text-[#06243d]">Get a Quote</span>
        <span className="rounded-full border border-white/30 px-2.5 py-1 text-[7px] text-white/80">File a Claim</span>
      </div>
    </div>
  );
}

function AdvisoryMockup({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-[#0c1322] to-[#13203a]">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2">
        <span className="size-2.5 rounded-full bg-[#62aef0]" />
        <span className="text-[9px] font-bold tracking-wider text-white/85">DAHU ADVISORY</span>
        <div className="ml-auto flex gap-1">
          {['EN', 'CN', 'TC'].map((l) => (
            <span key={l} className="rounded bg-white/10 px-1.5 py-0.5 text-[7px] text-white/70">{l}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-5">
        <p className="text-[15px] font-semibold text-white">{isEn ? 'Multilingual Secretarial Services' : '多语言企业秘书服务'}</p>
        <p className="mt-1 text-[9px] text-white/55">{isEn ? 'Risk · Accounting · Compliance' : '风控 · 财务做账 · 合规咨询'}</p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-full bg-[#62aef0] px-2.5 py-1 text-[7px] text-[#06243d]">{isEn ? 'Book Now' : '预约咨询'}</span>
          <span className="rounded-full border border-white/25 px-2.5 py-1 text-[7px] text-white/80">{isEn ? 'Services' : '服务介绍'}</span>
        </div>
      </div>
    </div>
  );
}

function QuantMockup() {
  return (
    <div className="flex h-full bg-gradient-to-br from-[#0a1628] to-[#1a1a2e]">
      <div className="flex w-12 flex-col gap-1.5 border-r border-white/5 bg-white/[0.02] p-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1.5 rounded bg-white/8" />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-5 items-center justify-center rounded bg-[#2a9d99]/30">
            <div className="size-2.5 rounded-full bg-[#2a9d99]" />
          </div>
          <span className="text-[8px] font-bold tracking-wider text-white/80">QUANT PRO</span>
        </div>
        <div className="flex flex-1 items-end gap-1.5">
          {[70, 90, 55, 75, 85, 45].map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="h-0.5 w-3 rounded bg-white/15" />
              <div className="w-full rounded-t" style={{ height: `${h}%`, background: ['#62aef0', '#2a9d99', '#ffb74d', '#e05252', '#d6b6f6', '#62aef0'][i] }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsultingMockup() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-[#0f0c29] to-[#302b63]">
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
        <div className="flex size-4 items-center justify-center rounded-full bg-[#d6b6f6]/30">
          <div className="size-2 rounded-full bg-[#d6b6f6]" />
        </div>
        <span className="text-[7px] font-bold tracking-wider text-white/80">AI CONSULT</span>
        <span className="ml-auto rounded bg-[#62aef0]/20 px-1.5 py-0.5 text-[6px] text-[#62aef0]">LIVE</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3">
        {[{ left: true, w: 'w-3/4' }, { left: false, w: 'w-1/2' }, { left: true, w: 'w-2/3' }, { left: false, w: 'w-3/5' }, { left: true, w: 'w-4/5' }].map((msg, i) => (
          <div key={i} className={`flex ${msg.left ? 'justify-start' : 'justify-end'}`}>
            <div className={`rounded-lg px-2 py-1 ${msg.left ? 'bg-white/10' : 'bg-[#62aef0]/20'}`}>
              <div className="h-1 w-6 rounded-full bg-white/20" />
              <div className="mt-0.5 h-1 rounded-full bg-white/10" style={{ width: `${msg.w === 'w-1/2' ? 12 : msg.w === 'w-3/5' ? 16 : 20}px` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-t border-white/5 px-3 py-1.5">
        <div className="h-1.5 flex-1 rounded-full bg-white/10" />
        <div className="rounded-full bg-[#d6b6f6] px-2 py-0.5 text-[6px] font-semibold text-[#1a1a2e]">Send</div>
      </div>
    </div>
  );
}

function StrategyMockup() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
        <div className="flex size-4 items-center justify-center rounded bg-[#ffb74d]/30">
          <div className="size-2 rounded-full bg-[#ffb74d]" />
        </div>
        <span className="text-[7px] font-bold tracking-wider text-white/80">STRAT ADVISORY</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-3">
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-[#62aef0]" />
          <div className="h-1.5 w-2/5 rounded-full bg-white/15" />
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2">
          <div className="mb-1.5 flex items-center gap-2">
            <div className="flex size-4 items-center justify-center rounded bg-[#62aef0]/20">
              <div className="size-1.5 rounded-full bg-[#62aef0]" />
            </div>
            <div className="h-1.5 w-1/3 rounded-full bg-[#62aef0]/30" />
          </div>
          <div className="space-y-1">
            {[80, 55, 65].map((w, i) => (
              <div key={i} className="h-1 rounded-full bg-white/8" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="h-1 flex-1 rounded-full bg-[#ffb74d]/15" />
          <div className="h-1 flex-1 rounded-full bg-white/8" />
          <div className="h-1 flex-1 rounded-full bg-white/8" />
        </div>
      </div>
    </div>
  );
}

function buildCases(locale: string): Array<{ badge: string; title: string; desc: string; url: string; mockup: ReactNode }> {
  const isEn = locale === 'en';
  return [
    {
      badge: 'PRODUCT',
      title: 'InsureGuard',
      desc: isEn ? 'Insurance brand website with policy lookup, claims portal, and AI quote engine.' : '保险品牌官网，集成保单查询、理赔入口与 AI 智能报价引擎。',
      url: 'https://insureguard.example.com',
      mockup: <InsuranceMockup />,
    },
    {
      badge: 'SERVICE',
      title: 'Dahu Advisory',
      desc: isEn ? 'Multilingual corporate secretarial services with built-in risk, accounting systems.' : '多语言秘书公司服务官网，内建风控、财务做账系统。',
      url: 'https://6amadvise.com/zh',
      mockup: <AdvisoryMockup locale={locale} />,
    },
    {
      badge: 'PRODUCT',
      title: isEn ? 'Quant Trading Platform' : '量化交易平台',
      desc: isEn ? 'Data ingestion, backtesting, live trading, strategy iteration.' : '数据获取、回测、实盘交易与策略迭代一体化平台。',
      url: 'mailto:sales@dahu.ai?subject=' + (isEn ? 'Quant Trading Platform' : '我想了解量化交易平台'),
      mockup: <QuantMockup />,
    },
    {
      badge: 'SERVICE',
      title: isEn ? 'AI Consulting' : 'AI 咨询',
      desc: isEn ? 'Hourly AI strategy consulting — workflow audit, opportunity mapping, roadmap planning.' : '按小时计费的 AI 战略咨询——工作流审计、机会图谱与路线图规划。',
      url: 'mailto:sales@dahu.ai?subject=' + (isEn ? 'AI Consulting inquiry' : 'AI 咨询'),
      mockup: <ConsultingMockup />,
    },
    {
      badge: 'SERVICE',
      title: isEn ? 'Strategy Advisory' : '战略顾问',
      desc: isEn ? 'Executive AI advisory sessions — capability assessment, vendor selection, governance.' : '高管级 AI 顾问服务——能力评估、供应商选型与治理框架。',
      url: 'mailto:sales@dahu.ai?subject=' + (isEn ? 'Strategy Advisory inquiry' : '战略顾问咨询'),
      mockup: <StrategyMockup />,
    },
  ];
}

type Props = { locale: string };

export default async function CasesCarousel({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home.cases' });
  const caseTranslations = t.raw('items') as Array<{ title: string; description: string }>;
  const cases = buildCases(locale);

  return (
    <section id="cases" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-headline-lg">{t('title')}</h2>
            <p className="mt-3 text-body-md text-on-surface-variant">{t('subtitle')}</p>
          </div>
          <span className="text-label-sm tracking-normal text-on-surface-variant/60">{t('scrollHint')}</span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x gap-5">
          {cases.map((c, idx) => (
            <a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-[300px] shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
            >
              {/* Traffic light bar */}
              <div className="border-b border-[#ececec] bg-[#f4f3f2] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="size-2.5 rounded-full bg-[#febc2e]" />
                  <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
              </div>
              {/* Mockup area */}
              <div className="h-44 overflow-hidden">{c.mockup}</div>
              {/* Info area */}
              <div className="p-5">
                <span className="inline-block rounded-full bg-[#1aae39]/12 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#13772a]">{c.badge}</span>
                <h3 className="mt-3 text-[20px] font-bold text-[#1c1b1b]">{caseTranslations[idx]?.title || c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#615d59]">{caseTranslations[idx]?.description || c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#13772a]">
                  {locale === 'en' ? 'Visit Website' : '访问网站'}<span className="material-symbols-outlined text-[16px]">north_east</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
