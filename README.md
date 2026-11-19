# VANDANA INFRATEK — Architecture, Luxury Interiors & Turnkey Execution

> Professional, modular, and maintainable static web architecture crafted for high-performance scrollytelling and luxury architectural presentation.

---

## 1. Directory Structure

```text
vandana-infratek/
│
├── index.html                   # Master flagship landing page (Full experience & animation)
├── about.html                   # Dedicated Studio Manifesto & Philosophy page
├── services.html                # Dedicated Architectural Capabilities & Services page
├── projects.html                # Dedicated Portfolio & Selected Works archive
├── contact.html                 # Dedicated Private Consultation & Inquiry page
│
├── assets/                      # Static brand assets
│   ├── images/
│   │   ├── logo/                # Brand mark and vector identity (logo.svg)
│   │   ├── hero/                # High-resolution hero backdrops
│   │   ├── projects/            # Architectural project photography
│   │   ├── interiors/           # Bespoke millwork and interior imagery
│   │   ├── scroll-frames/       # 238 sequentially indexed JPG frames (ezgif-frame-001.jpg - 238.jpg)
│   │   └── general/             # Background textures and scrims
│   ├── videos/                  # Motion media assets (hero, projects, animations)
│   ├── fonts/                   # Local web fonts (if offline font hosting is required)
│   └── icons/                   # Vector UI and social SVG icons (whatsapp.svg, instagram.svg, etc.)
│
├── css/                         # Modular CSS architecture
│   ├── main.css                 # Master bundle importing all modules
│   ├── variables.css            # Design tokens, color palettes, fonts, radii, and shadows
│   ├── reset.css                # Base normalization and luxury scrollbar styling
│   ├── layout.css               # Canvas background, scrims, section containers, and grids
│   ├── components.css           # Frosted glass header, cards, carousels, buttons, form, floating dock
│   ├── animations.css           # Keyframes (pulse, reveals, fade-ins)
│   ├── responsive.css           # Media queries for 1024px, 960px, and 768px viewports
│   └── pages/                   # Page-specific styling overrides
│       ├── home.css
│       ├── about.css
│       ├── services.css
│       ├── projects.css
│       └── contact.css
│
├── js/                          # Modular JavaScript architecture
│   ├── main.js                  # Master application orchestrator and lifecycle manager
│   ├── navigation.js            # Glass header elevation, scroll-spy active state, smooth anchor jump
│   ├── animations.js            # General entrance reveals and scroll-hint interaction
│   ├── scroll-animation.js      # 238-frame canvas scrub engine with Lerp interpolation
│   ├── instagram-embed.js       # Official Instagram embed.js loader and swipeable reels carousel
│   ├── contact.js               # Form validation, client transmission simulation, and feedback
│   └── components/              # Component-specific enhancement scripts
│       ├── header.js
│       ├── footer.js
│       └── project-gallery.js
│
├── components/                  # Reusable HTML template partials
│   ├── header.html              # Frosted glass header markup
│   ├── footer.html              # Studio footer markup
│   └── instagram-section.html   # Featured Reel embed and carousel markup
│
├── data/                        # Structured JSON data feeds
│   ├── projects.json            # Architectural residency portfolio data
│   ├── services.json            # Core disciplines and capabilities data
│   └── instagram-reels.json     # Official Instagram Reel IDs, URLs, and metadata
│
├── backup/                      # Original un-refactored file backups
│   └── index.html.original
│
├── .gitignore                   # Git exclusion rules
└── README.md                    # Project documentation
```

---

## 2. Architecture & Modules

### CSS Architecture
Separated strictly by responsibility to eliminate bloated inline styles:
- **`css/variables.css`**: Defines CSS Custom Properties (`--color-bg-primary`, `--color-accent-brass`, `--radius-full`, `--shadow-lg`, etc.).
- **`css/reset.css`**: Normalized base box model, smooth scrolling, and custom bronze/dark scrollbar.
- **`css/layout.css`**: Positions `#canvas` fixed in background, `.bg-overlay` radial scrim, and `.section` constraints.
- **`css/components.css`**: Modern frosted glass pill header (`backdrop-filter: blur(24px)`), hero actions, project grid cards, stat counters, service cards, official Instagram embed box, carousel track, form controls, and bottom-right floating social buttons.
- **`css/animations.css`**: Micro-interaction keyframes (`pulseDot`, `floatPulse`, `fadeInHero`).
- **`css/responsive.css`**: Mobile menu collapse, single-column flex grids on small tablets and mobile devices.
- **`css/main.css`**: Bundles all files via `@import` rules.

### JavaScript Architecture
Zero build-step dependency. Pure Vanilla JavaScript:
- **`js/scroll-animation.js`**:
  - Handles the 238 JPG sequence in `assets/images/scroll-frames/`.
  - Calculates device pixel ratio scaling (`window.devicePixelRatio`).
  - Covers screen seamlessly with `cover` aspect ratio algorithm.
  - Lerp interpolation (`0.085` damping) creates a fluid cinematic scrub in both forward and reverse directions.
  - Frame 1 is rendered immediately on page load to eliminate flashes.
- **`js/instagram-embed.js`**:
  - Injects `https://www.instagram.com/embed.js` only once into the page.
  - Safely calls `window.instgrm.Widgets.load()` for dynamic re-renders.
  - Powers the horizontal Reel carousel with arrow buttons, scroll-snap, and mouse drag-to-scroll.
  - Decoupled from static HTML; links can be managed via `data/instagram-reels.json`.
- **`js/navigation.js`**:
  - Observes scroll depth to toggle `.scrolled` frosted glass elevation on `#header`.
  - Highlights active navigation item as sections scroll into view.
- **`js/contact.js`**:
  - Validates contact form inputs and provides instant confirmation.

---

## 3. How to Run Locally

### Option A: Direct Browser File Open (Zero Setup)
Simply double-click `index.html` or open `index.html` directly in Google Chrome, Microsoft Edge, Firefox, or Safari. All styles, canvas scrollytelling frames, and navigation will work immediately without needing any server.

### Option B: Local Development Server (Recommended for dynamic JSON fetching)
Run any standard lightweight HTTP server from the project directory:

```bash
# Using Python 3:
python -m http.server 8000

# Using Node.js (npx):
npx serve .

# Using VS Code:
# Right-click index.html and select "Open with Live Server"
```
Then navigate to `http://localhost:8000`.

---

## 4. Deployment

Deployable instantly to any static hosting service with zero build configuration:
- **GitHub Pages**: Push repo and set source branch to `main` (root `/`).
- **Netlify / Vercel**: Drag and drop the folder or link repository. Publish directory is the root (`/`).
- **Cloudflare Pages / AWS S3 / CloudFront**: Upload all files preserving directory hierarchy.

---

## 5. Verification & Testing Checklist

- [x] **Frame Sequence**: Verified 238 frames loading in order from `assets/images/scroll-frames/ezgif-frame-001.jpg` through `238.jpg`.
- [x] **Scroll Interpolation**: Verified forward and reverse scrubbing with requestAnimationFrame Lerp.
- [x] **Header & Branding**: "VANDANA INFRATEK" branding with brass beacon, navigation links, and dynamic frosted glass blur.
- [x] **Instagram Reels**: Official embed renders cleanly with `https://www.instagram.com/embed.js`; carousel scrolls smoothly with both buttons and mouse drag.
- [x] **Floating Social Icons**: Fixed WhatsApp and Instagram buttons with high z-index (`9999999`) and hover tooltips on both desktop and mobile.
- [x] **Sub-pages**: `about.html`, `services.html`, `projects.html`, and `contact.html` functional and linked.
- [x] **Safety Backup**: Original `index.html` archived in `backup/index.html.original`.
