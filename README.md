# ▶️ ViewTube

### A Modern Video Discovery & Streaming Experience

ViewTube is a YouTube-inspired, full-stack video discovery application built with modern web technologies. It focuses on video discovery, a responsive user interface, interactive playback, channel exploration, and a personalized video library experience.

<p align="center">
  <strong>Discover Videos. Explore Channels. Enjoy Your Experience.</strong>
</p>

---

## ✨ Features

- 🎬 **Video Discovery** — Browse a catalogue of sample videos and explore available categories.
- 🔍 **Search Experience** — Search for videos and discover relevant content.
- ▶️ **Video Player** — Watch videos through the application's playback interface.
- 📱 **Shorts Feed** — Explore short-form videos in a vertical scrolling layout.
- 👤 **Channel Pages** — Browse channel banners, avatars, videos, Shorts, and playlists.
- 🔐 **User Authentication** — Sign up, sign in, and sign out using the application's authentication system.
- 👍 **Reactions & Comments** — Interact with videos through supported reactions and comments.
- 📚 **Personal Library** — Access supported features such as watch history, Watch Later, liked videos, playlists, and subscriptions.
- ⚙️ **User Settings** — Configure available appearance and playback preferences.
- 🖼️ **Local Image Assets** — Bundled video thumbnails, Shorts posters, channel avatars, and banners.
- 📱 **Responsive Design** — Designed to adapt to desktop and mobile screen sizes.
- 🎨 **Modern UI** — Clean layouts, consistent spacing, and reusable interface components.
- ⚡ **Next.js Architecture** — Uses the Next.js App Router for application routing and structure.
- 🔷 **Type Safety** — TypeScript helps make the code more maintainable.
- 🗄️ **Database Integration** — Prisma and SQLite support persistent application data.
- 🎞️ **Optional Pexels Integration** — External video discovery can be enabled with a Pexels API key.

*Feature availability depends on the current implementation and configuration of the application.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework and application routing |
| React 18 | Component-based user interface |
| TypeScript | Type-safe JavaScript development |
| Tailwind CSS 3 | Styling and responsive design |
| Prisma | Database access and schema management |
| SQLite | Local relational database |
| Zod | Input validation |
| Lucide React | Icons and interface elements |
| ESLint | Code quality and linting |
| npm | Package management |

## 📁 Project Structure

```text
ViewTube/
├── prisma/                   # Database schema and seed data
├── public/                   # Static assets and images
│   └── images/               # Video thumbnails, Shorts posters, avatars, banners
├── scripts/                  # Setup scripts
├── src/                      # Application source code
│   ├── app/                  # Application routes and pages
│   ├── components/           # Reusable React components
│   ├── data/                 # Sample data
│   └── lib/                  # Application utilities and server logic
├── tools/                    # Image generation and validation utilities
├── .env.example              # Environment variable template
├── .gitignore                # Git exclusion rules
├── .eslintrc.json            # ESLint configuration
├── next.config.mjs           # Next.js configuration
├── next-env.d.ts              # Next.js TypeScript declarations
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

*The structure above is representative. Keep the existing structure of your project if some folders or filenames differ.*

## 🚀 Getting Started

Follow these steps to run ViewTube locally.

### Prerequisites

- Node.js compatible with the project's Next.js version
- npm
- Git (optional)
- An internet connection for installing dependencies and accessing externally hosted video streams

Check your installed versions:

```bash
node -v
npm -v
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/shreya-codes-295/ViewTube.git
cd ViewTube
```

Replace the repository URL and directory name if your actual GitHub repository uses a different name.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the following URL in your browser:

[http://localhost:3000](http://localhost:3000)

Follow any setup instructions displayed in the terminal during the first run.

### 4. Validate Local Images

```bash
npm run check:images
```

This command checks the bundled image assets when the corresponding script is configured in `package.json`.

### 5. Build for Production

```bash
npm run build
```

After a successful production build, start the application with:

```bash
npm run start
```

Check `package.json` for the exact scripts available in your version of the project.

## 🔒 GitHub Security

The following generated and sensitive files should remain excluded from Git:

```gitignore
node_modules/
.next/
out/
coverage/
.env
.env.local
.env.*.local
*.tsbuildinfo
.DS_Store
```

### Files to Upload

- `src/`
- `public/`
- `prisma/` source files, schema, and seed data
- `scripts/`
- `tools/`
- `.env.example`
- `.gitignore`
- `package.json`
- `package-lock.json`
- `README.md`
- Next.js, TypeScript, Tailwind CSS, ESLint, and PostCSS configuration files

### Files to Exclude

- `node_modules/`
- `.next/`
- Private environment files such as `.env`
- API keys, passwords, and other secrets
- Local database files containing personal data
- Unnecessary temporary files and generated build artifacts

**Important:** Never upload private credentials or real environment secrets to GitHub. Keep `.env.example` as a configuration template and store actual secrets locally.

## 🎯 Project Goal

ViewTube is an independent learning and portfolio project created to explore modern full-stack web development concepts, including:

- Component-based UI development
- Next.js App Router
- React and TypeScript
- Responsive web design
- Reusable frontend components
- API routes and input validation
- Authentication and session management
- Database integration with Prisma and SQLite
- Video discovery and playback interfaces
- Application architecture and maintainability
- Git and GitHub workflow

## 🔮 Future Improvements

- 📤 Video uploading and hosting
- 🔔 Notifications and additional interactive features
- 🔑 Password reset and email verification
- 🔍 Advanced search, sorting, and filtering
- 🧪 Automated unit, integration, and end-to-end testing
- ♿ Improved accessibility and keyboard navigation
- ☁️ Scalable media storage and database hosting
- 🚀 Production deployment and performance optimization

These are potential future improvements and are not claims that the features are already implemented.

## 👩‍💻 Author

**Shreya Pal**

- **GitHub:** [@shreya-codes-295](https://github.com/shreya-codes-295)

## 📄 Disclaimer

ViewTube is an independent educational and portfolio project inspired by common video-sharing platforms. It is not affiliated with, endorsed by, or an official product of YouTube or Pexels. Any third-party video streams and APIs remain subject to their respective providers' terms and availability.

## 📜 License

No license has been specified yet. Unless a license is added to the repository, the project remains subject to the copyright holder's rights.

---

<p align="center">
  <strong>ViewTube — Discover More. Watch What You Love. ▶️</strong>
</p>

<p align="center">
  Made with ❤️ using Next.js, React, TypeScript, Prisma, and SQLite
</p>
