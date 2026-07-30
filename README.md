# 🎮 Level Up

**Level Up** is a gamified productivity application built with **Next.js** that helps users stay consistent with their daily goals. Unlike traditional to-do apps, users configure their tasks and reward shop only once. After setup, the configuration is locked, encouraging discipline and preventing frequent changes to personal goals.

## 🌐 Live Demo

👉 https://to-do-sandy-delta.vercel.app/

---

## ✨ Features

- 🎯 Create custom daily tasks during onboarding
- 🪙 Earn coins by completing tasks
- 🔥 Build individual task streaks
- 🎁 Redeem rewards from your custom reward shop
- 🏆 Achievement system
- 📅 Calendar view
- 🔒 Locked configuration system
- ⚙️ Secure configuration reset with RESET confirmation

---

## 🛠️ Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/teja3112/TO-DO.git
cd TO-DO
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📦 Other Scripts

```bash
npm run build    # Create production build
npm run start    # Start production server
```

---

## 📁 Project Structure

```
level-up-nextjs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── LevelUpApp.tsx
│   ├── OnboardingWizard.tsx
│   ├── ConfigLockedNotice.tsx
│   ├── SettingsPage.tsx
│   ├── TaskRow.tsx
│   ├── RewardRow.tsx
│   └── ui.tsx
├── lib/
│   ├── types.ts
│   └── constants.ts
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md
```

---

## 🔒 How the App Works

### Initial Setup

On the first launch, users:

- Create their daily tasks
- Create their reward shop
- Configure their productivity system

Default values are provided so users can get started quickly.

### Configuration Lock

Once onboarding is complete:

- ✅ Complete tasks
- ✅ Earn coins
- ✅ Build streaks
- ✅ Redeem rewards
- ✅ View achievements

Users **cannot**:

- ❌ Edit tasks
- ❌ Change reward values
- ❌ Add or remove rewards

This design encourages consistency instead of constantly changing goals.

### Configuration Reset

To modify the system, users must:

1. Open **Settings**
2. Choose **Reset Configuration**
3. Optionally perform a full reset
4. Type **RESET** to confirm

This prevents accidental changes.

---

## 📝 Notes

This project is currently a frontend prototype.

Application state is stored in React state, so refreshing the page resets all progress.

Future versions will include:

- Google Authentication
- Supabase Database
- Cloud Sync
- Progressive Web App (PWA)
- AI Productivity Coach

---

## 👨‍💻 Author

**Teja**

---

## ⭐ If you like this project

Give the repository a ⭐ on GitHub.
