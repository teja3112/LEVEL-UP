# Level Up

A gamified daily task system — configure your tasks and reward shop once, then the
system locks so you can't casually water down your own goals. Complete tasks to earn
coins and build per-task streaks; spend coins in the reward shop.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Other scripts

```bash
npm run build   # production build
npm run start   # run the production build (after `npm run build`)
```

## Project structure

```
level-up-nextjs/
├── app/
│   ├── layout.tsx        # root layout, imports globals.css
│   ├── page.tsx           # entry point, renders <LevelUpApp />
│   └── globals.css        # Tailwind directives + base styles
├── components/
│   ├── LevelUpApp.tsx      # main app: sidebar nav, dashboard, rewards, achievements, settings
│   ├── OnboardingWizard.tsx # first-run setup wizard (tasks + reward shop)
│   ├── ConfigLockedNotice.tsx
│   ├── SettingsPage.tsx    # configuration reset flow (type RESET to confirm)
│   ├── TaskRow.tsx          # task editor row used only during onboarding
│   ├── RewardRow.tsx        # reward editor row used only during onboarding
│   └── ui.tsx               # shared presentational primitives (buttons, inputs, confetti, etc.)
├── lib/
│   ├── types.ts             # shared TypeScript types
│   └── constants.ts         # design tokens, seed data, helper functions
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

## How the app works

1. **First run** — you go through a short onboarding wizard: define your daily tasks
   (name, category, coin reward) and your reward shop (icon, name, cost, optional
   rules). Sensible defaults are pre-filled so you can just hit Next.
2. **Finish setup** locks the configuration. From then on you can only complete tasks,
   redeem rewards, and view your calendar/achievements — not edit the definitions.
3. **Configuration** (sidebar, padlock icon) always shows a locked notice; from there
   you can request a configuration reset.
4. **Settings** has the actual reset flow: a warning, an optional "full reset" toggle
   (wipes coins/streaks/achievements too), and it requires typing `RESET` before you
   can confirm.
5. Resetting sends you back through onboarding to rebuild your tasks and rewards.

## Notes

- All app state is in-memory (React state) for this prototype — refreshing the page
  resets everything. Wiring up persistence (e.g. a database, or `localStorage` outside
  of the artifact sandbox this was originally built in) is a natural next step.
- Colors, spacing, and other design tokens live in `lib/constants.ts` if you want to
  retheme the app.
