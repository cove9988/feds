'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const brandColors = ['#62aef0', '#dd5b00', '#2a9d99', '#213183', '#ff64c8', '#62aef0', '#dd5b00', '#8b919e'];

export default function DiagnosisForm() {
  const t = useTranslations('diagnosis');
  const site = useTranslations('site');
  const stepLabels = t.raw('stepLabels') as string[];
  const industries = (t.raw('industries') as { name: string; sub: string; icon: string; color: string }[]).map(
    (ind, i) => ({ ...ind, color: brandColors[i] })
  );
  const companySizes = t.raw('companySizes') as string[];
  const regions = t.raw('regions') as string[];
  const painPoints = t.raw('painPoints') as string[];
  const [step, setStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitting(true);
    const industry = selectedIndustry ? `行业: ${selectedIndustry}` : '';
    const companySize = size ? `公司规模: ${size}` : '';
    const regionVal = region ? `地区: ${region}` : '';
    const pain = selectedPainPoints.length ? `业务痛点:\n${selectedPainPoints.map((p) => `  - ${p}`).join('\n')}` : '';
    const contact = `联系方式:\n  公司: ${form.company}\n  联系人: ${form.name}\n  邮箱: ${form.email}\n  电话: ${form.phone || '未填写'}`;
    const body = encodeURIComponent([industry, companySize, regionVal, pain, contact].filter(Boolean).join('\n\n'));
    window.location.href = `mailto:cover9988@gmail.com?subject=${encodeURIComponent(t('title'))}&body=${body}`;
    setSubmitted(true);
  }

  function togglePainPoint(point: string) {
    setSelectedPainPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  }

  const isStepValid = () => {
    if (step === 0) return selectedIndustry !== null;
    if (step === 1) return size !== null && region !== null;
    if (step === 2) return selectedPainPoints.length > 0;
    if (step === 3) return form.name && form.email && form.company;
    return true;
  };

  return (
    <div className="min-h-screen bg-canvas-soft">
      {/* Nav */}
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-hairline bg-surface">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-on-surface">
            <img alt={site('brand')} width="56" height="56" className="shrink-0" src="/tiger-logo.svg" />
            <span className="text-headline-md font-bold tracking-tight text-current">{site('brand')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-[14px] text-ink-secondary transition-colors hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Header banner */}
      <header className="bg-secondary pb-16 pt-24 text-center text-on-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-label-sm uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-green" />
            {t('title')}
          </div>
          <h1 className="text-headline-lg mb-2">{t('heading')}</h1>
          <p className="text-[15px] opacity-90">{t('subheading')}</p>
        </div>
      </header>

      {/* Main form */}
      <main className="relative z-10 mx-auto -mt-10 max-w-3xl px-6 pb-24">
        <div className="overflow-hidden rounded-[16px] border border-hairline bg-surface shadow-soft">
          {/* Step indicator */}
          <div className="border-b border-hairline bg-surface-low px-6 py-6 sm:px-8">
            <div className="flex w-full items-center gap-3 sm:gap-4">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-3 last:flex-none">
                  <div className="flex items-center gap-2">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                      i <= step ? 'bg-primary text-white' : 'border border-hairline bg-surface text-ink-muted'
                    }`}>{i + 1}</span>
                    <span className={`hidden text-[14px] font-medium sm:inline ${i <= step ? 'text-primary' : 'text-ink-muted'}`}>{label}</span>
                  </div>
                  {i < stepLabels.length - 1 && <div className="h-px flex-1 bg-hairline" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="min-h-[360px] p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="text-headline-md mb-1">{t('step0Title')}</h2>
                <p className="mb-6 text-[14px] text-ink-muted">{t('step0Desc')}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.name}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.name)}
                      className={`group flex items-center gap-4 rounded-[12px] border p-4 text-left transition-all ${
                        selectedIndustry === ind.name
                          ? 'border-primary bg-primary/5'
                          : 'border-hairline bg-surface hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${ind.color}26` }}>
                        <span className="material-symbols-outlined text-[24px]" style={{ color: ind.color }}>{ind.icon}</span>
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-medium text-on-surface">{ind.name}</span>
                        <span className="block text-[12px] text-ink-muted">{ind.sub}</span>
                      </span>
                      <span className={`grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${
                        selectedIndustry === ind.name ? 'border-primary bg-primary' : 'border-hairline'
                      }`}>
                        {selectedIndustry === ind.name && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-headline-md mb-1">{t('step1Title')}</h2>
                <p className="mb-6 text-[14px] text-ink-muted">{t('step1Desc')}</p>
                <div className="mb-6">
                  <p className="text-[13px] font-medium text-on-surface mb-3">{t('form.employees')}</p>
                  <div className="flex flex-wrap gap-2">
                    {companySizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                          size === s ? 'border-primary bg-primary/10 text-primary' : 'border-hairline text-ink-secondary hover:border-primary/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-on-surface mb-3">{t('region')}</p>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRegion(r)}
                        className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                          region === r ? 'border-primary bg-primary/10 text-primary' : 'border-hairline text-ink-secondary hover:border-primary/40'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-headline-md mb-1">{t('step2Title')}</h2>
                <p className="mb-6 text-[14px] text-ink-muted">{t('step2Desc')}</p>
                <div className="space-y-3">
                  {painPoints.map((point) => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => togglePainPoint(point)}
                      className={`flex w-full items-center gap-3 rounded-[12px] border p-4 text-left transition-all ${
                        selectedPainPoints.includes(point)
                          ? 'border-primary bg-primary/5'
                          : 'border-hairline bg-surface hover:border-primary/40'
                      }`}
                    >
                      <span className={`grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${
                        selectedPainPoints.includes(point) ? 'border-primary bg-primary' : 'border-hairline'
                      }`}>
                        {selectedPainPoints.includes(point) && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                      </span>
                      <span className="text-[14px] text-on-surface">{point}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-headline-md mb-1">{t('step3Title')}</h2>
                <p className="mb-6 text-[14px] text-ink-muted">{t('step3Desc')}</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-on-surface mb-1.5">{t('form.companyName')}</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-[14px] text-on-surface placeholder:text-ink-faint focus:outline-none focus:border-primary"
                      placeholder={t('form.companyNamePlaceholder')}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[13px] font-medium text-on-surface mb-1.5">{t('form.contactName')}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-[14px] text-on-surface placeholder:text-ink-faint focus:outline-none focus:border-primary"
                        placeholder={t('form.contactNamePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-on-surface mb-1.5">{t('form.contactEmail')}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-[14px] text-on-surface placeholder:text-ink-faint focus:outline-none focus:border-primary"
                        placeholder={t('form.contactEmailPlaceholder')}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-on-surface mb-1.5">{t('form.phoneOptional')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-[14px] text-on-surface placeholder:text-ink-faint focus:outline-none focus:border-primary"
                      placeholder={t('form.phonePlaceholder')}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-hairline bg-surface-low px-6 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-[14px] text-ink-secondary transition-colors hover:text-primary disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              {t('prev')}
            </button>
            {step < stepLabels.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-primary/80 disabled:opacity-40"
              >
                {t('next')}
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : submitted ? (
              <div className="flex items-center gap-2 text-[14px] text-green">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {t('form.success')}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || submitting}
                className="flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-primary/80 disabled:opacity-40"
              >
                {submitting ? t('form.submitting') || 'Sending...' : t('form.submit')}
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
