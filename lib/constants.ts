import {
  Dumbbell,
  Code2,
  BookOpen,
  Wallet,
  Briefcase,
  Brain,
  HeartPulse,
  GraduationCap,
  Target,
  type LucideIcon,
} from "lucide-react";
import type { Achievement, CalendarDay, DraftTask, Reward } from "./types";

export const BG = "#09090B";
export const CARD = "#111113";
export const CARD_BORDER = "#1F1F23";
export const BLUE = "#3B82F6";
export const PURPLE = "#A855F7";
export const EMERALD = "#10D9A0";
export const AMBER = "#F5A623";
export const RED = "#F87171";

export const CATEGORIES = [
  "Fitness",
  "Coding",
  "Studying",
  "Reading",
  "Finance",
  "Business",
  "Meditation",
  "Health",
  "Learning",
  "Career",
  "Personal",
  "Custom",
];

export interface CategoryMeta {
  icon: LucideIcon;
  color: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  Fitness: { icon: Dumbbell, color: EMERALD },
  Coding: { icon: Code2, color: BLUE },
  Studying: { icon: GraduationCap, color: PURPLE },
  Reading: { icon: BookOpen, color: "#EAB308" },
  Finance: { icon: Wallet, color: EMERALD },
  Business: { icon: Briefcase, color: BLUE },
  Meditation: { icon: Brain, color: PURPLE },
  Health: { icon: HeartPulse, color: RED },
  Learning: { icon: BookOpen, color: BLUE },
  Career: { icon: Briefcase, color: PURPLE },
  Personal: { icon: Target, color: AMBER },
  Custom: { icon: Target, color: "#9CA3AF" },
};

export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const QUOTES = [
  "Discipline is choosing what you want most over what you want now.",
  "Small steps, repeated daily, outrun big leaps taken rarely.",
  "Your future self is built from today's choices.",
  "Consistency is the quiet flex.",
];

export function defaultTasks(): DraftTask[] {
  return [
    { id: uid(), title: "Gym", category: "Fitness", coins: 38 },
    { id: uid(), title: "Python", category: "Coding", coins: 38 },
    { id: uid(), title: "SQL", category: "Coding", coins: 13 },
    { id: uid(), title: "Power BI", category: "Coding", coins: 38 },
    { id: uid(), title: "Data Analysis", category: "Learning", coins: 75 },
    { id: uid(), title: "Read Finance News", category: "Finance", coins: 13 },
    { id: uid(), title: "Sleep before 11 PM", category: "Health", coins: 13 },
  ];
}

export function defaultRewards(): Reward[] {
  return [
    { id: uid(), icon: "🍕", name: "Pizza", cost: 800, category: "Food", rules: "" },
    { id: uid(), icon: "🎬", name: "Movie night", cost: 1200, category: "Leisure", rules: "" },
    { id: uid(), icon: "🏍", name: "Sunday bike ride", cost: 2500, category: "Leisure", rules: "" },
    { id: uid(), icon: "🛍", name: "Shopping", cost: 5000, category: "Treat", rules: "Save up across the week" },
    { id: uid(), icon: "☕", name: "Starbucks", cost: 500, category: "Food", rules: "" },
  ];
}

export function genCalendar(): CalendarDay[] {
  const days: CalendarDay[] = [];
  const today = new Date();
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const seed = (d.getDate() * 7 + d.getMonth()) % 10;
    const level: 0 | 1 | 2 = seed > 6 ? 2 : seed > 3 ? 1 : 0;
    days.push({ date: d, level });
  }
  return days;
}

export function initialAchievements(): Achievement[] {
  return [
    { id: "a1", name: "First blood", desc: "Complete your first task", target: 1, progress: 0 },
    { id: "a2", name: "Centurion", desc: "Complete 100 tasks", target: 100, progress: 0 },
    { id: "a4", name: "Flawless ten", desc: "10 perfect days", target: 10, progress: 0 },
    { id: "a7", name: "Unbreakable", desc: "365 day streak", target: 365, progress: 0 },
  ];
}
