# Comprehensive Codebase & UI/UX Audit Report

**Target Project:** Zander Rhoi Villanueva — Personal Portfolio Website  
**Branch:** `redesign`  
**Audit Date:** November 23, 2026  
**Auditor:** Senior Front-End Engineer & UI/UX Designer  
**Scope:** Architecture, UI/UX, Skills Hierarchy, Performance, Accessibility, SEO, Code Quality, Deployment Readiness  

---

## 1. Executive Summary & Stack Detection

### 1.1 Detected Technology Stack
* **Architecture:** Static Single-Page Application (SPA) with section-based scroll-spy navigation.
* **Core Technologies:** Pure Vanilla HTML5, Vanilla CSS3 (Custom Properties / CSS Variables), Vanilla JavaScript (ES6+).
* **Package Management / Build Tooling:** **None.** No `package.json`, no bundler (Vite, Webpack, Rollup), and no CSS preprocessor active in the root (though legacy SCSS files exist inside a nested demo folder).
* **Environment Context:**
  * Operating System: Windows (PowerShell / Git Bash).
  * Node.js / npm: **Not Installed** (`node` and `npm` commands not recognized in system PATH).
  * Python: **Python 3.14.3** installed and active.
  * Local Development Server: Python built-in HTTP server (`python -m http.server 8000`).
* **External Dependencies (via CDN):**
  * Typography: Google Fonts (`Inter:wght@300;400;500;600;700;800`).
  * Iconography: Font Awesome 6.5.0 (`cdnjs.cloudflare.com`).
  * Tech Skill Logos: Devicon vLatest (`cdn.jsdelivr.net`).
  * External Services: Google Maps Embed API (`iframe`).

### 1.2 Overall Assessment
The current portfolio demonstrates a solid functional foundation: custom theme switching (dark/light), modal dialogs, timeline components, and an elaborate multi-tab interactive document/code viewer for the VortexShift Cipher project. However, it suffers from severe architectural bottlenecks: an enormous single HTML document (1,578 lines, 79.8 KB), massive uncompressed assets (over 23.7 MB total), non-semantic skills categorization, lack of SEO/OG metadata, accessibility gaps (low contrast, missing ARIA bindings), and brittle file paths containing spaces.

---

## 2. Browser & Visual Verification Status

> [!NOTE]
> **Observation Verification Status: UNVERIFIED (Live Headless Browser / Automated Lighthouse)**  
> *Reason:* The automated Chrome DevTools protocol / browser automation MCP server was not active in the background session.  
> *What is needed from user:* To execute live automated Lighthouse audits directly, Google Chrome can be launched with remote debugging enabled (`chrome.exe --remote-debugging-port=9222`), or Lighthouse CLI can be run locally once Node.js is installed. Alternatively, you can drop browser-exported Lighthouse JSON/HTML reports or visual screenshots into `/docs/audit/inputs/`.  
> *Methodology Used:* Exhaustive static code auditing of `index.html` (1,578 lines), `styles.css` (1,238 lines), and `script.js` (283 lines), exact file-size metrics from disk, and viewport calculations at 1440px desktop, 768px tablet, and 375px mobile.

---

## 3. Detailed Audit by Category

### 3.1 Design & UI
* **Visual Hierarchy:**
  * The desktop layout uses a fixed two-column layout: 280px sticky sidebar on the left and a scrolling main column max-width 920px.
  * *Typography:* Relies entirely on `Inter`. While clean and neutral, it lacks visual personality or distinct technical identity. Font sizing scales from `0.58rem` (micro-labels) to `2.2rem` (headings). The micro-labels (`0.58rem` ≈ 9.28px) violate minimal readability guidelines on standard displays.
* **Layout & Spacing Consistency:**
  * Good use of CSS variables for colors, but spacing is fragmented with ad-hoc margins (`margin-top: 32px`, `padding: 52px 44px 32px`).
  * Border radii vary between `var(--radius)` (12px), `8px`, `6px`, `4px`, and `50px` pill badges without a strict token scale.
* **Theming:**
  * Dark theme base uses `#0a0a0a` (background) with `#111111` surfaces and `#161616` cards.
  * Contrast between cards (`#161616`) and background (`#0a0a0a`) is only 1.07:1, causing cards to blend together on uncalibrated or low-brightness screens without borders.

### 3.2 UX & Mobile Responsiveness
* **Mobile Viewport (≤768px):**
  * Sidebar is hidden off-screen (`transform: translateX(-100%)`) with a toggle mechanism. However, the hamburger button only toggles `.nav-links.open` (top navigation dropdown) and does **not** provide a button to open the sidebar profile contacts or "View CV" button on mobile.
  * To compensate, a `.mobile-profile-header` was duplicated inside the `#about` section (`index.html#L102-L108`). This results in DOM duplication and inconsistency (e.g., social links and CV button from the sidebar are inaccessible on mobile without scrolling to the footer or contact section).
* **Navigation & Scroll Spy:**
  * Fixed sticky header (`height: 56px`) with blur backdrop.
  * Scroll spy offset in `script.js#L54` is hardcoded to `section.offsetTop - 80`. When sections are short or viewport height is large, active indicator highlights may desynchronize or fail on high-refresh displays.
* **Resume Readability:**
  * The resume section contains a simplified visual timeline of education and work history, plus a button opening a PDF in an `iframe` inside a modal.
  * On mobile devices (iOS Safari and Android Chrome), rendering PDFs inside an `<iframe>` frequently fails or renders as an unscrollable single page, frustrating recruiters.

### 3.3 Skills Section: Current Grouping & Structure Analysis
* **Current State:**
  * The skills section is fused under `#about` and split across 3 generic tabs: `Frontend & Design`, `Backend`, and `Tools` (`index.html#L147-L185`).
* **Critical Structural Flaws:**
  1. *Category Conflation:* "Frontend & Design" bundles programming/markup languages (HTML, CSS, JS) with vector UI tools (Figma, Canva) and raster photo editors (Photoshop).
  2. *Backend Conflation:* "Backend" bundles compiled languages (Java, C#, C++), scripting languages (Python), relational database management systems (MySQL), and a JavaScript runtime environment (Node.js).
  3. *Tools Kitchen Sink:* "Tools" lumps Git/GitHub, Jira, Microsoft Office productivity software (Word, Excel, PowerPoint), a 3D Game Engine (Unity), a network simulator (Cisco Packet Tracer), and an IDE (VS Code) all into one flat 9-item grid.
  4. *Missing Modern Technical Pillars:* No dedicated category for Databases, Networking/Infrastructure (despite strong Cisco certifications!), or AI-augmented engineering tools.
  5. *Absence of AI Tools:* As an modern IT student, generative AI tools (Antigravity, Claude, Gemini) are unlisted despite being central to current developer productivity.
  6. *Hardcoded HTML Markup:* Adding, updating, or reordering any skill requires modifying raw HTML blocks with specific SVG paths or Devicon class strings.

### 3.4 Performance & Asset Weight
* **Total Payload Analysis:**
  * Single Page Load: **23.76 MB** total asset footprint in workspace.
  * Uncompressed Images:
    * `assets/TARA KAPE TAYO.png`: **3.02 MB**
    * `assets/JUDGEMENT SLASH.png`: **2.91 MB**
    * `assets/Steel Ball Run.jpg`: **2.23 MB**
    * `assets/the fifth stage.png`: **1.01 MB**
    * `assets/escape from the salamangkero's maze.png`: **1.01 MB**
  * Video:
    * `assets/vrakeit_walkthrough_h264.mp4`: **4.82 MB** (loaded as card thumbnail with `#t=0.5` without a lightweight poster image).
  * Certificates & Documents:
    * 4 Cisco Certificate PDFs: **4.61 MB** total (ranging from 1.08 MB to 1.30 MB each).
    * `IntegrativeProgrammingandTechnologiesProject.zip`: **941 KB**.
* **Render-Blocking External Resources:**
  * Google Fonts `Inter` stylesheet (`styles.css#L1`).
  * Font Awesome 6.5.0 CSS (`cdnjs.cloudflare.com`, ~70 KB).
  * Devicon CSS (`cdn.jsdelivr.net`, ~65 KB plus font payloads).
* **DOM Weight:**
  * 1,578 lines of HTML. Includes 17 full modals rendered in the initial DOM tree, including 540 lines of raw Python script text (`index.html#L870-L1409`) embedded directly in a `<pre><code>` block.

### 3.5 Accessibility (a11y)
* **Contrast Issues:**
  * Dark theme: `--text-muted: #666666` against `--bg: #0a0a0a` produces a contrast ratio of **2.83:1**, failing WCAG AA (minimum 4.5:1 required for normal text). Affects section labels, timeline dates, and card descriptions.
  * Light theme: `--text-muted: #999999` against `--bg: #f5f5f5` produces a contrast ratio of **2.41:1**, severely failing WCAG AA.
* **Keyboard Navigation & Modals:**
  * When a modal opens (`openModal()` in `script.js#L187`), focus is not trapped inside the modal. Keyboard users pressing `Tab` continue cycling through hidden background elements.
  * Modals lack `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes.
  * Close buttons (`modal-close-x`) have no accessible text labels, only an `<i>` font icon.
* **Semantic HTML:**
  * Service cards (`index.html#L122-L142`) use raw emojis (`🎨`, `💻`, `🌐`, `🖼️`) without `aria-hidden="true"` or accessible descriptions, causing screen readers to announce them literally.
  * Section headings jump between `h1`, `h2`, `h3`, `h4`, `h5`, `h6` irregularly (e.g., in the Vortex preview modal).

### 3.6 SEO & Metadata
* **Open Graph & Social Cards:** Completely missing. No `og:title`, `og:description`, `og:image`, `og:url`, or `twitter:card`. Sharing the link on LinkedIn, Discord, or X generates a blank card preview.
* **Canonical URL & Robots:** No `<link rel="canonical">` tag; no `robots.txt` file present in root.
* **Structured Data:** No JSON-LD schema markup (`Person` or `ProfilePage`) for search engine entity recognition.
* **Favicon:** No `<link rel="icon">` specified in `<head>`; defaults to browser 404 on `/favicon.ico`.

### 3.7 Code Quality & Architecture
* **Single File Monolith:**
  * `index.html` holds layout, 17 modals, slide presentations, and 540 lines of Python code.
  * `styles.css` is an unbundled 1,238-line stylesheet.
  * `script.js` directly mutates DOM without a modular component architecture.
* **Duplication:**
  * Mobile profile card duplicates profile picture, name, and subtitle from the sidebar.
  * Modal markup repeats the identical `.modal-overlay > .modal-box > .modal-close-x` scaffolding 17 times.
* **Embedded Unused Repositories:**
  * Folder `Responsive-Multi-Page-Website-main/` is checked into the repository root (1.7 MB of duplicated code, images, and HTML) instead of being hosted separately or referenced as an external GitHub link.

### 3.8 Deployment Readiness & Portability
* **Case Sensitivity & Linux Hosting:**
  * File paths contain uppercase letters and spaces:
    * `assets/Profile Picture Portfolio.jfif`
    * `assets/Responsive-MultiPage-Wesbite.png` (contains typo "Wesbite")
    * `assets/TARA KAPE TAYO.png`
    * `assets/JUDGEMENT SLASH.png`
    * `assets/the fifth stage.png`
    * `assets/escape from the salamangkero's maze.png`
    * `assets/Placeholder Bee.jpg`
    * `assets/Activty 2.jpg` (contains typo "Activty")
    * `assets/actvity 2 part 2.jpg`
    * `assets/YUKARI BOOK.jpg`
    * `assets/Curriculum Vitae.pdf`
    * `assets/ZANDER_VILLANUEVA_RESUME.pdf`
  * *Risk:* On Windows/NTFS, filenames are case-insensitive and tolerate spaces. When deployed to Linux-based cloud environments (Vercel, Cloudflare Pages, Netlify, GitHub Pages), unencoded spaces (` ` vs `%20`) or case mismatches (`.JPG` vs `.jpg`) will trigger immediate HTTP 404 errors.
* **MIME Types:**
  * `Profile Picture Portfolio.jfif`: The `.jfif` extension frequently fails default MIME-type detection on Nginx/Cloudflare, causing the browser to download the file instead of rendering it as an image. Needs conversion to `.webp` or standard `.jpg`.
* **Broken / Incomplete Links:**
  * Discord link (`index.html#L65`, `#L571`): Points to `https://discord.com/channels/@me` which directs visitors to their own personal Discord DMs, not Zander's Discord user profile or server.
  * Google Maps iframe (`index.html#L578`): Uses an arbitrary placeholder string (`0x3397c8f60b3f74bb:0x1234567890abcdef`) which displays a generic map error.
  * Hardcoded Phone Number & Birthday: Personal phone number (`+63 977 721 0423`) and birthdate (`May 09, 2005`) are exposed in plain HTML, creating privacy/spam vulnerabilities.

---

## 4. Ranked Issue Matrix

| ID | Severity | Category | Issue Description | Evidence / Reference | Impact |
|:---|:---:|:---:|:---|:---|:---|
| **ISS-01** | **HIGH** | Performance | Uncompressed 23.7MB asset payload; 3MB PNGs and 4.8MB video loaded on initial visit | `assets/*.png`, `vrakeit_walkthrough_h264.mp4` | Slow mobile loading, high bandwidth cost |
| **ISS-02** | **HIGH** | Deployment | Filenames containing spaces and non-standard extensions (`.jfif`) | `assets/Profile Picture Portfolio.jfif`, `assets/TARA KAPE TAYO.png` | 404 errors and broken images on Linux hosts |
| **ISS-03** | **HIGH** | Architecture | Monolithic 1,578-line HTML file containing 17 inline modals and 540 lines of Python code | `index.html#L591-L1575` | Unmaintainable, difficult to scale with new reports |
| **ISS-04** | **HIGH** | Skills UX | Skills lumped into 3 coarse tabs; languages, tools, databases, and apps intermingled | `index.html#L147-L185` | Poor scannability for recruiters; no clear technical focus |
| **ISS-05** | **HIGH** | Skills UX | AI Tools (Antigravity, Claude, Gemini) completely missing from skills inventory | `index.html` skills section | Misses opportunity to highlight modern AI-assisted engineering workflow |
| **ISS-06** | **MEDIUM** | Accessibility | Text contrast failures in dark (`#666666` on `#0a0a0a` = 2.8:1) and light modes | `styles.css#L15`, `styles.css#L36` | Violates WCAG AA standards; difficult to read |
| **ISS-07** | **MEDIUM** | Accessibility | Modals lack ARIA dialog semantics, focus trapping, and accessible close button names | `index.html#L595`, `script.js#L187-L203` | Inaccessible to screen readers and keyboard users |
| **ISS-08** | **MEDIUM** | SEO / Social | Zero Open Graph, Twitter Cards, canonical tags, favicon, or schema markup | `<head>` in `index.html#L3-L12` | Invisible in social shares and degraded search indexing |
| **ISS-09** | **MEDIUM** | UX / Mobile | Mobile hamburger only opens nav links; sidebar profile & CV inaccessible on mobile | `styles.css#L902-L935`, `script.js#L74-L92` | Critical resume and contact actions hidden on mobile |
| **ISS-10** | **LOW** | Code Quality | Entire secondary website project checked into root folder | `/Responsive-Multi-Page-Website-main/` (1.7 MB) | Repository bloat, confusion in site structure |
| **ISS-11** | **LOW** | UX / Privacy | Generic Discord DM link and raw personal phone/birthdate published in plain text | `index.html#L41`, `#L48`, `#L65` | Dead link for visitors; potential spam exposure |
| **ISS-12** | **LOW** | Code Quality | Dead / mock Google Maps coordinates causing iframe loading warning | `index.html#L578` | Looks unpolished or broken |

---

## 5. Proposed Skills Reorganization Schema

To meet the requirements, the skills must transition from 3 conflated tabs to an independent, data-driven categorization model:

```
Category 1: Programming Languages
  ├── HTML5 / CSS3
  ├── JavaScript (ES6+)
  ├── Python
  ├── Java
  ├── C#
  └── C++

Category 2: Frontend & UI Design
  ├── Modern Responsive Web Design (Flexbox, CSS Grid, Semantic HTML)
  ├── Figma (Wireframing, UI prototyping, design systems)
  ├── Canva (Presentation & visual asset production)
  └── Adobe Photoshop (Graphic design, asset optimization)

Category 3: Backend & Systems
  ├── Node.js (Server runtime, RESTful APIs, CLI tools)
  └── Object-Oriented Programming (OOP Architecture in Java/C#)

Category 4: Databases & Storage
  └── MySQL / Relational Database Design (SQL querying, schema architecture)

Category 5: Networking & Infrastructure
  ├── Cisco Packet Tracer (Network topology simulation, switch/router config)
  ├── Network Addressing & Subnetting (IPv4/IPv6, CIDR, VLANs)
  └── Network Security & Troubleshooting (Diagnostics, firewalls, protocols)

Category 6: AI Tools & Workflow Acceleration
  ├── Google Antigravity (Agentic AI coding, multi-agent workspace automation, architectural orchestration)
  ├── Anthropic Claude (Deep architectural reasoning, complex refactoring, documentation synthesis)
  └── Google Gemini (Research, multimodal code review, rapid algorithm debugging)

Category 7: Developer Tools & Productivity
  ├── Git & GitHub (Version control, branch workflows, pull requests)
  ├── VS Code (Custom environments, debugging, extensions)
  ├── Jira (Issue tracking, agile sprints, task management)
  ├── Unity Engine (Game physics, C# scripting, interactive media)
  └── Microsoft 365 (Word, Excel, PowerPoint technical documentation)
```

*(This taxonomy will be formalized into a clean JSON/YAML data structure in Deliverable 4: `migration-plan.md`.)*
