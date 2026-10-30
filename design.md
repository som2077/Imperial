# design.md — x.ai-style UI

> Note: x.ai ka raw CSS fetch nahi ho saka (fetch me sirf text aaya). Ye spec x.ai ke publicly-known visual style
> (minimal, monochrome, dark-first, huge typography) ke basis par hai. Exact fonts/hex values approximations hain.

---

## 1. Design Philosophy

- **Ultra minimal**: kam elements, bahut zyada whitespace (negative space).
- **Monochrome**: black, white, aur grays. Koi bright brand color nahi.
- **Dark-first**: pure/near-black background, white text.
- **Typography-led**: design ka hero text hai, images/illustrations nahi.
- **Technical + serious tone**: research-lab feel, no playful gradients, no emojis, no stock illustrations.
- **Quiet motion**: subtle fade/translate, kuch bhi bouncy ya flashy nahi.

---

## 2. Color Tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000000` | Page background |
| `--bg-elevated` | `#0A0A0A` | Cards, header on scroll |
| `--bg-hover` | `#141414` | Hover surfaces |
| `--border` | `#1F1F1F` | Hairline borders |
| `--border-strong` | `#2E2E2E` | Inputs, focused dividers |
| `--text` | `#FFFFFF` | Primary text |
| `--text-muted` | `#A1A1A1` | Secondary text |
| `--text-subtle` | `#6B6B6B` | Dates, captions, meta |
| `--accent-bg` | `#FFFFFF` | Primary button bg |
| `--accent-text` | `#000000` | Primary button text |

Optional light theme: invert (`--bg: #FFFFFF`, `--text: #000000`, borders `#E5E5E5`).

Rules:
- Gradients avoid karo. Agar chahiye to sirf hero glow: `radial-gradient(ellipse at top, #1a1a1a, #000 70%)`.
- Shadows nahi — borders use karo.

---

## 3. Typography

**Font suggestions** (x.ai custom geometric sans use karta hai, free equivalents):
- Display + body: `Geist` (ya `Inter`)
- Mono (labels, dates, code): `Geist Mono` (ya `JetBrains Mono`)

| Role | Size (desktop / mobile) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero H1 | 96px / 44px | 500 | 1.0 | -0.04em |
| H2 | 56px / 32px | 500 | 1.05 | -0.03em |
| H3 | 28px / 22px | 500 | 1.2 | -0.02em |
| Body | 18px / 16px | 400 | 1.6 | 0 |
| Small | 14px | 400 | 1.5 | 0 |
| Label / date (mono) | 12px, UPPERCASE | 400 | 1.4 | 0.08em |

Rules:
- Headings tight tracking, body normal.
- Max text width: `640px` for paragraphs.
- Sab kuch left-aligned; center sirf hero me (optional).

---

## 4. Layout & Spacing

- Max container: `1200px`, side padding `24px` (mobile) / `48px` (desktop).
- Spacing scale (8px base): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`.
- Section vertical padding: `128px–192px` desktop, `80px` mobile.
- 12-column grid, but zyada-tar content 1 ya 2 columns me.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Border radius: `0px–8px` (buttons/cards `6px`, ya fully sharp). Pill shapes sirf small tags ke liye.

---

## 5. Page Structure (Homepage)

1. **Header** (fixed, transparent → `bg/80` + blur on scroll)
   - Left: wordmark/logo (white, simple)
   - Right: nav links (Grok, API, Company, Careers, News) + small "Try Grok" button
   - Height `64px`, bottom hairline border on scroll
2. **Hero**
   - Huge one-line / two-line headline (e.g. "Understand the universe")
   - Ek short muted subtext
   - 1–2 CTAs: primary (white filled), secondary (text link with arrow `→`)
3. **News / Updates list**
   - Vertical list, har row: mono date (left) + title (middle) + arrow (right)
   - Row separated by 1px `--border` line
   - Hover: background `--bg-hover`, arrow shift 4px right
4. **Feature blocks** (Grok, API)
   - Large heading + 2–3 lines text + "Learn more →" link
   - Alternating or stacked, no cards with heavy decoration
5. **Footer**
   - Multi-column link lists (muted text), copyright in `--text-subtle`
   - Top hairline border

---

## 6. Components

### Button — Primary
```css
background: #fff; color: #000;
padding: 12px 20px; border-radius: 6px;
font-weight: 500; font-size: 15px;
transition: opacity .2s ease;
```
Hover: `opacity: .85`. No shadow.

### Button — Secondary / Ghost
```css
background: transparent; color: #fff;
border: 1px solid #2E2E2E;
padding: 12px 20px; border-radius: 6px;
```
Hover: `background: #141414`.

### Text Link with Arrow
- Muted white text, `→` right side. Hover: text → `#fff`, arrow `translateX(4px)`.

### News Row
```css
display: grid; grid-template-columns: 160px 1fr 24px;
padding: 24px 0; border-bottom: 1px solid #1F1F1F;
```
- Date: mono, uppercase, `--text-subtle`
- Title: `20px`, `--text`
- Mobile: stack date above title.

### Input
```css
background: #0A0A0A; border: 1px solid #2E2E2E;
border-radius: 6px; padding: 12px 14px; color: #fff;
```
Focus: `border-color: #fff`, no glow.

---

## 7. Motion

- Duration `150–250ms` for hover, `600–800ms` for scroll reveals.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll reveal: `opacity 0→1`, `translateY(16px→0)`, stagger `80ms`.
- Hero text optional: line-by-line fade-in.
- `prefers-reduced-motion` respect karo.

---

## 8. Iconography & Imagery

- Sirf simple stroke icons (1.5px, Lucide / Phosphor thin).
- Images kam; agar ho to grayscale ya dark-toned, full-bleed, no rounded corners.
- Logo: pure white on black, no gradient.

---

## 9. Accessibility

- Text contrast min 4.5:1 (`--text-muted` `#A1A1A1` on black passes).
- Visible focus ring: `outline: 2px solid #fff; outline-offset: 3px`.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`.

---

## 10. CSS Variables (copy-paste)

```css
:root {
  --bg: #000;
  --bg-elevated: #0a0a0a;
  --bg-hover: #141414;
  --border: #1f1f1f;
  --border-strong: #2e2e2e;
  --text: #fff;
  --text-muted: #a1a1a1;
  --text-subtle: #6b6b6b;

  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;

  --radius: 6px;
  --container: 1200px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

html { background: var(--bg); color: var(--text); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
h1 { font-size: clamp(44px, 8vw, 96px); font-weight: 500; line-height: 1; letter-spacing: -0.04em; }
```

## 11. Tailwind Config (agar Tailwind use kar rahe ho)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        elevated: "#0A0A0A",
        hover: "#141414",
        line: "#1F1F1F",
        "line-strong": "#2E2E2E",
        muted: "#A1A1A1",
        subtle: "#6B6B6B",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em" },
      maxWidth: { container: "1200px" },
    },
  },
};
```

---

## 12. Ready-to-use Prompt (Cursor / Claude Code / Lovable ke liye)

```
Build my website using the design.md spec above.
Style: x.ai-inspired — pure black background, white text, monochrome only,
huge tight-tracked headlines (Geist/Inter), mono uppercase dates,
hairline borders (#1F1F1F), no shadows, no gradients, 6px radius,
generous whitespace (128px+ section padding), subtle fade-up scroll reveals,
news list rows with arrow hover, fixed transparent header that blurs on scroll.
Fully responsive, accessible, semantic HTML.
```

---

## 13. Do / Don't

**Do**
- Whitespace aur typography ko kaam karne do.
- Ek hi primary CTA per section.
- Consistent 1px borders.

**Don't**
- Colorful gradients, glassmorphism, neon.
- Heavy drop shadows, rounded-2xl cards.
- Zyada icons ya illustrations.
- Bold (700+) weights — 400/500 hi rakho.