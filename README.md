# ViewTube

A full-stack, YouTube-style video site built with Next.js, TypeScript, Tailwind CSS, Prisma and SQLite. It is a portfolio project with original ViewTube branding and is not affiliated with YouTube.

> **Verification status:** this project was written in a sandbox that could not reach the npm registry, so `npm install`, `npm run build`, `npm run lint` and the browser behaviour have **not been run** by the author. See [Verification](#verification) for exactly what was and wasn't checked. If anything fails on your machine, the error output will point at the fix.

## Features

- **Discovery:** category chips (URL based), infinite scroll plus a "Show more" button, loading skeletons, empty and error states
- **Search:** server-side suggestions with keyboard navigation, voice search (Chrome/Edge), results with sort (relevance, date, views), duration filter and pagination, all in the URL
- **Watch page:** custom player (play/pause, seek, volume, speed, fullscreen, keyboard shortcuts, resume where you left off), like/dislike, share, save to Watch later or playlists, subscribe, expandable description, comments with replies and delete, recommended videos
- **Shorts:** vertical scroll-snap feed, autoplay for the visible short, mute, like, comments panel, share, subscribe
- **Channels:** banner, avatar, subscriber count, Videos / Shorts / Playlists / About tabs, subscribe
- **Accounts:** sign up, sign in, sign out, 30-day persistent sessions, server-side validation
- **Library:** watch history (remove items, clear all), Watch later, Liked videos, user playlists (create, add/remove videos, delete), Subscriptions feed
- **Settings:** light/dark/device theme, autoplay and default speed, clear history
- **Responsive:** collapsible sidebar, slide-out drawer, bottom navigation on phones

## Technology stack

Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS 3, Lucide React, Prisma 5 with SQLite, Zod.

## Prerequisites

- Windows 11 (macOS and Linux also work)
- **Node.js 20 LTS or newer** (18.18+ minimum): https://nodejs.org
- An internet connection (npm packages, Prisma's engine download, sample video and thumbnails)
- VS Code (optional)

Check your versions in a terminal: `node -v` and `npm -v`.

## Setup on Windows 11

1. Unzip `viewtube.zip` somewhere simple, for example `C:\dev\viewtube`.
2. Open the folder in VS Code (**File > Open Folder**) and open a terminal (**Terminal > New Terminal**).
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000.

On the first `npm run dev` (or `npm run build`) a script creates `.env` from `.env.example`, creates the SQLite database at `prisma/dev.db` and loads the sample data. You do not need to run any database command yourself.

Production build:

```bash
npm run build
npm run start
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run lint` | ESLint (Next.js rules) |
| `npm run typecheck` | TypeScript in strict mode, no output |
| `npm run db:push` | Applies `prisma/schema.prisma` to the database |
| `npm run db:seed` | Re-loads the sample catalogue (safe to repeat) |
| `npm run check:images` | Verifies every local image path used by the sample data |
| `npm run db:reset` | Deletes all data and re-seeds. **This also deletes accounts.** |

## Environment variables

Defined in `.env.example` (copied to `.env` automatically).

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | SQLite file, `file:./dev.db` (relative to the `prisma` folder) |
| `PEXELS_API_KEY` | No | Free key from https://www.pexels.com/api/ . When set, ViewTube loads live videos from Pexels instead of the bundled sample catalogue. Read on the server only. |

No password pepper or session secret is needed: sessions are random tokens stored (hashed) in the database.

## Data sources

- **Demo mode (default, no key):** 13 sample items. The video files come from Google's public `gtv-videos-bucket` (Blender Foundation open movies and short test clips). Four of the clips are flagged as Shorts. Their thumbnails, and all channel avatars and banners, are local artwork (see [Images](#images)).
- **Pexels mode (`PEXELS_API_KEY` set):** home, search and Shorts query the Pexels Videos API. Results are cached in the local database so likes, comments, history and playlists work on them. If the API fails (bad key, rate limit, offline), pages show an explanatory error instead of fake data. In this mode sort and duration filters apply only to the current page of results, because the API can't sort or filter.

## Images

Every image in demo mode is a local file under `public/images`, so nothing depends on a third-party image host:

| Folder | Contents | Size |
| --- | --- | --- |
| `public/images/videos/` | One unique thumbnail per sample video. Shorts use portrait posters. | 1280x720, Shorts 720x1280 |
| `public/images/channels/` | An avatar and a banner for each of the 5 sample channels | 512x512 and 2560x640 |

This is original, illustrated artwork generated by `tools/generate-art.mjs`, not photographs or screenshots from the films. The generated files are committed, so the app does not need the generator. To change the artwork, edit the script, then run `npm install --no-save sharp` and `node tools/generate-art.mjs`.

How images are rendered:

- All images use a plain `<img>` through `src/components/ui/SmartImage.tsx`. It fills a parent with a fixed aspect ratio (so nothing shifts), shows a shimmer while loading, and switches to a fallback only if the image really fails. It never retries, so there is no fallback loop.
- Fallbacks are not one generic picture. A failed thumbnail shows a gradient in the channel's color with the video's own title. A failed avatar shows the channel's initials. A failed banner leaves the channel-colored gradient.
- Pexels mode uses the thumbnail URL that the Pexels API returns for each video (hosted on `images.pexels.com`). Those are only available at runtime with your key. `next.config.mjs` already allows that host in case you switch any component to `next/image`.

**Updating an existing database:** `npm run dev` and `npm run build` re-apply the schema and re-seed automatically whenever the schema or sample data changes. The seed only upserts the sample channels, videos and playlists, so it corrects stored image paths and adds the new `avatarUrl` and `bannerUrl` columns without deleting accounts, comments, likes, subscriptions, history or user playlists, and without resetting view counts. To force it by hand: `npx prisma db push` then `npm run db:seed`.

Check the local image files at any time with `npm run check:images` (no dependencies; confirms each referenced file exists, is a real JPEG, and prints its dimensions).

## Data model

`User`, `Session`, `Channel`, `Video`, `Subscription`, `Reaction`, `Comment` (self-relation for replies), `WatchHistory`, `WatchLater`, `Playlist` (owned by a user or a channel) and `PlaylistItem`. See `prisma/schema.prisma`. The schema is applied with `prisma db push`; there is no migrations folder.

## Security notes

- Passwords are hashed with scrypt (Node's built-in `crypto`) and a per-user salt.
- Sessions are 32-byte random tokens in an `httpOnly`, `SameSite=Lax` cookie (`Secure` over https). Only a SHA-256 hash is stored, so sessions can be revoked and leaked database rows can't be replayed.
- All API inputs are validated with Zod. Write requests must be JSON and same-origin.
- Private actions check the session; playlist, comment and history operations are scoped to the owner.
- Sign-in attempts are rate limited in memory (10 per 15 minutes per IP and email). This resets when the server restarts and is not shared between server instances.

## Project structure

```
prisma/               schema.prisma, seed.ts
scripts/              ensure-setup.mjs (creates .env and the database on first run)
src/app/              pages and /api route handlers
src/components/       layout, video, library, auth and ui components
src/lib/              auth, catalog, user-data, validation, http helpers, Pexels client
src/data/             sample channels and videos used by the seed
public/images/        thumbnails, Shorts posters, channel avatars and banners
tools/                generate-art.mjs (artwork generator), verify-images.mjs
```

## Troubleshooting

- **`npm install` fails downloading Prisma engines:** check your connection, VPN or proxy, then run `npm install` again.
- **PowerShell says scripts are disabled:** use the VS Code terminal in "Command Prompt" mode, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.
- **Port 3000 is in use:** `npm run dev -- -p 3001`.
- **"Table does not exist" or other database errors:** stop the server, delete `prisma/dev.db`, run `npm run dev` again (it recreates and re-seeds the database).
- **Prisma client errors after changing the schema:** run `npx prisma generate`.
- **Thumbnails or videos don't load:** the sample host needs internet access.
- **Voice search unsupported:** use Chrome or Edge and allow the microphone.
- **Styling looks stale:** stop the server, delete the `.next` folder, run `npm run dev`.

## Verification

Run on the author's sandbox (no registry access):

- Syntax check of every TypeScript/TSX file with the TypeScript compiler: passed
- Check that every project import and named export resolves: passed
- Strict type-check and unit run of the pure formatting helpers (`src/lib/format.ts`): passed
- `npm run check:images`: all 23 local image paths exist, are valid JPEGs, and have the expected dimensions: passed
- Visual inspection of every generated thumbnail, Shorts poster, avatar and banner: done
- Prop-level type check of components and pages with stubbed external libraries (this caught an unused component with a wrong prop, which was removed): no genuine errors remain

**Not verified:** the sandbox has no network, so the sample **video file** URLs (`gtv-videos-bucket`) and any **Pexels** image or video URLs could not be tested. Local images do not depend on them.

**Not run:** `npm install`, `prisma generate`, `prisma db push`, the seed, `npm run build`, `npm run lint`, full type-checking against React/Next/Prisma types, and any browser or Windows testing. No automated test suite exists yet.

## Known limitations

- Demo thumbnails are illustrations made for this project, not frames from the films.
- Pexels channels have no avatar image, so they show initials.
- Uploading is not supported (no video hosting), so "Your videos" explains this and the Create button says so.
- Comments and reactions are per video; there are no comment likes, notifications or live chat.
- Subscriber counts are a seeded base plus real subscriptions.
- Notifications are an empty-state menu; there is no notification system.
- Search uses SQL `LIKE` matching, not full-text search.
- No email verification or password reset.
- The in-memory sign-in limiter does not scale beyond a single server process.
- No migrations folder; the database is created with `prisma db push`.
