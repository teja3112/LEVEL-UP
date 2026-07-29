import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Level Up",
  description: "A gamified daily task system — tasks, streaks, coins and a reward shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg text-white">{children}</body>
    </html>
  );
}
