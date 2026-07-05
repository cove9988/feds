# SixamTech Website Rebuild

**Date:** 2026-06-26
**Status:** Draft
**Goal:** Make `/Users/s106916/github/feds` visually and functionally identical to the mirror at `/tmp/sixamtech-download/sixamtech/` (downloaded from sixamtech.ai).

---

## 1. Background

The reference site sixamtech.ai is a Next.js site for "晨启科技 / 6AM TECH", an enterprise AI deployment services company. It has been downloaded/mirrored to `/tmp/sixamtech-download/sixamtech/`. The current project (`feds`) is already a Next.js 16 + next-intl + Tailwind CSS v4 project but with simplified placeholder versions of the pages.

**Reference page structure:**
- `/?locale=zh` — Chinese landing (home)
- `/en` — English landing
- `/ja` — Japanese landing
- `/diagnosis` — Multi-step AI diagnosis form
- `/privacy` — Privacy policy
- `/terms` — Terms of service

**Current project structure:**
- Same routes via next-intl `[locale]` routing (zh, en, ja)
- Same pages but with simplified implementations

---

## 2. Asset Migration

Copy from `/tmp/sixamtech-download/sixamtech/assets/` to `public/`:

- `public/chenqi-logo.png` — Logo used in header and footer
- `public/apple-icon.png` — Apple touch icon
- `public/icon.png` — Favicon
- `public/manifest.webmanifest` — PWA manifest
- `public/google-fonts.css` — Material Symbols Outlined font (already imported in globals.css, but keep for reference)

Fonts are already handled by Google Fonts import in globals.css — no local font files needed.

---

## 3. Global Styles (`globals.css`)

Current file already has Tailwind v4 `@import "tailwindcss"` and custom `@theme`. Need to add:

### Additional `@theme` tokens (from reference CSS classes):
| Current | Missing |
|---------|---------|
| `--font-sans` (Inter) | Already present |
| `--color-*` tokens | Most are present, need to verify `--color-green` and `--color-surface-low` |
| Typography | `text-headline-lg`, `text-headline-md`, `text-body-md`, `text-body-lg`, `text-label-sm`, `text-label-md` |
| Effects | `text-glow` class for the "长进" highlight |

### New animations:
- `animate-pulse` — Already in Tailwind, verify matches reference
- `animate-floaty` — Float up/down animation (already defined)
- `animate-pulse-soft` — Opacity pulse (already defined)

---

## 4. Messages / i18n

Current message files already contain most content. Need to add keys for:

### New sections on home page:
- `home.stats` — Already has 4 stats, but reference has 6. Need to add `fastestLaunch` and `responseTime` metrics with numeric values.
- `home.coreValues` — New section with card titles (原生智能, 精准可靠, 闭环演进) and descriptions
- `home.industries` — 8 industry cards with names
- `home.cases` — Case study titles, descriptions, badges
- `home.team` — 4 team member names, roles, descriptions, tags
- `home.process` — 4-step titles and descriptions
- `home.product.agents` — Already has agents, but need to adjust structure (running/standby status, progress bars)
- `home.cta` — Different copy from current

### Diagnosis page:
- Reference uses a **multi-step wizard** (step indicators, industry selection cards, radio button groups). Current has a flat form. Need full rewrite.

---

## 5. Layout (`[locale]/layout.tsx`)

### Header:
| Element | Reference | Current | Action |
|---------|-----------|---------|--------|
| Logo | `chenqi-logo.png` (28×28) + "晨启科技" text | Text-only "6AM TECH" | Add image, use brand name |
| Nav links | 6 anchor links to sections | Only "Diagnosis" link | Replace with 核心价值, AI 操作系统, 服务, 案例, 团队, 流程 |
| Language switcher | Dropdown button (language icon + locale name + chevron) | Button group (中/EN/日) | Full replacement |
| CTA | "免费 AI 诊断" with glow shadow | "Diagnosis" text | Match styling |

### Footer:
| Action |
|--------|
| Replace minimal footer with 5-column grid |
| Column 1: Logo + brand name + description + email link |
| Column 2: 产品与服务 (5 links) |
| Column 3: 公司 (3 links) |
| Column 4: 法律与隐私 (2 links) |
| Column 5: 办公室 (4 cities with location icons) |
| Bottom bar: Copyright + privacy/terms links |

### Language Switcher:
Replace current button group with a dropdown component that:
- Shows language icon + current locale name + chevron
- On click, opens a dropdown menu with all locales
- Uses `aria-haspopup="menu"` and `aria-expanded`

---

## 6. Home Page Sections (`[locale]/page.tsx`)

### 6.1 Hero Section
- **Canvas animation**: Full-viewport `<canvas>` with particle grid effect (opacity 0.6). This is a non-trivial interactive component.
- **Badge**: "企业级 AI 落地服务" with pulsing green dot + glass background
- **Heading**: "让 AI 真正<span class="text-glow">长进</span>你的业务流程" — 64px at lg, 40px default
- **Description**: Two spans (highlighted "大幅节省企业成本、放大人效" in `text-on-surface`)
- **2 CTAs**: "免费 AI 诊断" (primary with glow shadow) + "查看我们怎么做" (outlined)
- **Right panel**: Placeholder div (hidden on mobile, visible lg+), background glow blur

### 6.2 Stats Section
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`
- 6 items with actual values:
  1. 80% · 技术投入降低 · AI Native 模式替代自建团队
  2. 65% · 软件成本节省 · 定制系统替代 SaaS 订阅
  3. 70% · 人工统计时间减少 · 内部管理系统自动化
  4. 3× · 管理决策速度提升 · 从月报到实时看板
  5. 2 天 · 最快上线 · AI 加持的交付效率
  6. 20 分钟 · 最快响应需求 · 全年陪跑持续迭代
- Each item: big number, title (medium weight), description (small, muted)

### 6.3 Core Values Section (`#value`)
- Center-aligned heading "核心价值" with underline bar (`h-1 w-20 rounded-full bg-primary`)
- 3 cards in `md:grid-cols-3`:
  1. **原生智能** (psychology icon, bg `primary/10`) — "拒绝表层集成..."
  2. **精准可靠** (verified icon, bg `tertiary/10`) — "多层验证与 RAG..."
  3. **闭环演进** (hub icon, bg `secondary/10`) — "系统内置自我优化..."
- Each card: icon box (48×48 rounded-lg) + title (`text-headline-md`) + description (`text-body-md`)

### 6.4 Why Native Section (`#why`)
- Section label "Why AI Native" with uppercase tracking
- Title "为什么选择原生 AI 架构？"
- Subtitle on right side
- **Complex grid layout** (`md:grid-cols-12 md:grid-rows-2`):
  - Left panel (col-span-7, row-span-2): "重构，而非改良" card with before→AI→after columns
    - Left column: 旧状态 tags (散落的表格, 微信/群聊, 老旧系统, 线下流程)
    - Center: Arrow indicators → AI bolt → Arrow indicators
    - Right column: 新状态 tags with colored dots (实时业务看板, 智能体协同, etc.)
  - Right top (col-span-5): "毫秒级响应" card (bolt icon, secondary color)
  - Right bottom (col-span-5): "私有化合规" card (shield icon, tertiary color)

### 6.5 Product OS Section (`#os`)
- Section label "企业级 AI 操作系统"
- Title and description about Agent Collaboration Platform
- 4 feature rows (lock, cable, groups, expand icons)
- CTA button "看看它能做什么"
- **Terminal/desktop card** with macOS traffic light dots:
  - Title bar: "晨启 · 企业 AI 操作系统" + green status dot "在线"
  - Sidebar: 5 icons (dashboard, smart_toy, hub, insights, settings)
  - Main panel: "智能体协同 · Agents" header with "全员 AI 协作" badge
  - 4 agent cards with progress bars:
    - 销售询盘 Agent — 92% (blue #62aef0)
    - 合同/报价 Agent — 78% (purple #d6b6f6)
    - 知识库检索 Agent — 64% (green #1aae39)
    - 审批流 Agent — 45% (orange #dd5b00), status: 待命

### 6.6 Services Section (`#services`)
- Same structure as current but with added visuals:
  - Numbered badges (01, 02, 03, 04) with colored backgrounds per service
  - Colored icon containers matching service accent color
  - Checkmark icons in green (`text-green`) instead of `text-primary`

### 6.7 Industries Section (`#industries`)
- NEW section not in current project
- Title "服务各行各业" + subtitle
- 8 industry cards in `grid-cols-2 sm:grid-cols-4`:
  1. 珠宝品牌 (diamond, blue)
  2. 合规基金 (account_balance, teal)
  3. 材料/化工工厂 (factory, orange)
  4. 量化交易平台 (monitoring, green)
  5. 律师事务所 (gavel, purple)
  6. 医疗健康 (medical_services, blue)
  7. 跨境电商 (shopping_cart, pink)
  8. 专业服务 (handshake, orange)

### 6.8 Cases Section (`#cases`)
- NEW section not in current project
- Title + subtitle + "← 左右滑动查看更多 →" hint
- Horizontal scroll container (`overflow-x-auto`, `snap-x`)
- 5 case cards (300px wide, white background with shadow):
  1. **SFS Diamonds** — 珠宝品牌官网 → sfsdiamonds.com
  2. **6AM Advisory** — 多语言秘书服务 → 6amadvise.com/zh
  3. **Cosmo Coat** — 涂料品牌官网 → cosmocoat.cn
  4. **量化交易平台** — (internal, mailto for demo)
  5. **化工厂 ERP** — (internal, mailto for demo)

### 6.9 Team Section (`#team`)
- NEW section not in current project
- Section label "Team" with uppercase
- Title "个个都是身经百战的「超级个体」"
- Compelling description about three backgrounds
- Tag badges: 复旦大学, Rice 大学, 亚马逊 AWS, 腾讯云, 阿里巴巴
- 4 team member cards in `md:grid-cols-2`:
  1. **资深企业服务行业专家** — 行业老将 · 业务架构师
  2. **AI 技术负责人** — 硅谷背景 · AI 产品架构师
  3. **FDE 专家** — 解决方案架构师 · 全栈交付
  4. **AI 安全顾问** — 阿里安全专家 · 安全项目创始人

### 6.10 Process Section (`#process`)
- NEW section not in current project
- Section label "FDE · Forward Deployed Engineer"
- Title and explanation paragraph
- 4-step horizontal flow: 诊断 → 拆解 → 交付 → 迭代
- Connector line via gradient
- Each step: icon in circle + number + title + description

### 6.11 CTA Section
- Background shade overlay
- Title "准备好开启企业的 AI 原生进化了吗？"
- Description about 2-4 minute diagnosis
- Two buttons: "开启免费诊断" (primary) + "联系我们" (outlined)

---

## 7. Diagnosis Page

Reference uses a **multi-step wizard** form different from current flat form. Structure:

### Header:
- Purple/secondary banner with badge "免费 AI 诊断"
- Title + estimated time note

### Step indicator bar (4 steps):
1. 行业背景 (active/highlighted)
2. 规模与地区
3. 业务痛点
4. 联系信息

### Wizard content area (changes per step):
- **Step 1** — Industry selection: 7+ industry cards with icons in `sm:grid-cols-2`
- **Step 2** — Company size + region (radio/select)
- **Step 3** — Pain points (checkbox/textarea)
- **Step 4** — Contact info form

### Navigation:
- "上一步" / "下一步" buttons
- Progress bar

### Current form uses different theme tokens (`--canvas-soft`, `--surface-low`, `--hairline`, `--ink-muted`, etc.) — either add these tokens or map to existing ones.

---

## 8. Component Architecture

Break into components:

| Component | File | Notes |
|-----------|------|-------|
| `Header` | `_components/header.tsx` | Server component with nav + CTA |
| `LanguageDropdown` | `_components/language-dropdown.tsx` | Client component (interactive dropdown) |
| `Footer` | `_components/footer.tsx` | Server component |
| `CanvasParticles` | `_components/canvas-particles.tsx` | Client component (canvas animation) |
| `StatsGrid` | `_components/stats-grid.tsx` | |
| `CoreValues` | `_components/core-values.tsx` | |
| `WhyNative` | `_components/why-native.tsx` | |
| `ProductOS` | `_components/product-os.tsx` | Includes terminal UI |
| `ServicesGrid` | `_components/services-grid.tsx` | |
| `IndustriesGrid` | `_components/industries-grid.tsx` | |
| `CasesCarousel` | `_components/cases-carousel.tsx` | Horizontal scroll |
| `TeamGrid` | `_components/team-grid.tsx` | |
| `ProcessSteps` | `_components/process-steps.tsx` | |
| `CTA` | `_components/cta-section.tsx` | |
| `DiagnosisWizard` | `_components/diagnosis-wizard.tsx` | Client component (multi-step) |

---

## 9. Implementation Order

1. **Assets** — Copy images to `public/`
2. **globals.css** — Add missing theme tokens and utilities
3. **Messages** — Update i18n JSON files with new keys
4. **Components** — Build one at a time (header, footer, language dropdown → hero → home sections → diagnosis)
5. **Layout** — Update `layout.tsx` with new header/footer
6. **Home page** — Update `page.tsx` to use new components
7. **Diagnosis** — Rewrite diagnosis page
8. **Verify** — Visual comparison against reference screenshots

---

## 10. Key Design Decisions

- **Canvas animation**: Use a lightweight canvas particle effect. If performance is a concern on mobile, consider disabling or reducing particle count.
- **Language dropdown**: Client component with `useState` for open/close. Use `useClickAway` or similar for closing.
- **Multi-step form**: Client component with step state management. Form data accumulated across steps and submitted at end.
- **Horizontal scroll for cases**: Pure CSS `overflow-x-auto` + `snap-x` — no heavy carousel library needed.
- **Colors**: The industry section uses inline `style` attributes for accent colors. Define these as CSS variables or use a utility approach.
