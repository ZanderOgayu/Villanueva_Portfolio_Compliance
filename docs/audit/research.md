# Portfolio Redesign Technical Research Report

**Project:** Zander Rhoi Villanueva Portfolio Redesign  
**Scope:** Framework Comparison, Content Architecture, OJT Report Presentation, Categorized Skills & AI Tools, Portfolio Benchmarks  
**Date:** November 23, 2026  

---

## 1. Framework & Tooling Evaluation for a Growing Portfolio

### 1.1 Comparative Analysis Matrix

| Evaluation Dimension | Plain Vanilla HTML/CSS/JS | Astro | SvelteKit | Next.js (App Router) |
|:---|:---|:---|:---|:---|
| **Zero-JS by Default** | Yes (if JS omitted) | **Yes (Islands Architecture)** | No (~2–10 KB runtime) | No (~75–110 KB React runtime) |
| **Initial JS Bundle Size** | 0 KB | **0 KB** | ~10 KB | ~85 KB+ |
| **Markdown / MDX Handling** | Manual build/parser required | **Native Content Collections + Zod schemas** | Requires `mdsvex` preprocessor | Requires `@next/mdx` or external CMS |
| **Dynamic Routing for Reports**| Duplicate HTML templates | **Automatic file-based dynamic routes** | File-based routes (`+page.svelte`) | File-based routes (`page.tsx`) |
| **Templating & Component Reuse**| None (iframe or copy-paste) | **First-class `.astro` component files** | Svelte components (`.svelte`) | React JSX/TSX (`.tsx`) |
| **Lighthouse Performance Score**| 95–100 (if assets optimized) | **98–100 out of the box** | 90–98 | 80–92 (typical JS overhead) |
| **Learning Curve on Windows** | Very low (already familiar) | **Low (HTML-like syntax with frontmatter)**| Moderate | High (React, JSX, Hooks, Server/Client) |
| **Local Tooling Prerequisite** | Python (already installed) | Node.js (one-time install needed) | Node.js (one-time install needed) | Node.js (one-time install needed) |

### 1.2 Deep-Dive by Framework

#### A. Staying Vanilla (HTML5, CSS3, ES6 JavaScript)
* **Pros:** Works immediately with the existing machine environment without installing Node.js or any build tools. Runs directly on the existing `python -m http.server 8000`.
* **Cons:** Adding 5 to 10 OJT reports or case studies creates massive maintenance overhead. Every new report requires copying a whole HTML file with identical navigation headers, footers, theme toggles, and scripts. Any header tweak requires updating every HTML file manually. Markdown content cannot be natively parsed without adding client-side JS parsers (like `marked.js`), which degrades SEO and performance.

#### B. Astro (Recommended Framework)
* **Architecture:** Astro is a static-site-first web framework designed specifically for content-focused websites (portfolios, blogs, documentation). It delivers **zero client-side JavaScript by default**, rendering entire pages to static HTML during build time.
* **Content Collections API:** Astro features a dedicated, type-safe content management system built into the core framework ([Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/)). You simply create a folder `src/content/ojt/` and drop `.md` or `.mdx` files into it. Astro automatically validates frontmatter (dates, company, author, tags) using Zod schemas and generates static HTML pages at build time.
* **Islands Architecture:** Interactive elements (such as an Arknights sound effect toggle, a dynamic skills filter, or an interactive terminal modal) run as isolated "islands" ([Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)), loading JavaScript only for that specific component without hydrating the rest of the page.
* **Windows & Git Bash DX:** Excellent developer experience. A one-time installation of Node.js LTS via Windows Package Manager (`winget install OpenJS.NodeJS.LTS`) enables `npm create astro@latest`. Astro syntax is essentially HTML with YAML frontmatter at the top of the file, making it immediately intuitive for developers comfortable with HTML/CSS.

#### C. SvelteKit
* **Evaluation:** SvelteKit produces lean reactive code and has a clean single-file component syntax ([SvelteKit Documentation](https://kit.svelte.dev/)). However, its Markdown integration requires configuring the third-party `mdsvex` preprocessor, and its primary focus is on full-stack reactive applications rather than document-heavy static content delivery.

#### D. Next.js
* **Evaluation:** Next.js with React Server Components ([Next.js Documentation](https://nextjs.org/docs)) is an industry standard for enterprise web applications, but it introduces massive unnecessary complexity for a portfolio. Setup requires mastering React state management, hooks, hydration mismatches, and heavy client-side bundles that lower mobile Lighthouse scores.

### 1.3 Hosting Compatibility & Free-Tier Platform Analysis

| Hosting Provider | Free Tier Limits | Static / SSG Support | Markdown / Git CI/CD | Recommendation Level |
|:---|:---|:---:|:---:|:---:|
| **Cloudflare Pages** ([pages.cloudflare.com](https://pages.cloudflare.com/)) | **Unlimited bandwidth**, 500 builds/month, free custom SSL, global edge CDN | Native | Automatic Git integration (push to GitHub auto-deploys) | **Top Choice (Zero Bandwidth Caps)** |
| **Vercel** ([vercel.com](https://vercel.com/)) | 100 GB bandwidth/month, unlimited preview deployments, free SSL | Native | Auto-detects Astro and Vanilla HTML | **Top Choice for DX / Previews** |
| **Netlify** ([netlify.com](https://netlify.com/)) | 100 GB bandwidth/month, 300 build minutes/month | Native | Auto-detects static sites | **Excellent Alternative** |
| **GitHub Pages** ([pages.github.com](https://pages.github.com/)) | 100 GB bandwidth/month, 1 GB repository size limit | Native | Requires GitHub Actions `.github/workflows/deploy.yml` | **Solid Backup** |

> **Recommendation:** **Astro** deployed to **Cloudflare Pages** or **Vercel**. Cloudflare Pages offers unlimited bandwidth with zero risk of overage charges, making it ideal for hosting rich project images and downloadable PDF assets.

---

## 2. Information Architecture & Sitemap Alternatives

### 2.1 Single-Page vs. Multi-Page Architecture

```
Current Single-Page Layout:
[ Single URL: index.html (79.8 KB) ]
├── Hero / About (Inline)
├── Skills (Inline 3-tab widget)
├── Resume (Inline Timeline + Modal)
├── Portfolio (15 inline project cards + 15 inline modals)
├── Certificates (Inline 4 cards + 4 inline PDF modals)
└── Contact (Inline cards + iframe)
Result: Massive initial DOM weight, impossible to deep-link specific projects or reports, poor SEO.
```

```
Proposed Scalable Multi-Page Architecture:
/ (Home / Command Center)
  ├── Tactical Hero (Operator Dossier summary)
  ├── Featured Operations (Top 3 highlight projects)
  ├── Core Competencies preview
  └── Quick Transmission (Contact link)
/about (Personnel Profile)
  ├── Comprehensive Biography & Academic Journey
  ├── Education Timeline & Credentials
  └── Work & Leadership Experience
/skills (Combat & Engineering Capabilities)
  ├── Filterable Bento Grid with 7 clear categories
  ├── Proficiency indicators & contextual usage notes
  └── AI Engineering & Workflow Acceleration panel
/projects (Operations Archive)
  ├── Filterable project catalog (Web, Capstone, Game Dev, Security, Artwork)
  └── /projects/[slug] (Dedicated deep case studies with live demos)
/ojt (Field Training & Operational Reports)
  ├── Index of all completed training stints & industry attachments
  └── /ojt/[slug] (Rich web-native report article + official PDF download)
/resume (Official Dossier)
  ├── Interactive, clean web resume (screen & print-optimized)
  ├── Cisco verified certification badges
  └── Direct PDF download button (no flaky iframe embeds)
/contact (Transmission Frequency)
  ├── Working contact channel & verified social endpoints
  └── Form / Direct communication options
```

### 2.2 Benefits of the Multi-Page Approach
1. **Targeted SEO & Discoverability:** Each project and OJT report has its own semantic URL (`/ojt/laptop-pc-outlet`, `/projects/vortexshift-cipher`), meta title, and unique Open Graph image.
2. **Instant Performance:** Visiting the homepage only downloads assets needed for that page (~300 KB instead of 23.7 MB).
3. **Clean Deep-Linking:** You can share an exact link to an OJT report with university professors, academic evaluators, or hiring managers without forcing them to scroll through a long single page.

---

## 3. Presenting OJT (On-the-Job Training) Reports Effectively

### 3.1 Strategy Comparison

* **Pattern A: Pure PDF Viewer (`iframe` / `object`)**
  * *Flaws:* Degrades completely on mobile devices (pinch-to-zoom is difficult; iOS Safari renders only page 1). Text inside embedded PDFs is not indexed by Google.
* **Pattern B: Summary Card + Download Link Only**
  * *Flaws:* Forces the visitor to download an external file and open Acrobat/Preview just to read what you accomplished. Most recruiters skip downloads.
* **Pattern C: Hybrid Web-Native Article + PDF Artifact (Best Practice)**
  * *Structure:* The report is published as a fully formatted, beautifully typeset web article. At the top and bottom of the article, prominent buttons allow downloading the official, signed PDF document for academic auditing.
  * *Key Sections for OJT Case Studies:*
    1. **Operational Header:** Company Name, Division, Role/Title, Duration, Supervisor/Mentor attribution.
    2. **Executive Summary & Scope:** Context of the company and specific problems assigned.
    3. **Key Responsibilities & Tactical Contributions:** Bulleted action points using strong active verbs (*Engineered, Diagnosed, Automated, Refactored*).
    4. **Artifacts & Visual Proof:** Screenshots of client communications, network topology diagrams, code commits, or hardware repair logs (anonymized where appropriate).
    5. **Challenges Overcome & Technical Learnings:** The gap closed between classroom theory (PLV/Electron College) and real-world IT operations.
    6. **Verification Document Section:** Downloadable signed clearance/completion certificate in PDF format.

---

## 4. Skills Section Presentation & Honest AI Tool Representation

### 4.1 Industry Best Practices for Skills Display
* **Avoid Arbitrary Percentage Bars:** Leading engineering recruiters and UX researchers ([Hiration Developer Portfolio Guide](https://www.hiration.com/blog/developer-portfolio/), [Dev.to Developer Portfolios](https://dev.to/t/portfolio)) universally advise against percentage bars (e.g., "Python: 85%"). A percentage has no objective standard (does 85% mean you wrote the compiler or you know syntax?).
* **Categorized Bento Grid / Grouped Stat Panels:** Grouping skills into logical domain panels with clear hierarchy, context badges, and specific tooltips or usage notes provides instant scannability.

### 4.2 How Modern Engineers Present AI Tools Honestly
Hiring managers in 2026 value engineers who leverage AI tools effectively as **productivity multipliers** and **collaborative agents**, rather than those who hide their use or pretend AI tools are traditional programming languages.

* **Honest Presentation Framework:**
  1. **Category Designation:** Do not list AI tools under "Programming Languages" or "Frameworks." Place them under **"AI Engineering & Workflow Acceleration"** or **"Augmented Development Stack"**.
  2. **Provide Concrete Use-Case Context:** State exactly *how* each tool is employed in your development cycle to show engineering maturity.

#### Proposed AI Tools Breakdown for Zander's Portfolio:

1. **Google Antigravity:**
   * *Role:* Autonomous Agentic IDE & Multi-Agent Orchestration.
   * *Usage Note:* Used for end-to-end full-stack scaffolding, complex code refactoring across multiple files, automated test harness execution, and autonomous terminal task automation.
2. **Anthropic Claude:**
   * *Role:* Deep Architectural Reasoning & Systems Design.
   * *Usage Note:* Leveraged for complex algorithm design, cryptographic protocol verification, deep edge-case analysis, and structured technical documentation synthesis.
3. **Google Gemini:**
   * *Role:* Multimodal Research & Rapid Exploration.
   * *Usage Note:* Applied to rapid API exploration, multimodal UI verification, documentation analysis, and fast algorithmic debugging.

---

## 5. Developer Portfolio Benchmarks & Inspiration

We analyzed 8 exceptional developer portfolios demonstrating dark aesthetics, technical scannability, and high-impact design:

### 1. Brittany Chiang ([brittanychiang.com](https://brittanychiang.com/))
* **Stack:** Next.js, Tailwind CSS.
* **Key Strengths:** The undisputed benchmark for structured, scannable developer resumes. Uses a dark slate palette (`#0f172a`), fixed left-column overview, and clean right-column cards with pill tags for technologies. Every link has smooth hover indicators and flawless keyboard accessibility.

### 2. Rauno Freiberg ([rauno.me](https://rauno.me/))
* **Stack:** Next.js, Craft UI.
* **Key Strengths:** Ultra-refined dark-mode typography, micro-interactions, and keyboard-first command palette (`Cmd+K`). Proves that restraint, precise contrast ratios, and sharp grid alignments look more professional than chaotic animations.

### 3. Jacek Jeznach ([jacekjeznach.com](https://jacekjeznach.com/))
* **Stack:** Vanilla JS, Three.js, GSAP.
* **Key Strengths:** Highly immersive interactive tech portfolio. Demonstrates creative canvas animations and character while maintaining readable text sections.

### 4. Bruno Simon ([bruno-simon.com](https://bruno-simon.com/))
* **Stack:** Three.js, WebGL.
* **Key Strengths:** The gold standard of gamified portfolios. Users drive an interactive car through project zones. Demonstrates that gaming aesthetics, when executed with clean physics and fallback menus, create unforgettable impressions.

### 5. Paco Coursey ([paco.me](https://paco.me/))
* **Stack:** Next.js.
* **Key Strengths:** Creator of the famous `sonner` and `next-themes` libraries. Masterclass in micro-typography, subtle borders (`rgba(255,255,255,0.08)`), and minimal layout dividers.

### 6. N-O-D-E Terminal ([n-o-d-e.net](https://n-o-d-e.net/))
* **Stack:** Static HTML/CSS.
* **Key Strengths:** Raw industrial hacker/cyberpunk hardware aesthetic. Monospace headers, sharp line borders, high-density technical readouts without unnecessary JavaScript.

### 7. Endfield Gryphline Official Portal ([endfield.gryphline.com](https://endfield.gryphline.com/))
* **Stack:** Custom WebGL & Vue/Nuxt.
* **Key Strengths:** Official game portal for Arknights: Endfield. Highlights industrial hazard color codes (`#FFB800`), chamfered 45° card corners, tactical crosshair overlays, and technical alphanumeric status readouts.

### 8. Cyberpunk 2077 Official UI System ([cyberpunk.net](https://www.cyberpunk.net/))
* **Stack:** Custom CSS Grid & SVG.
* **Key Strengths:** Yellow-and-black hazard tape dividers, clipped-corner button geometry via CSS `clip-path`, and CRT scanline background textures.
