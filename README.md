# Mubin Al-Manaf — Portfolio

A fast, mobile-responsive, dark-mode personal portfolio built as plain HTML/CSS/JS
so it hosts for free on **GitHub Pages** with zero build step.

**Positioning:** one spine, not four — *a cost & commercial professional who also
ships the data automation*. Everything on the page reinforces that seam.

---

## 1. Site architecture

Single-page site, anchor-linked sections, progressive reveal on scroll.

```
index.html                 # all content + SEO metadata + JSON-LD
style.css                  # design tokens + all styling
script.js                  # nav state, mobile menu, scroll reveals, active link
favicon.svg                # MA monogram
robots.txt                 # crawl directives
sitemap.xml                # single-URL sitemap
README.md                  # this file

Page flow:
  Nav (fixed)
   └─ Hero ─ About(01) ─ Highlights(02) ─ Experience(03)
      ─ Projects(04) ─ Skills(05) ─ Education(06) ─ Certifications(07) ─ Contact(08)
   └─ Footer
```

No frameworks, no bundler, no external JS libraries. Fonts load from Google Fonts
with `preconnect` + `display=swap`. Total payload is small and renders fast.

---

## 2. Wireframes (every section)

```
┌──────────────────────────────────────────────────────────────┐
│ [MA] Mubin Al-Manaf        About Highlights Exp Proj  Skills [Contact] │  NAV (fixed, blurs on scroll)
└──────────────────────────────────────────────────────────────┘

HERO
┌───────────────────────────┬──────────────────────────────────┐
│ eyebrow                    │  ┌── PORTFOLIO SUMMARY ── REV.26 ┐│
│ MUBIN                      │  │ Portfolio value      £1.2 bn  ││  ← signature
│ AL-MANAF                   │  │ Homes              3,700 +    ││    "cost report"
│ lead sentence (thesis)     │  │ Sites                 90      ││    line items
│ sub sentence               │  │ Programmes             3      ││    reveal in sequence
│ [View work] [Get in touch] │  │ Discipline  Cost·Controls·Data││
│ London · Imperial · Warwick│  └───────────────────────────────┘│
└───────────────────────────┴──────────────────────────────────┘
  Scroll ───▶

01 ABOUT
┌─────────────┬────────────────────────────────────────────────┐
│ eyebrow     │ lead paragraph                                  │
│ section     │ body paragraphs (2)                             │
│ title       │ ── Commercial control                          │
│             │ ── Project controls                            │
│             │ ── Data engineering                            │
└─────────────┴────────────────────────────────────────────────┘

02 HIGHLIGHTS  (alt background)
┌────────┬────────┬────────┬────────┐
│ £1.2bn │ 3,700+ │  25%   │ 25/877 │   4-up stat grid (2-up tablet, 1-up mobile)
│ label  │ label  │ label  │ label  │
└────────┴────────┴────────┴────────┘

03 EXPERIENCE  (typed vertical timeline)
 date column │ role / org / bullet points
 ───────────────────────────────────────
 2023–now    │ Project & Cost Mgmt Consultant — Infracon
 2022–2023   │ Graduate Engineer — De-Construction Solutions
 2022        │ Cost Manager — SRC Infrastructure
 2018–2019   │ Risk & Private Banking Analyst — CIMB

04 PROJECTS  (alt background, 2×2 cards → 1-up mobile)
┌───────────────────┬───────────────────┐
│ P—01 Cost&Comm    │ P—02 Data         │
│ Valuation/reporting│ Power BI PC dash  │
├───────────────────┼───────────────────┤
│ P—03 Engineering  │ P—04 Automation   │
│ Shoring / FEA     │ Banking risk/auto │
└───────────────────┴───────────────────┘

05 SKILLS  (3 columns → 1 on mobile)
 Project & Cost Mgmt │ Data & Reporting │ Engineering Software
 [tag][tag][tag]...  │ [tag][tag]...    │ [tag][tag]...

06/07 EDUCATION + CERTIFICATIONS  (alt background, 2-col split)
┌───────────────────────────┬─────────────────────────┐
│ Imperial MSc card         │ ◦ CSCS PQP              │
│ Warwick BEng card         │ ◦ IStructE Grad Member  │
│ HyperionDev card          │ ◦ MOS · CPD · CFTE      │
└───────────────────────────┴─────────────────────────┘

08 CONTACT
┌───────────────────────────┬─────────────────────────┐
│ "Let's talk…" headline     │ Email   …               │
│ sub                       │ Phone   …               │
│                           │ LinkedIn…               │
│                           │ Location London, UK     │
└───────────────────────────┴─────────────────────────┘

FOOTER  © year · Built on GitHub Pages
```

---

## 3. Deploy to GitHub Pages

### Option A — quickest (serve from `main`, root)

1. Create a repo. For a personal site at `https://USERNAME.github.io`, name it
   **`USERNAME.github.io`**. For a project site (`/portfolio/`), any name works.
2. Add all files (`index.html`, `style.css`, `script.js`, `favicon.svg`,
   `robots.txt`, `sitemap.xml`) at the **repo root**.
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/(root)** → **Save**
4. Wait ~1 minute. Site goes live at `https://USERNAME.github.io/`.

### Before you publish — find/replace

Replace every `USERNAME` placeholder with your GitHub username (or custom domain):
- `index.html` → `<link rel="canonical">`, all `og:url`, JSON-LD `url`
- `robots.txt` → `Sitemap:` line
- `sitemap.xml` → `<loc>`

### Custom domain (optional)
Add a file named `CNAME` containing just your domain (e.g. `mubinalmanaf.com`),
then point a DNS `CNAME`/`A` record at GitHub Pages. Update the URLs above to match.

---

## 4. Future enhancements

- **Two-track view.** A toggle that re-orders Projects/Skills for "Commercial"
  vs "Data" audiences — sharper than one page trying to serve both equally.
- **Case-study pages.** Expand each project into its own page with the problem,
  approach, and a sanitised before/after (no client data).
- **Live dashboard embed.** A redacted Power BI "publish to web" tile would prove
  the data claim instantly — strongest single upgrade for tech/AI roles.
- **Downloadable CV.** A `cv.pdf` linked from the hero and contact section.
- **Light/dark toggle** persisted in `localStorage`.
- **Analytics** (privacy-friendly, e.g. Plausible/GoatCounter) to see which
  audience and which projects actually convert.
- **OG image.** A 1200×630 share card so links preview well on LinkedIn.
- **Contact form** via Formspree/Netlify if you want inbound without exposing email.

---

## Editing notes

- All colours and fonts are CSS variables at the top of `style.css` (`:root`).
- Reduced-motion is respected; keyboard focus is visible; mobile menu is built in.
- Numbers use the conservative CV figures (£1.2bn / 3,700 / 90). The Power BI
  project intentionally cites its own larger scope (4,300 plots / 94 sites) — that
  is the dashboard's stated coverage, per the source draft.
