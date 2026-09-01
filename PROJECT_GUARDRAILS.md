# PROJECT GUARDRAILS
**Project**: Harshit Saxena Portfolio  
**Stack**: Next.js 14 App Router · TypeScript · Tailwind CSS v3 · Framer Motion  
**Last Verified**: 2026-07-24  

---

## Why Unstyled HTML Appeared (Root Cause)

This project began with a **static wireframe phase** — a raw `index.html` and `index.css`
were created in the project root before Next.js was initialized. Those files were later
deleted, but the problem **kept reappearing intermittently** for one specific reason:

> **The IDE browser preview and live development server are two different servers.**

When you open `index.html` directly in a browser (File > Open, VS Code Live Server,
or a drag-and-drop preview), the browser loads the raw static file at the filesystem
path — **not** the Next.js dev server at `http://localhost:3000`.

The correct and only way to preview the project is:

```
npm run dev
→ Open http://localhost:3000 in the browser
```

Any other preview method will either show a 404 or a stale cached static file.

---

## Permanent Fix Applied

1. `index.html` — **deleted permanently** (was a static wireframe artifact from Phase 0).
2. `index.css`  — **deleted permanently** (was a static wireframe artifact from Phase 0).

These files must never be recreated in the project root.

---

## Current Verified File Structure

```
harshit-saxena-portfolio/
├── next.config.mjs          ← ONE Next.js config. Never duplicate.
├── tailwind.config.ts       ← ONE Tailwind config. Never duplicate.
├── postcss.config.js        ← ONE PostCSS config. Never duplicate.
├── package.json
├── tsconfig.json
└── src/
    ├── app/
    │   ├── globals.css      ← ONE global stylesheet. Never duplicate.
    │   ├── layout.tsx       ← Root layout. Imports globals.css ONCE.
    │   └── page.tsx         ← Homepage route.
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── CommandPalette.tsx
        └── ProjectCaseStudy.tsx
```

---

## Rules That Must Never Be Broken

### 1. Never create static HTML or CSS files in the project root.
The files `index.html` and `index.css` at the root will be served
by static file servers (VS Code Live Preview, OS file open, etc.)
and bypass the Next.js pipeline entirely.

### 2. Never create a second `globals.css`.
There is exactly ONE stylesheet: `src/app/globals.css`.
It contains the three Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
A second globals.css anywhere else (e.g., `src/globals.css` or `app/global.css`)
will either be ignored by Next.js or conflict with the primary one.

### 3. Never import `globals.css` from a component file.
It is imported exactly ONCE from `src/app/layout.tsx`. Components
should not import global stylesheets.

### 4. Never duplicate config files.
Each config must exist in exactly ONE location:
- `tailwind.config.ts` — root only
- `postcss.config.js` — root only
- `next.config.mjs` — root only

### 5. Always preview via `npm run dev` → `http://localhost:3000`.
Never open files directly in a browser or use a static file server
(Live Server, Python http.server, etc.) to preview this project.

### 6. Never hardcode font-family in `:root` or `body` CSS.
Fonts are managed exclusively by `next/font/google` (Inter, JetBrains Mono).
The CSS variables (`--font-inter`, `--font-jetbrains`) are injected at runtime.
Hardcoding `font-family: 'Inter'` in `:root` will conflict with `next/font`
and cause FOUT (Flash of Unstyled Text) or font fallback to Times New Roman.

### 7. After any config change, restart the dev server.
Tailwind and PostCSS configs are read at startup. Changes to
`tailwind.config.ts` or `postcss.config.js` require a full restart of
`npm run dev` — a hot reload is not sufficient.

---

## How to Verify the Pipeline Is Working

Run this before any major session:

```powershell
# 1. Confirm no orphan static files exist
Get-ChildItem -Recurse -Include "index.html","index.css" | Where-Object { $_.FullName -notlike "*node_modules*" }
# Expected output: (empty — no files found)

# 2. Confirm exactly ONE globals.css
Get-ChildItem -Recurse -Include "globals.css" | Where-Object { $_.FullName -notlike "*node_modules*" }
# Expected output: src\app\globals.css (one file only)

# 3. Clean build with zero errors
npm run build
# Expected output: ✓ Compiled successfully  ✓ Generating static pages (4/4)
```
