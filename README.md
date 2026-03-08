# Academic Personal Website Template

A React + Vite + TypeScript personal academic website template. Built with Tailwind CSS, MUI, and React Router.

**Live demo:** https://jiegroup.github.io/personal-web-template/

---

## Features

- Sidebar layout with dark/light mode
- Pages: Home, Research, Teaching, Students, Outreach, CV
- Mobile responsive
- Single config file for all personal info
- Auto-deploys to GitHub Pages on every push to `main`

---

## Quickstart

```bash
git clone https://github.com/JieGroup/personal-web-template.git
cd personal-web-template
npm install
npm run dev        # → http://localhost:5300
```

---

## Customize your info — one file

Open `src/config/site.config.ts` and fill in your details:

```ts
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title @ Your Institution',
  email: 'you@example.com',
  address: 'Your Office Address',
  profilePhoto: asset('images/profile/your-photo.png'),
  officeMapImage: asset('images/profile/your-map.png'),
  copyright: 'Your Name',
  social: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    googleScholar: 'https://scholar.google.com/citations?user=YOURID',
  },
  siteTitle: 'Your Name',
  siteDescription: 'Personal website of Your Name',
  siteAuthor: 'Your Name',
};
```

Then add your profile photo to `public/images/profile/your-photo.png`.

---

## Customize content pages

| File | What to edit |
|------|-------------|
| `src/components/Home.tsx` | Biography, research interests, awards, sponsors |
| `src/components/Students.tsx` | Current and graduated students |
| `src/components/Teaching.tsx` | Courses and syllabi |
| `src/components/Outreach.tsx` | Industry partnerships and outreach |
| `src/components/ResearchTopics/` | Research directions and publications |
| `public/assets/cv.pdf` | Your CV PDF |

---

## Auto-deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that **automatically builds and deploys** the site every time you push to `main`.

### One-time setup

1. Fork or clone this repo to your GitHub account
2. Go to **Settings → Pages** → set Source to **Deploy from a branch** → branch: `gh-pages`, folder: `/ (root)`
3. In `.github/workflows/deploy.yml`, update `VITE_BASE_PATH` to match your repo name:
   ```yaml
   VITE_BASE_PATH: /your-repo-name/
   ```
4. Push any change to `main` — the workflow triggers automatically

### After setup

Every `git push origin main` will:
1. Run `npm run build` in GitHub's cloud
2. Push the build output to the `gh-pages` branch
3. GitHub Pages serves the updated site within ~1 minute

You never need to build locally to deploy.

---

## Deploy elsewhere

### Vercel / Netlify (recommended for custom domains)

Connect your repo — set:
- Build command: `npm run build`
- Output directory: `build`
- No `VITE_BASE_PATH` needed (they serve from root `/`)

### Local preview

```bash
npm run build          # production build → build/
npm run preview        # preview at localhost:4173
```
