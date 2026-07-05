# SixamTech Website Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the current Next.js project visually and functionally identical to the sixamtech.ai mirror at `/tmp/sixamtech-download/sixamtech/`.

**Architecture:** Rebuild all pages as server components with isolated client islands (canvas, language dropdown, diagnosis wizard). Each section is a separate component file. i18n messages already exist for most content — add missing keys.

**Tech Stack:** Next.js 16 App Router, next-intl, Tailwind CSS v4, React 19 Server Components

---

### Task 1: Copy Assets + Update Theme

**Files:**
- Copy: `public/chenqi-logo.png`
- Copy: `public/apple-icon.png`
- Copy: `public/icon.png`
- Copy: `public/manifest.webmanifest`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Copy static assets from reference**

```bash
cp /tmp/sixamtech-download/sixamtech/assets/chenqi-logo.png public/
cp /tmp/sixamtech-download/sixamtech/assets/apple-icon.png public/
cp /tmp/sixamtech-download/sixamtech/assets/icon.png public/
cp /tmp/sixamtech-download/sixamtech/assets/manifest.webmanifest public/
```

- [ ] **Step 2: Add missing theme tokens and utilities to globals.css**

Add after the existing `@theme` block:

```css
@utility text-headline-xl {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
}
@utility text-headline-lg {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
@utility text-headline-md {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}
@utility text-body-lg {
  font-size: 16px;
  line-height: 1.6;
}
@utility text-body-md {
  font-size: 14px;
  line-height: 1.5;
}
@utility text-label-sm {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
@utility text-label-md {
  font-size: 13px;
  font-weight: 500;
}
```

Also add `--color-green` and `--color-surface-low` to the `@theme`:

```css
  --color-green: #1aae39;
  --color-surface-low: var(--surface-container-low);
```

And add these utilities:

```css
@utility text-glow {
  text-shadow: 0 0 20px rgba(168, 200, 255, 0.5), 0 0 40px rgba(168, 200, 255, 0.3);
}
```

Add animations for the pulse used in the CTA section:

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

- [ ] **Step 3: Verify dev server still works**

```bash
rm -rf .next && npm run dev &
sleep 5 && curl -s http://localhost:3001 | head -c 200
```

---

### Task 2: Update i18n Messages

**Files:**
- Modify: `src/messages/zh.json`
- Modify: `src/messages/en.json`
- Modify: `src/messages/ja.json`

- [ ] **Step 1: Add core values, industries, cases, team, process keys to zh.json**

Add to `home` object:

```json
"coreValues": {
  "title": "核心价值",
  "cards": [
    { "title": "原生智能", "icon": "psychology", "description": "拒绝表层集成。把 AI 与你的核心业务逻辑深度耦合，实现真正的生产力飞跃。" },
    { "title": "精准可靠", "icon": "verified", "description": "多层验证与 RAG 技术，确保每个结论都有据可依，满足工业级稳定性。" },
    { "title": "闭环演进", "icon": "hub", "description": "系统内置自我优化机制。随业务运行不断学习领域知识，越用越聪明。" }
  ]
},
"industries": {
  "title": "服务各行各业",
  "subtitle": "从珠宝、基金、材料工厂到交易平台、律所——不同行业，同一套 AI 落地方法论",
  "items": [
    { "name": "珠宝品牌", "icon": "diamond" },
    { "name": "合规基金", "icon": "account_balance" },
    { "name": "材料 / 化工工厂", "icon": "factory" },
    { "name": "量化交易平台", "icon": "monitoring" },
    { "name": "律师事务所", "icon": "gavel" },
    { "name": "医疗健康", "icon": "medical_services" },
    { "name": "跨境电商", "icon": "shopping_cart" },
    { "name": "专业服务", "icon": "handshake" }
  ]
},
"cases": {
  "title": "部分交付案例",
  "subtitle": "官网、内部系统到 AI 工作流——已经在真实业务里跑起来",
  "scrollHint": "← 左右滑动查看更多 →",
  "items": [
    {
      "badge": "OFFICIAL WEBSITE",
      "title": "SFS Diamonds",
      "description": "珠宝品牌官网，突出产品展示、询盘、线上下单。",
      "url": "https://sfsdiamonds.com/sfsdiamond",
      "mockupBg": "from-[#0a0a0c] to-[#241a12]",
      "mockupContent": { "type": "brand", "sub": "MEMORIAL DIAMOND · CVD", "brand": "For Forever", "accent": "Love", "accentColor": "#d8b06a", "buttons": ["Place Order", "Explore"] }
    },
    {
      "badge": "OFFICIAL WEBSITE",
      "title": "6AM Advisory",
      "description": "多语言秘书公司服务官网，内建风控、财务做账系统。",
      "url": "https://6amadvise.com/zh",
      "mockupBg": "from-[#0c1322] to-[#13203a]",
      "mockupContent": { "type": "saas", "title": "6AM ADVISORY", "langs": ["EN", "中", "繁"], "heading": "多语言企业秘书服务", "sub": "风控 · 财务做账 · 合规咨询", "accentColor": "#62aef0", "buttons": ["预约咨询", "服务介绍"] }
    },
    {
      "badge": "OFFICIAL WEBSITE",
      "title": "Cosmo Coat",
      "description": "涂料品牌官网，企业形象升级，内建内部 ERP 后台，AI 售后咨询。",
      "url": "http://cosmocoat.cn/cosmocoat",
      "mockupBg": "from-[#12100e] to-[#1f1814]",
      "mockupContent": { "type": "brand", "sub": "COATINGS · 工业涂料", "brand": "COSMO", "brand2": "COAT", "accentColor": "#e0a96d", "button": "了解产品", "colorBar": ["#2a9d99", "#dd5b00", "#62aef0", "#d6b6f6", "#1aae39"] }
    },
    {
      "badge": "INTERNAL APP",
      "title": "量化交易平台（线下演示）",
      "description": "数据获取，回测系统，实盘交易，策略迭代。",
      "url": "mailto:sales@sixamtech.ai?subject=我想了解内部应用案例",
      "mockupContent": { "type": "chart", "bars": [70, 90, 55, 75] }
    },
    {
      "badge": "INTERNAL ERP",
      "title": "化工厂 ERP",
      "description": "配方管理、生产单、打样与原料库存，专为化工制造场景定制的全流程内部系统。",
      "url": "mailto:sales@sixamtech.ai?subject=我想了解内部应用案例",
      "mockupContent": { "type": "form", "fields": 4 }
    }
  ]
},
"team": {
  "title": "个个都是身经百战的「超级个体」",
  "description": "我们不是资源外包平台，也不是人员堆砌的大公司。核心团队由三种稀缺背景交叉而成：深耕行业的企业服务老将、亲手构建过 AI 产品的公司 CTO、以及头部大厂走出来的 AI 工程师。",
  "highlight": "懂业务 × 懂产品 × 懂工程，三者缺一",
  "tagline": "正是市面上大多数 AI 项目失败的根本原因。",
  "tags": ["复旦大学", "Rice 大学", "亚马逊 AWS", "腾讯云", "阿里巴巴"],
  "members": [
    {
      "name": "资深企业服务行业专家",
      "role": "行业老将 · 业务架构师",
      "description": "十余年企业服务与业务系统落地经验，深度服务过制造、零售、金融等行业头部客户。擅长从混沌的业务现状中识别真实痛点，设计真正解决问题的系统路径——懂业务，才知道哪里值得用 AI 改造，哪里改了也没用。",
      "icon": "business_center",
      "gradient": "from-[#62aef0] to-[#62aef099]",
      "tags": ["企业服务", "业务系统设计", "超大型企业平台", "数字化转型"]
    },
    {
      "name": "AI 技术负责人",
      "role": "硅谷背景 · AI 产品架构师",
      "description": "硅谷出身的复合型 AI 专家——前 AWS 软件工程师、前腾讯云产品经理，横跨工程与产品两端。美国 Rice 大学数据科学硕士。深耕大模型应用与 AI 智能体研发，擅长把前沿 AI 从零到一落地为可持续运转的企业级系统——不止会用 AI，更懂如何把它嵌进真实业务、持续创造价值。",
      "icon": "smart_toy",
      "gradient": "from-[#d6b6f6] to-[#d6b6f699]",
      "tags": ["硅谷", "大模型应用", "AI Agent", "AWS · 腾讯云"]
    },
    {
      "name": "FDE 专家",
      "role": "解决方案架构师 · 全栈交付",
      "description": "复旦大学硕士，来自国内头部科技公司的 AI 基础设施与应用团队，具备大规模模型训练、推理优化与 Agentic 系统工程化的一线实战经验。作为 FDE 驻场，把业务需求拆解为可落地的解决方案架构，并以大厂级工程标准全栈交付——不是玩具 Demo，而是能在生产环境稳定运行的真实产品。",
      "icon": "terminal",
      "gradient": "from-[#1aae39] to-[#1aae3999]",
      "tags": ["FDE 驻场", "解决方案架构", "AI 工程化", "全栈开发"]
    },
    {
      "name": "AI 安全顾问",
      "role": "阿里安全专家 · 安全项目创始人",
      "description": "来自阿里巴巴的安全专家、安全项目创始人，深耕 AI 智能体安全与企业级安全实战，是 AI 智能体协作领域的顶级团队核心。我们把「安全」与「好用」放在同等位置：从数据合规、权限边界到 Agent 行为可控，每个 AI 产品落地前都经过安全视角审视，让你放心拥抱 AI。",
      "icon": "shield",
      "gradient": "from-[#dd5b00] to-[#dd5b0099]",
      "tags": ["阿里安全", "安全项目创始人", "AI Agent 安全", "数据合规"]
    }
  ]
},
"process": {
  "label": "FDE · Forward Deployed Engineer",
  "title": "把「想用 AI」变成「真正在用 AI」的人",
  "description": "老板知道痛点，却不知道 AI 怎么用；工程师掌握技术，却难以转化为业务方案。这中间的鸿沟，正是 FDE 存在的意义——既读懂业务逻辑，又驱动 AI 系统落地，把两端打通，才有真正有价值的产出。",
  "steps": [
    { "number": "01", "title": "诊断", "icon": "stethoscope", "description": "找出当前最影响业务的技术问题与数据现状。" },
    { "number": "02", "title": "拆解", "icon": "account_tree", "description": "划分必须做 / 可以等 / 暂不做，守住预算边界。" },
    { "number": "03", "title": "交付", "icon": "deployed_code", "description": "AI 工具加速，快速上线可维护、可扩展的版本。" },
    { "number": "04", "title": "迭代", "icon": "autorenew", "description": "按真实使用反馈持续升级，系统随业务一起演进。" }
  ]
},
"cta": {
  "title": "准备好开启企业的 AI 原生进化了吗？",
  "description": "填一份 2–4 分钟的免费诊断，我们将为你提供一份专属的 AI 实施蓝图与切入点分析。",
  "diagnosis": "开启免费诊断",
  "contact": "联系我们"
}
```

- [ ] **Step 2: Add same keys to en.json** (English translations)

```json
"coreValues": {
  "title": "Core Values",
  "cards": [
    { "title": "Native Intelligence", "icon": "psychology", "description": "No surface-level integration. Deeply couple AI with your core business logic for true productivity leaps." },
    { "title": "Precision & Reliability", "icon": "verified", "description": "Multi-layer validation and RAG technology ensure every conclusion is evidence-based, meeting industrial-grade stability." },
    { "title": "Closed-Loop Evolution", "icon": "hub", "description": "Built-in self-optimization. The system continuously learns domain knowledge as your business runs, getting smarter over time." }
  ]
},
"industries": {
  "title": "Industries We Serve",
  "subtitle": "From jewelry, funds, and materials factories to trading platforms and law firms — different industries, same AI methodology",
  "items": [
    { "name": "Jewelry Brands", "icon": "diamond" },
    { "name": "Compliant Funds", "icon": "account_balance" },
    { "name": "Materials & Chemicals", "icon": "factory" },
    { "name": "Quant Trading", "icon": "monitoring" },
    { "name": "Law Firms", "icon": "gavel" },
    { "name": "Healthcare", "icon": "medical_services" },
    { "name": "Cross-border E-com", "icon": "shopping_cart" },
    { "name": "Professional Services", "icon": "handshake" }
  ]
},
"cases": {
  "title": "Delivery Cases",
  "subtitle": "From websites to internal systems to AI workflows — running in real businesses",
  "scrollHint": "← Scroll left/right for more →",
  "items": [
    { "badge": "OFFICIAL WEBSITE", "title": "SFS Diamonds", "description": "Jewelry brand website showcasing products, inquiries, online ordering.", "url": "https://sfsdiamonds.com/sfsdiamond", "mockupBg": "from-[#0a0a0c] to-[#241a12]", "mockupContent": { "type": "brand", "sub": "MEMORIAL DIAMOND · CVD", "brand": "For Forever", "accent": "Love", "accentColor": "#d8b06a", "buttons": ["Place Order", "Explore"] } },
    { "badge": "OFFICIAL WEBSITE", "title": "6AM Advisory", "description": "Multilingual corporate secretarial services with built-in risk, accounting systems.", "url": "https://6amadvise.com/zh", "mockupBg": "from-[#0c1322] to-[#13203a]", "mockupContent": { "type": "saas", "title": "6AM ADVISORY", "langs": ["EN", "中", "繁"], "heading": "Multilingual Secretarial Services", "sub": "Risk · Accounting · Compliance", "accentColor": "#62aef0", "buttons": ["Book Now", "Services"] } },
    { "badge": "OFFICIAL WEBSITE", "title": "Cosmo Coat", "description": "Coatings brand website with internal ERP and AI after-sales support.", "url": "http://cosmocoat.cn/cosmocoat", "mockupBg": "from-[#12100e] to-[#1f1814]", "mockupContent": { "type": "brand", "sub": "COATINGS · 工业涂料", "brand": "COSMO", "brand2": "COAT", "accentColor": "#e0a96d", "button": "Explore", "colorBar": ["#2a9d99", "#dd5b00", "#62aef0", "#d6b6f6", "#1aae39"] } },
    { "badge": "INTERNAL APP", "title": "Quant Trading Platform", "description": "Data ingestion, backtesting, live trading, strategy iteration.", "url": "mailto:sales@sixamtech.ai?subject=I want to learn about internal cases", "mockupContent": { "type": "chart", "bars": [70, 90, 55, 75] } },
    { "badge": "INTERNAL ERP", "title": "Chemical Plant ERP", "description": "Formula management, production orders, sampling, inventory — full-flow internal system for chemical manufacturing.", "url": "mailto:sales@sixamtech.ai?subject=I want to learn about internal cases", "mockupContent": { "type": "form", "fields": 4 } }
  ]
},
"team": {
  "title": "Battle-Hardened Super Individuals",
  "description": "We are not an outsourcing platform or a people-stacked corporation. Our core team blends three rare backgrounds: veteran enterprise service experts, AI-product-building CTOs, and AI engineers from top tech companies.",
  "highlight": "Business × Product × Engineering — missing any one",
  "tagline": "is why most AI projects fail.",
  "tags": ["Fudan University", "Rice University", "Amazon AWS", "Tencent Cloud", "Alibaba"],
  "members": [
    { "name": "Senior Enterprise Service Expert", "role": "Industry Veteran · Business Architect", "description": "Over a decade in enterprise services, deeply serving manufacturing, retail, and finance clients. Expert at identifying real pain points in chaotic business environments and designing systems that solve them.", "icon": "business_center", "gradient": "from-[#62aef0] to-[#62aef099]", "tags": ["Enterprise Service", "System Design", "Large-scale Platforms", "Digital Transformation"] },
    { "name": "AI Technical Lead", "role": "Silicon Valley · AI Product Architect", "description": "A hybrid AI expert from Silicon Valley — former AWS engineer and Tencent Cloud PM, spanning engineering and product. MS in Data Science from Rice University. Deep expertise in LLM applications and AI agent development.", "icon": "smart_toy", "gradient": "from-[#d6b6f6] to-[#d6b6f699]", "tags": ["Silicon Valley", "LLM Applications", "AI Agent", "AWS · Tencent Cloud"] },
    { "name": "FDE Specialist", "role": "Solution Architect · Full-stack Delivery", "description": "Master's from Fudan University, from a top Chinese tech company's AI infrastructure team. Experience in large-scale model training, inference optimization, and Agentic system engineering.", "icon": "terminal", "gradient": "from-[#1aae39] to-[#1aae3999]", "tags": ["FDE On-site", "Solution Architecture", "AI Engineering", "Full-stack"] },
    { "name": "AI Security Advisor", "role": "Alibaba Security Expert · Startup Founder", "description": "Security expert from Alibaba and founder of a security startup. Deep expertise in AI agent security and enterprise security practices.", "icon": "shield", "gradient": "from-[#dd5b00] to-[#dd5b0099]", "tags": ["Alibaba Security", "Security Startup", "AI Agent Security", "Data Compliance"] }
  ]
},
"process": {
  "label": "FDE · Forward Deployed Engineer",
  "title": "The People Who Make AI Actually Work for You",
  "description": "Bosses know the pain points but not how AI helps; engineers have the skills but can't translate to business value. This gap is why FDEs exist — understanding both business logic and AI systems, bridging the two for real output.",
  "steps": [
    { "number": "01", "title": "Diagnose", "icon": "stethoscope", "description": "Identify the most impactful technical problems and data status." },
    { "number": "02", "title": "Break Down", "icon": "account_tree", "description": "Prioritize: must-do / can-wait / skip — protect your budget." },
    { "number": "03", "title": "Deliver", "icon": "deployed_code", "description": "AI-accelerated delivery of maintainable, scalable versions." },
    { "number": "04", "title": "Iterate", "icon": "autorenew", "description": "Continuous upgrades based on real usage feedback." }
  ]
},
"cta": {
  "title": "Ready to Start Your AI-Native Evolution?",
  "description": "Fill out a 2-4 minute free diagnosis and we'll provide a custom AI implementation blueprint.",
  "diagnosis": "Start Free Diagnosis",
  "contact": "Contact Us"
}
```

- [ ] **Step 3: Add same keys to ja.json** (Japanese translations)

(Translate similarly to ja.json following existing patterns)

---

### Task 3: Build Header Component

**Files:**
- Create: `src/app/[locale]/_components/header.tsx`
- Create: `src/app/[locale]/_components/language-dropdown.tsx`

- [ ] **Step 1: Create LanguageDropdown component**

```tsx
'use client';
import { useParams, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';

const localeLabels: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
};

export default function LanguageDropdown() {
  const params = useParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLocale = params.locale as string;

  function switchLocale(nextLocale: string) {
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    window.location.href = segments.join('/');
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="切换语言 / Language"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors border-white/10 bg-white/[0.03] text-on-surface-variant hover:border-primary/40 hover:text-primary"
      >
        <span className="material-symbols-outlined text-[20px]">language</span>
        <span className="text-label-md tracking-normal">{localeLabels[currentLocale] || currentLocale}</span>
        <span className={`material-symbols-outlined text-[18px] transition-transform ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-surface-container-high shadow-xl">
          {routing.locales.map((locale) => {
            const isActive = currentLocale === locale;
            return (
              <button
                key={locale}
                onClick={() => { switchLocale(locale); setOpen(false); }}
                disabled={isActive}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-white/[0.03] hover:text-on-surface'
                }`}
              >
                <span className={`text-xs ${isActive ? 'text-primary' : 'text-ink-faint'}`}>
                  {locale === 'zh' ? '中' : locale === 'en' ? 'EN' : '日'}
                </span>
                <span>{localeLabels[locale]}</span>
                {isActive && <span className="ml-auto material-symbols-outlined text-[16px]">check</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create Header component**

```tsx
import Link from 'next/link';
import LanguageDropdown from './language-dropdown';

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  const navLinks = [
    { href: '#value', label: '核心价值' },
    { href: '#os', label: 'AI 操作系统' },
    { href: '#services', label: '服务' },
    { href: '#cases', label: '案例' },
    { href: '#team', label: '团队' },
    { href: '#process', label: '流程' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-on-surface">
          <img alt="晨启科技" width="28" height="28" decoding="async" className="shrink-0" src="/chenqi-logo.png" />
          <span className="text-headline-md font-bold tracking-tight text-current">晨启科技</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageDropdown />
          <Link
            href={`/${locale}/diagnosis`}
            className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)] px-5 py-2 text-[14px]"
          >
            免费 AI 诊断
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

---

### Task 4: Build Footer Component

**Files:**
- Create: `src/app/[locale]/_components/footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
import Link from 'next/link';

type Props = { locale: string };

export default function Footer({ locale }: Props) {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest pt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <span className="inline-flex items-center gap-2 text-on-surface">
              <img alt="晨启科技" width="28" height="28" className="shrink-0" src="/chenqi-logo.png" />
              <span className="text-headline-md font-bold tracking-tight text-current">晨启科技</span>
            </span>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-on-surface-variant">
              企业级 AI 落地服务。派 FDE 驻场，把 AI 长进你的业务流程，大幅节省成本、赢得竞争。
            </p>
            <a href="mailto:sales@sixamtech.ai" className="mt-4 inline-flex items-center gap-1.5 text-[14px] text-primary hover:opacity-80">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              sales@sixamtech.ai
            </a>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">产品与服务</h4>
            <ul className="mt-4 space-y-2.5">
              {[{ href: '#os', label: '企业 AI 操作系统' }, { href: '#services', label: '服务内容' }, { href: '#industries', label: '服务行业' }, { href: '#cases', label: '交付案例' }, { href: '#process', label: 'FDE 流程' }].map((l) => (
                <li key={l.href}><a href={l.href} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">公司</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={`/${locale}/diagnosis`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">免费 AI 诊断</Link></li>
              <li><a href="mailto:sales@sixamtech.ai" className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">联系我们</a></li>
              <li><a href="mailto:sales@sixamtech.ai?subject=加入晨启科技" className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">加入我们</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">法律与隐私</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={`/${locale}/privacy`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">隐私政策</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-[14px] text-on-surface-variant transition-colors hover:text-primary">服务条款</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-label-sm uppercase tracking-wider text-on-surface-variant/60">办公室</h4>
            <ul className="mt-4 space-y-2.5">
              {['海南', '上海', '西雅图', '东京'].map((city) => (
                <li key={city} className="flex items-center gap-2 text-[14px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary/70">location_on</span>
                  {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 py-6 text-[13px] text-on-surface-variant/60 md:flex-row">
          <p>© 2026 晨启科技（6AM TECH）· AI-Native Precision · 保留所有权利</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href={`/${locale}/privacy`} className="hover:text-primary">隐私政策</Link>
            <Link href={`/${locale}/terms`} className="hover:text-primary">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 5: Update Layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Rewrite layout with new header/footer**

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from './_components/header';
import Footer from './_components/footer';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="theme-midnight min-h-screen overflow-x-hidden bg-background text-on-surface">
      <body className="min-h-screen overflow-x-hidden bg-background text-on-surface">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

### Task 6: Build Hero + Canvas + Stats

**Files:**
- Create: `src/app/[locale]/_components/canvas-particles.tsx`
- Create: `src/app/[locale]/_components/hero-section.tsx`
- Create: `src/app/[locale]/_components/stats-grid.tsx`

- [ ] **Step 1: Create CanvasParticles component**

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * (canvas?.width ?? 800),
          y: Math.random() * (canvas?.height ?? 600),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
        });
      }
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 200, 255, 0.4)';
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 200, 255, ${0.15 * (1 - dist / CONNECTION_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', () => { resize(); });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      style={{ display: 'block' }}
    />
  );
}
```

- [ ] **Step 2: Create HeroSection component**

```tsx
import CanvasParticles from './canvas-particles';
import Link from 'next/link';

type Props = { locale: string };

export default function HeroSection({ locale }: Props) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <CanvasParticles />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <div className="space-y-10">
          <div className="glass animate-floaty inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            <span className="text-label-sm tracking-widest text-primary">企业级 AI 落地服务</span>
          </div>
          <h1 className="text-[40px] font-extrabold leading-tight tracking-[-0.04em] lg:text-[64px]">
            让 AI 真正<span className="text-primary text-glow">长进</span>你的业务流程
          </h1>
          <p className="max-w-xl text-body-lg text-on-surface-variant">
            超越通用的对话助手。我们派 FDE 驻场，构建深度整合的 AI 原生系统——精准诊断、闭环优化，
            <span className="text-on-surface">大幅节省企业成本、放大人效</span>
            ，让 AI 成为你赢得竞争的核心资产。
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <Link
              href={`/${locale}/diagnosis`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)]"
            >
              免费 AI 诊断
            </Link>
            <a
              href="#value"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] border border-outline text-on-surface-variant hover:bg-white/[0.03]"
            >
              查看我们怎么做
            </a>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="h-[500px] w-full" />
          <div className="absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create StatsGrid component**

```tsx
const stats = [
  { value: '80%', label: '技术投入降低', desc: 'AI Native 模式替代自建团队' },
  { value: '65%', label: '软件成本节省', desc: '定制系统替代 SaaS 订阅' },
  { value: '70%', label: '人工统计时间减少', desc: '内部管理系统自动化' },
  { value: '3×', label: '管理决策速度提升', desc: '从月报到实时看板' },
  { value: '2 天', label: '最快上线', desc: 'AI 加持的交付效率' },
  { value: '20 分钟', label: '最快响应需求', desc: '全年陪跑持续迭代' },
];

export default function StatsGrid() {
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
```

---

### Task 7: Build Core Values + Why Native

**Files:**
- Create: `src/app/[locale]/_components/core-values.tsx`
- Create: `src/app/[locale]/_components/why-native.tsx`

- [ ] **Step 1: Create CoreValues component**

```tsx
const cards = [
  { icon: 'psychology', title: '原生智能', description: '拒绝表层集成。把 AI 与你的核心业务逻辑深度耦合，实现真正的生产力飞跃。', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: 'verified', title: '精准可靠', description: '多层验证与 RAG 技术，确保每个结论都有据可依，满足工业级稳定性。', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary' },
  { icon: 'hub', title: '闭环演进', description: '系统内置自我优化机制。随业务运行不断学习领域知识，越用越聪明。', iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
];

export default function CoreValues() {
  return (
    <section id="value" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-headline-lg">核心价值</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="glass glow-border rounded-lg p-6">
              <div className={`mb-4 flex size-12 items-center justify-center rounded-lg ${card.iconBg}`}>
                <span className={`material-symbols-outlined text-3xl ${card.iconColor}`}>{card.icon}</span>
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
```

- [ ] **Step 2: Create WhyNative component**

```tsx
export default function WhyNative() {
  return (
    <section id="why" className="border-y border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-label-md mb-2 uppercase tracking-widest text-primary">Why AI Native</p>
            <h2 className="text-headline-lg">为什么选择原生 AI 架构？</h2>
          </div>
          <p className="max-w-md text-body-md text-on-surface-variant">
            传统的「补丁式」AI 无法解决结构化效率问题。只有从底层重新设计的业务流，才能彻底释放机器潜能。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 md:[height:560px]">
          {/* Main card - col-span-7 row-span-2 */}
          <div className="glass glow-border relative overflow-hidden rounded-lg p-8 md:col-span-7 md:row-span-2">
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-[100px]" />
            <div className="relative flex h-full flex-col">
              <span className="material-symbols-outlined mb-4 text-3xl text-primary">architecture</span>
              <h3 className="text-headline-lg mb-3">重构，而非改良</h3>
              <p className="max-w-lg text-body-md text-on-surface-variant">
                我们深入每个业务触点，重新梳理数据流向，构建符合 AI 思维逻辑的新一代业务闭环。
              </p>
              <div className="mt-7 flex-1">
                <div className="grid h-full grid-cols-3 items-center gap-3">
                  {/* Before column */}
                  <div className="space-y-2.5">
                    {['散落的表格', '微信/群聊', '老旧系统', '线下流程'].map((item) => (
                      <div key={item} className="rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-[12px] text-on-surface-variant">{item}</div>
                    ))}
                  </div>
                  {/* Arrow + AI icon */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-xl text-primary/70">east</span>
                    <div className="glass flex size-16 items-center justify-center rounded-full border border-primary/30">
                      <span className="material-symbols-outlined text-2xl text-primary">bolt</span>
                    </div>
                    <span className="text-label-sm tracking-normal text-on-surface-variant">AI 重构</span>
                    <span className="material-symbols-outlined text-xl text-primary/70">east</span>
                  </div>
                  {/* After column */}
                  <div className="space-y-2.5">
                    {[
                      { label: '实时业务看板', color: '#62aef0' },
                      { label: '智能体协同', color: '#d6b6f6' },
                      { label: '可决策数据', color: '#1aae39' },
                      { label: '自动化流程', color: '#dd5b00' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-[12px] text-on-surface">
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.label}
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
            <h3 className="text-headline-md mb-2">毫秒级响应</h3>
            <p className="text-body-md text-on-surface-variant">
              全球边缘部署，确保 AI 逻辑在离用户最近处执行，体验流畅如本地应用。
            </p>
          </div>
          {/* Right bottom card */}
          <div className="glass glow-border rounded-lg p-8 md:col-span-5">
            <span className="material-symbols-outlined mb-4 text-3xl text-tertiary">shield</span>
            <h3 className="text-headline-md mb-2">私有化合规</h3>
            <p className="text-body-md text-on-surface-variant">
              支持私有云部署与关键数据脱敏，确保核心知识资产永不出境，完全可控。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Build Product OS Section

**Files:**
- Create: `src/app/[locale]/_components/product-os.tsx`
- Create: `src/app/[locale]/_components/terminal-card.tsx`

- [ ] **Step 1: Create TerminalCard component**

```tsx
const agents = [
  { name: '销售询盘 Agent', color: '#62aef0', progress: 92, status: '运行中' },
  { name: '合同/报价 Agent', color: '#d6b6f6', progress: 78, status: '运行中' },
  { name: '知识库检索 Agent', color: '#1aae39', progress: 64, status: '运行中' },
  { name: '审批流 Agent', color: '#dd5b00', progress: 45, status: '待命' },
];

export default function TerminalCard() {
  return (
    <div className="glass overflow-hidden rounded-lg">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-label-sm tracking-normal text-on-surface-variant">晨启 · 企业 AI 操作系统</span>
        <span className="ml-auto flex items-center gap-1.5 text-label-sm tracking-normal text-green">
          <span className="size-1.5 animate-pulse rounded-full bg-green" />
          在线
        </span>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-12 flex-col items-center gap-4 border-r border-white/5 py-4 sm:flex">
          {['dashboard', 'smart_toy', 'hub', 'insights', 'settings'].map((icon, i) => (
            <span key={icon} className={`material-symbols-outlined text-[20px] ${i === 1 ? 'text-primary' : 'text-on-surface-variant/60'}`}>{icon}</span>
          ))}
        </div>
        {/* Agent list */}
        <div className="flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-label-sm uppercase tracking-wider text-on-surface-variant">智能体协同 · Agents</span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-label-sm tracking-normal text-primary">全员 AI 协作</span>
          </div>
          <div className="space-y-2.5">
            {agents.map((agent) => (
              <div key={agent.name} className="rounded-md border border-white/5 bg-white/[0.02] p-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] text-on-surface">
                    <span className="size-2 rounded-full" style={{ backgroundColor: agent.color }} />
                    {agent.name}
                  </span>
                  <span className="text-label-sm tracking-normal text-on-surface-variant/70">{agent.status}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${agent.progress}%`, backgroundColor: agent.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ProductOS component**

```tsx
import Link from 'next/link';
import TerminalCard from './terminal-card';

type Props = { locale: string };

export default function ProductOS({ locale }: Props) {
  const features = [
    { icon: 'lock', title: '私有化部署', desc: '数据与流程完全在企业内部掌控，核心资产不出境。' },
    { icon: 'cable', title: '无缝对接现有系统', desc: '把 AI 能力融进你日常在跑的工作流，而非另起炉灶。' },
    { icon: 'groups', title: '全员 AI 协同', desc: '不是让少数人用 AI，而是每位成员都与 AI 协同作战。' },
    { icon: 'expand', title: '可扩展架构', desc: '随业务增长持续构建专属智能体，越用越强。' },
  ];

  return (
    <section id="os" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-label-md mb-3 uppercase tracking-widest text-primary">企业级 AI 操作系统</p>
            <h2 className="text-headline-lg mb-5">一套让全公司与 AI 协同作战的底座</h2>
            <p className="mb-6 text-body-lg text-on-surface-variant">
              智能体协同平台（Agent Collaboration Platform）—— 可私有化部署、高度可定制。把重复劳动交给智能体，让每个关键岗位都有专属 AI 加持，
              <span className="text-on-surface">在提升效率的同时，节省大量人力</span>。
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
              看看它能为你做什么
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -right-10 top-1/2 -z-10 size-72 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Build Services + Industries

**Files:**
- Create: `src/app/[locale]/_components/services-grid.tsx`
- Create: `src/app/[locale]/_components/industries-grid.tsx`

- [ ] **Step 1: Create ServicesGrid component**

```tsx
const services = [
  { icon: 'autorenew', num: '01', title: '老旧系统平滑升级重构', desc: '系统技术老化、原团队失联？我们接手重构，不中断现有业务。', iconBg: '#62aef01f', iconColor: '#62aef0', points: ['评估现状，制定最优迁移路径', '平滑切换，现有业务零感知', '重构后系统可 AI 自维护、持续演进'] },
  { icon: 'rocket_launch', num: '02', title: '从 0 到 1 构建新系统', desc: '什么都没有？从第一行代码起，交付一套面向 AI、面向未来的系统。', iconBg: '#1aae391f', iconColor: '#1aae39', points: ['需求梳理与架构设计全程介入', '全栈交付，覆盖前后端与上线', '交付即具备 AI 自演进能力'] },
  { icon: 'insights', num: '03', title: 'FDE 咨询 · AI 落地规划', desc: '知道 AI 很强，却不知从哪切入？一周深度诊断，给出完整升级方案。', iconBg: '#dd5b001f', iconColor: '#dd5b00', points: ['深入了解业务流程与系统现状', '输出 AI 升级与产品构建路线图', '可自行落地或由我们承接'] },
  { icon: 'hub', num: '04', title: '智能体协同平台', desc: '为已有研发团队的企业提供，一套可私有化、高度可定制的智能体协同底座。', iconBg: '#d6b6f61f', iconColor: '#d6b6f6', points: ['私有化部署，流程完全可控', '与现有系统无缝对接', '可扩展架构，按需深度定制'] },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-headline-lg">我们能为你做什么</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">从升级老系统到搭建专属 AI 操作系统，按你的阶段接入</p>
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
```

- [ ] **Step 2: Create IndustriesGrid component**

```tsx
const industries = [
  { name: '珠宝品牌', icon: 'diamond', color: '#62aef0' },
  { name: '合规基金', icon: 'account_balance', color: '#2a9d99' },
  { name: '材料 / 化工工厂', icon: 'factory', color: '#dd5b00' },
  { name: '量化交易平台', icon: 'monitoring', color: '#1aae39' },
  { name: '律师事务所', icon: 'gavel', color: '#d6b6f6' },
  { name: '医疗健康', icon: 'medical_services', color: '#62aef0' },
  { name: '跨境电商', icon: 'shopping_cart', color: '#ff64c8' },
  { name: '专业服务', icon: 'handshake', color: '#dd5b00' },
];

export default function IndustriesGrid() {
  return (
    <section id="industries" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-headline-lg">服务各行各业</h2>
          <p className="mt-3 text-body-md text-on-surface-variant">从珠宝、基金、材料工厂到交易平台、律所——不同行业，同一套 AI 落地方法论</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {industries.map((ind) => (
            <div key={ind.name} className="glass glow-border flex items-center gap-3 rounded-lg px-4 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${ind.color}1f` }}>
                <span className="material-symbols-outlined text-[22px]" style={{ color: ind.color }}>{ind.icon}</span>
              </span>
              <span className="text-[15px] font-medium text-on-surface">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: Build Cases Carousel

**Files:**
- Create: `src/app/[locale]/_components/cases-carousel.tsx`

- [ ] **Step 1: Create CasesCarousel component**

```tsx
import Link from 'next/link';

const cases = [
  {
    badge: 'OFFICIAL WEBSITE',
    title: 'SFS Diamonds',
    desc: '珠宝品牌官网，突出产品展示、询盘、线上下单。',
    url: 'https://sfsdiamonds.com/sfsdiamond',
    mockup: (
      <div className="flex h-full flex-col justify-center bg-gradient-to-br from-[#0a0a0c] to-[#241a12] px-5">
        <p className="text-[8px] tracking-[0.25em] text-white/50">MEMORIAL DIAMOND · CVD</p>
        <p className="mt-1 font-serif text-[22px] leading-tight text-white">
          For Forever<br /><span className="text-[#d8b06a]">Love</span>
        </p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-full bg-[#d8b06a] px-2.5 py-1 text-[7px] text-black">Place Order</span>
          <span className="rounded-full border border-white/30 px-2.5 py-1 text-[7px] text-white/80">Explore</span>
        </div>
      </div>
    ),
  },
  {
    badge: 'OFFICIAL WEBSITE',
    title: '6AM Advisory',
    desc: '多语言秘书公司服务官网，内建风控、财务做账系统。',
    url: 'https://6amadvise.com/zh',
    mockup: (
      <div className="flex h-full flex-col bg-gradient-to-br from-[#0c1322] to-[#13203a]">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2">
          <span className="size-2.5 rounded-full bg-[#62aef0]" />
          <span className="text-[9px] font-bold tracking-wider text-white/85">6AM ADVISORY</span>
          <div className="ml-auto flex gap-1">
            {['EN', '中', '繁'].map((l) => (
              <span key={l} className="rounded bg-white/10 px-1.5 py-0.5 text-[7px] text-white/70">{l}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center px-5">
          <p className="text-[15px] font-semibold text-white">多语言企业秘书服务</p>
          <p className="mt-1 text-[9px] text-white/55">风控 · 财务做账 · 合规咨询</p>
          <div className="mt-3 flex gap-1.5">
            <span className="rounded-full bg-[#62aef0] px-2.5 py-1 text-[7px] text-[#06243d]">预约咨询</span>
            <span className="rounded-full border border-white/25 px-2.5 py-1 text-[7px] text-white/80">服务介绍</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    badge: 'OFFICIAL WEBSITE',
    title: 'Cosmo Coat',
    desc: '涂料品牌官网，企业形象升级，内建内部 ERP 后台，AI 售后咨询。',
    url: 'http://cosmocoat.cn/cosmocoat',
    mockup: (
      <div className="flex h-full bg-gradient-to-br from-[#12100e] to-[#1f1814]">
        <div className="flex flex-1 flex-col justify-center px-5">
          <p className="text-[9px] tracking-[0.22em] text-[#e0a96d]">COATINGS · 工业涂料</p>
          <p className="mt-1.5 text-[19px] font-extrabold leading-none text-white">COSMO<br />COAT</p>
          <span className="mt-3 inline-block w-fit rounded-full bg-white/10 px-2.5 py-1 text-[7px] text-white/80">了解产品</span>
        </div>
        <div className="flex w-16 flex-col">
          {['#2a9d99', '#dd5b00', '#62aef0', '#d6b6f6', '#1aae39'].map((c) => (
            <div key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    badge: 'INTERNAL APP',
    title: '量化交易平台（线下演示）',
    desc: '数据获取，回测系统，实盘交易，策略迭代。',
    url: 'mailto:sales@sixamtech.ai?subject=我想了解内部应用案例',
    mockup: (
      <div className="flex h-full gap-2 bg-white p-3">
        <div className="w-1/4 space-y-1.5">
          {[1, 2, 3].map((i) => <div key={i} className="h-1.5 rounded-full bg-[#e6e6e6]" />)}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-2 h-3 rounded bg-[#1c1b1b]" />
          <div className="flex flex-1 items-end gap-1.5">
            {[70, 90, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: ['#62aef0', '#2a9d99', '#dd5b00', '#e05252'][i] }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    badge: 'INTERNAL ERP',
    title: '化工厂 ERP',
    desc: '配方管理、生产单、打样与原料库存，专为化工制造场景定制的全流程内部系统。',
    url: 'mailto:sales@sixamtech.ai?subject=我想了解内部应用案例',
    mockup: (
      <div className="h-full bg-white p-3">
        <div className="mb-2 flex gap-2">
          <div className="h-2 w-14 rounded bg-[#d6b6f6]" />
          <div className="h-2 w-10 rounded bg-[#e6e6e6]" />
        </div>
        <div className="space-y-1.5">
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="flex gap-2">
              <div className="h-2 w-1/3 rounded bg-[#ebe7e7]" />
              <div className="h-2 w-1/4 rounded bg-[#ebe7e7]" />
              <div className="h-2 flex-1 rounded bg-[#f0edec]" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function CasesCarousel() {
  return (
    <section id="cases" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-headline-lg">部分交付案例</h2>
            <p className="mt-3 text-body-md text-on-surface-variant">官网、内部系统到 AI 工作流——已经在真实业务里跑起来</p>
          </div>
          <span className="text-label-sm tracking-normal text-on-surface-variant/60">← 左右滑动查看更多 →</span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x gap-5">
          {cases.map((c) => (
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
                <h3 className="mt-3 text-[20px] font-bold text-[#1c1b1b]">{c.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#615d59]">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#13772a]">
                  访问网站<span className="material-symbols-outlined text-[16px]">north_east</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Build Team + Process + CTA Sections

**Files:**
- Create: `src/app/[locale]/_components/team-grid.tsx`
- Create: `src/app/[locale]/_components/process-steps.tsx`
- Create: `src/app/[locale]/_components/cta-section.tsx`

- [ ] **Step 1: Create TeamGrid component**

```tsx
const members = [
  { name: '资深企业服务行业专家', role: '行业老将 · 业务架构师', desc: '十余年企业服务与业务系统落地经验，深度服务过制造、零售、金融等行业头部客户。擅长从混沌的业务现状中识别真实痛点，设计真正解决问题的系统路径——懂业务，才知道哪里值得用 AI 改造，哪里改了也没用。', icon: 'business_center', gradient: 'linear-gradient(135deg, #62aef0, #62aef099)', tags: ['企业服务', '业务系统设计', '超大型企业平台', '数字化转型'] },
  { name: 'AI 技术负责人', role: '硅谷背景 · AI 产品架构师', desc: '硅谷出身的复合型 AI 专家——前 AWS 软件工程师、前腾讯云产品经理，横跨工程与产品两端。美国 Rice 大学数据科学硕士。深耕大模型应用与 AI 智能体研发，擅长把前沿 AI 从零到一落地为可持续运转的企业级系统。', icon: 'smart_toy', gradient: 'linear-gradient(135deg, #d6b6f6, #d6b6f699)', tags: ['硅谷', '大模型应用', 'AI Agent', 'AWS · 腾讯云'] },
  { name: 'FDE 专家', role: '解决方案架构师 · 全栈交付', desc: '复旦大学硕士，来自国内头部科技公司的 AI 基础设施与应用团队，具备大规模模型训练、推理优化与 Agentic 系统工程化的一线实战经验。作为 FDE 驻场，把业务需求拆解为可落地的解决方案架构，并以大厂级工程标准全栈交付。', icon: 'terminal', gradient: 'linear-gradient(135deg, #1aae39, #1aae3999)', tags: ['FDE 驻场', '解决方案架构', 'AI 工程化', '全栈开发'] },
  { name: 'AI 安全顾问', role: '阿里安全专家 · 安全项目创始人', desc: '来自阿里巴巴的安全专家、安全项目创始人，深耕 AI 智能体安全与企业级安全实战，是 AI 智能体协作领域的顶级团队核心。从数据合规、权限边界到 Agent 行为可控，每个 AI 产品落地前都经过安全视角审视。', icon: 'shield', gradient: 'linear-gradient(135deg, #dd5b00, #dd5b0099)', tags: ['阿里安全', '安全项目创始人', 'AI Agent 安全', '数据合规'] },
];

export default function TeamGrid() {
  return (
    <section id="team" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-label-md mb-3 uppercase tracking-widest text-primary">Team</p>
          <h2 className="text-headline-lg mb-5">个个都是身经百战的「超级个体」</h2>
          <p className="text-body-lg text-on-surface-variant">
            我们不是资源外包平台，也不是人员堆砌的大公司。核心团队由三种稀缺背景交叉而成：深耕行业的企业服务老将、亲手构建过 AI 产品的公司 CTO、以及头部大厂走出来的 AI 工程师。
            <span className="text-on-surface">懂业务 × 懂产品 × 懂工程，三者缺一</span>
            ，正是市面上大多数 AI 项目失败的根本原因。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['复旦大学', 'Rice 大学', '亚马逊 AWS', '腾讯云', '阿里巴巴'].map((t) => (
              <span key={t} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[12px] text-on-surface-variant">{t}</span>
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
              <p className="text-body-md leading-relaxed text-on-surface-variant">{m.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[12px] text-on-surface-variant">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ProcessSteps component**

```tsx
const steps = [
  { num: '01', title: '诊断', icon: 'stethoscope', desc: '找出当前最影响业务的技术问题与数据现状。' },
  { num: '02', title: '拆解', icon: 'account_tree', desc: '划分必须做 / 可以等 / 暂不做，守住预算边界。' },
  { num: '03', title: '交付', icon: 'deployed_code', desc: 'AI 工具加速，快速上线可维护、可扩展的版本。' },
  { num: '04', title: '迭代', icon: 'autorenew', desc: '按真实使用反馈持续升级，系统随业务一起演进。' },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="border-t border-white/5 bg-surface-container-low/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-label-md mb-3 uppercase tracking-widest text-primary">FDE · Forward Deployed Engineer</p>
          <h2 className="text-headline-lg mb-5">把「想用 AI」变成「真正在用 AI」的人</h2>
          <p className="text-body-lg text-on-surface-variant">
            老板知道痛点，却不知道 AI 怎么用；工程师掌握技术，却难以转化为业务方案。这中间的鸿沟，正是 FDE 存在的意义——既读懂业务逻辑，又驱动 AI 系统落地，把两端打通，才有真正有价值的产出。
          </p>
        </div>
        <p className="mb-10 text-center text-headline-md text-on-surface">诊断 → 拆解 → 交付 → 迭代</p>
        <div className="relative">
          <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-transparent via-outline-variant to-transparent md:block" />
          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.num} className="group text-center">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border border-white/10 bg-surface-container-highest transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50">
                  <span className="material-symbols-outlined text-[26px] text-primary">{step.icon}</span>
                </div>
                <h4 className="text-headline-md mb-2">
                  <span className="text-primary">{step.num}</span> {step.title}
                </h4>
                <p className="text-[14px] leading-snug text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create CTASection component**

```tsx
import Link from 'next/link';

type Props = { locale: string };

export default function CTASection({ locale }: Props) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute right-0 top-0 size-96 animate-pulse rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-headline-xl mb-6">准备好开启企业的 AI 原生进化了吗？</h2>
        <p className="mb-12 text-body-lg text-on-surface-variant">
          填一份 2–4 分钟的免费诊断，我们将为你提供一份专属的 AI 实施蓝图与切入点分析。
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/diagnosis`}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] bg-primary-container text-on-primary-container shadow-[0_0_30px_rgba(0,117,222,0.25)] hover:shadow-[0_0_45px_rgba(0,117,222,0.4)]"
          >
            开启免费诊断
          </Link>
          <a
            href="mailto:sales@sixamtech.ai"
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all active:scale-[0.97] border border-outline text-on-surface-variant hover:bg-white/[0.03]"
          >
            联系我们
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 12: Update Home Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Rewrite home page to compose all sections**

```tsx
import HeroSection from './_components/hero-section';
import StatsGrid from './_components/stats-grid';
import CoreValues from './_components/core-values';
import WhyNative from './_components/why-native';
import ProductOS from './_components/product-os';
import ServicesGrid from './_components/services-grid';
import IndustriesGrid from './_components/industries-grid';
import CasesCarousel from './_components/cases-carousel';
import TeamGrid from './_components/team-grid';
import ProcessSteps from './_components/process-steps';
import CTASection from './_components/cta-section';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <HeroSection locale={locale} />
      <StatsGrid />
      <CoreValues />
      <WhyNative />
      <ProductOS locale={locale} />
      <ServicesGrid />
      <IndustriesGrid />
      <CasesCarousel />
      <TeamGrid />
      <ProcessSteps />
      <CTASection locale={locale} />
    </>
  );
}
```

- [ ] **Step 2: Remove unused translations import** (no longer needed in the page)

---

### Task 13: Rewrite Diagnosis Page

**Files:**
- Modify: `src/app/[locale]/diagnosis/page.tsx`

- [ ] **Step 1: Install state management for wizard** (use React useState — no external lib needed)

- [ ] **Step 2: Create diagnosis step data**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const industries = [
  { name: '律师事务所 / 法律服务', sub: '律所 · 法律服务', icon: 'gavel', color: '#62aef0' },
  { name: '生产制造业', sub: '生产 · 制造', icon: 'precision_manufacturing', color: '#dd5b00' },
  { name: '基金 / 资产管理', sub: '基金 · 资产管理', icon: 'trending_up', color: '#2a9d99' },
  { name: '银行 / 保险 / 金融', sub: '银行 · 保险 · 金融', icon: 'account_balance', color: '#213183' },
  { name: '跨境电商 / 国际贸易', sub: '跨境电商 · 贸易', icon: 'language', color: '#62aef0' },
  { name: '医疗 / 医药 / 健康', sub: '医疗 · 医药', icon: 'medical_services', color: '#ff64c8' },
  { name: '珠宝 / 奢侈品', sub: '珠宝 · 奢侈品', icon: 'diamond', color: '#d6b6f6' },
  { name: '其他行业', sub: '其他', icon: 'more_horiz', color: '#8b919e' },
];

const stepLabels = ['行业背景', '规模与地区', '业务痛点', '联系信息'];

export default function DiagnosisWizard() {
  const [step, setStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-canvas-soft">
      {/* Nav */}
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-hairline bg-surface">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-on-surface">
            <img alt="晨启科技" width="28" height="28" className="shrink-0" src="/chenqi-logo.png" />
            <span className="text-headline-md font-bold tracking-tight text-current">晨启科技</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-[14px] text-ink-secondary transition-colors hover:text-primary">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              返回首页
            </Link>
          </div>
        </div>
      </nav>
      {/* Header banner */}
      <header className="bg-secondary pb-16 pt-24 text-center text-on-secondary">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-label-sm uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-green" />
            免费 AI 诊断
          </div>
          <h1 className="text-headline-lg mb-2">告诉我们你的业务，看清 AI 能落在哪</h1>
          <p className="text-[15px] opacity-90">预计 2–4 分钟 · 帮你识别企业 AI 化转型的切入点</p>
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
                <h2 className="text-headline-md mb-1">您的企业属于哪个行业？</h2>
                <p className="mb-6 text-[14px] text-ink-muted">下一步会据此为你定制流程相关的问题</p>
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
            {/* Steps 2-4 would follow same pattern */}
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
              上一步
            </button>
            <button
              type="button"
              onClick={() => setStep(Math.min(stepLabels.length - 1, step + 1))}
              disabled={step === stepLabels.length - 1}
              className="flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-primary/80 disabled:opacity-40"
            >
              下一步
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

### Task 14: Verify All Pages Build

**Files:**
- Verify: `npm run build` passes

- [ ] **Step 1: Clean and build**

```bash
rm -rf .next && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Start dev server and visually verify**

```bash
npm run dev &
```

Open browser to http://localhost:3000 and verify each section matches the reference screenshots.
