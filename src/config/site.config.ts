// ============================================================
// SITE CONFIGURATION — edit this file to personalize the site
// ============================================================

// Helper: resolves public asset paths correctly regardless of deployment base path
// Works for both local dev (base='/') and GitHub Pages (base='/repo-name/')
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const siteConfig = {
  // Personal info
  name: 'Jie Ding',
  title: 'Associate Professor @UMN',
  email: 'dingj@umn.edu',
  address: 'Ford Hall, 224 Church St SE, Minneapolis, MN 55455',
  profilePhoto: asset('images/profile/Jie.png'),
  officeMapImage: asset('images/profile/FordHall-map.png'),
  copyright: 'Jie Ding',

  // Social links
  social: {
    linkedin: 'https://www.linkedin.com/in/jie-ding-46767759/',
    googleScholar: 'https://scholar.google.com/citations?user=ZyqvoqcAAAAJ&hl=en',
  },

  // Page title and SEO
  siteTitle: 'Prof. Jie Ding',
  siteDescription: 'Personal website of Jie Ding, Associate Professor at University of Minnesota',
  siteAuthor: 'Jie Ding',
};
