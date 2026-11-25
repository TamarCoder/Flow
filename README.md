# Flow

**შენი დღე, ერთ სიაში** — your day, in one list.

Flow is a personal task app. You group tasks into projects and move each task
through three states: to do, in progress, done. The interface is in Georgian
and has a light and a dark theme.

## Features

- Projects with a progress bar
- Tasks: add, edit, delete (with confirmation), change status in one click
- Filters with counts: all, to do, in progress, done
- A page for each task, with a description that saves while you type
- Profile: name and theme

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000 and press **დაწყება** (Start).

There is no backend yet. Your projects and tasks are stored in this browser
(`localStorage`, key `flow-data`), so they stay after a refresh. The first visit
shows a few sample projects. To start empty, clear site data in the browser.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Sass modules, Radix UI,
React Hook Form with Zod, and SWR for data fetching.

## Project layout

```
src/
├── app/            routes: /, /dashboard, /projects/[id], /projects/[id]/tasks/[taskId], /profile
├── components/     one folder per component, with its .module.scss
├── hooks/          SWR hooks: useProjects, useTasks, useTask, useProfile, ...
├── api/client.ts   every request goes through here
├── mocks/          sample data and the browser-storage backend (delete when a real API exists)
├── lib/            validation schemas, status labels, theme, feature flags
└── types/          shared data shapes
```

## Connecting a backend

The app is ready for a REST API. Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://your-api.example.com
NEXT_PUBLIC_AUTH_ENABLED=true   # shows login, register, change password and log out
```

With `NEXT_PUBLIC_API_URL` set, `src/api/client.ts` sends every request to the
API instead of the mocks. Requests include cookies (`credentials: "include"`).
The API needs these routes; `src/mocks/handlers.ts` shows what each one returns.

| Method | Path | Purpose |
|---|---|---|
| GET | `/me` | Current user |
| PATCH | `/me` | Change name |
| POST | `/me/password` | Change password |
| POST | `/auth/register` | Register |
| POST | `/auth/login` | Log in |
| POST | `/auth/logout` | Log out |
| GET | `/projects` | Projects with `taskCount` and `doneCount` |
| POST | `/projects` | Create a project |
| GET | `/projects/:id` | One project |
| GET | `/projects/:id/tasks` | Tasks of a project |
| POST | `/projects/:id/tasks` | Add a task |
| GET | `/tasks/:id` | One task |
| PATCH | `/tasks/:id` | Change title, status or description |
| DELETE | `/tasks/:id` | Delete a task |

When the backend works, delete `src/mocks/` and the mock branch in
`src/api/client.ts`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## License

[MIT](LICENSE)
