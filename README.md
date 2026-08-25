# Victor Torres' Personal Website and Blog

This is the source code for my personal website and blog built with [Astro](https://astro.build/).

This site is my personal experiment. Expect to see changes and improvements over time as I learn more about modern 
web development practices, new frameworks, and tools.

[🌍 Visit the blog](https://victortorres.dev)

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Content Collections + MDX) + [Vue.js](https://vuejs.org/) for components
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Typography Plugin
- **Markdown**: [MDX](https://mdxjs.com/) with Astro content collections
- **Hosting**: [Netlify](https://netlify.com)

## 📦 Features

- Static site generation for fast performance
- SEO-friendly with metadata and structured data
- Markdown & MDX blog posts with custom components
- Content collections for easy blog management
- Image optimization for blog posts
- Simple CI/CD deployment via Netlify
- Tag and category filtering (planned)
- Search functionality (planned)
- Blog post series support (planned)
- Dark/light mode support (planned)
- Analytics integration (planned)
- Newsletter signup (planned)

## 📂 Project Structure

```plaintext
/
├── public/ # Static assets (favicon, etc.)
│   └── favicon.svg
├── src/
│   ├── blog/ # Blog post content (MDX)
│   ├── components/ # Reusable components (e.g., BlogCard, Footer)
│   ├── images/ # Image assets (profile, blog images)
│   │   └── blog/ # Hero images and other post-specific images
│   ├── layouts/ # Page and post layouts
│   ├── pages/ # Static pages (Home, About, Resources)
│   ├── styles/ # Tailwind config (CSS-first, v4) + global styles
│   └── content.config.ts # Astro content collections config
├── astro.config.mjs # Astro configuration
├── package.json # Project dependencies and scripts
├── AGENTS.md # Guidance for AI coding agents
└── tsconfig.json # TypeScript configuration
```

## 🧑‍💻 Getting Started

```bash
# Clone the repo
git clone https://github.com/vikthortt/victortorres.dev.git
cd victortorres.dev

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🔧 Development

### Adding New Blog Posts
1. Create a new MDX file in the `src/blog/` directory
2. Add frontmatter with title, date, description, etc.
3. Write your content using Markdown and JSX components

### Customizing Styles
- Global styles are in `src/styles/global.css`
- Component-specific styles use Tailwind CSS utility classes

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 License

All the code is licensed under the MIT License. Feel free to use it as a reference or starting point for your own projects.

The content of the blog posts is my personal work and may be shared with attribution.

The images used are either my own or sourced from free stock image sites with proper attribution.
