# Academic Personal Website Template

A React + Vite + TypeScript personal academic website. Built with Tailwind CSS, MUI, and React Router.

**Live demo:** https://jiegroup.github.io/personal-web-template/

---

## Quickstart

```bash
git clone https://github.com/JieGroup/personal-web-template.git
cd personal-web-template
npm install
npm run dev
```

---

## Customize

### 1. Edit your personal info — one file

Open `src/config/site.config.ts` and replace the values:

```ts
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title @ Your Institution',
  email: 'you@example.com',
  address: 'Your Office Address',
  profilePhoto: '/images/profile/your-photo.png',
  officeMapImage: '/images/profile/your-map.png',
  copyright: 'Your Name',
  social: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    googleScholar: 'https://scholar.google.com/citations?user=YOURID',
  },
  siteTitle: 'Your Name — Personal Site',
  siteDescription: 'Personal website of Your Name',
  siteAuthor: 'Your Name',
};
```

### 2. Replace your profile photo

Put your photo at `public/images/profile/your-photo.png` and update `profilePhoto` in `site.config.ts`.

### 3. Update content pages

| File | What to edit |
|------|-------------|
| `src/components/Home.tsx` | Biography, research interests, awards |
| `src/components/Students.tsx` | Current and graduated students |
| `src/components/Teaching.tsx` | Courses |
| `src/components/Outreach.tsx` | Industry and outreach activities |
| `src/components/ResearchTopics/` | Research directions and publications |
| `public/assets/cv.pdf` | Your CV |

---

## Deploy

### GitHub Pages

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
# then push build/ to gh-pages branch
```

### Vercel / Netlify

Connect the repo — set build command to `npm run build` and output directory to `build`. No base path needed.

### Local

```bash
npm run dev      # development server at localhost:5300
npm run build    # production build → build/
npm run preview  # preview production build locally
```
