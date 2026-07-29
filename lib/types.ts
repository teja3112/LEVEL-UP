export interface Task {
  id: string;
  title: string;
  category: string;
  coins: number;
  streak: number;
  done: boolean;
}

export interface DraftTask {
  id: string;
  title: string;
  category: string;
  coins: number;
}

export interface Reward {
  id: string;
  icon: string;
  name: string;
  cost: number;
  category: string;
  rules: string;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  target: number;
  progress: number;
}

export interface CalendarDay {
  date: Date;
  level: 0 | 1 | 2;
}

export interface RewardEffect {
  id: string;
  x: number;
  y: number;
  coins: number;
  streak: number;
}

export interface OnboardingConfig {
  tasks: Task[];
  rewards: Reward[];
}

export type MainTab =
  | "dashboard"
  | "calendar"
  | "rewards"
  | "achievements"
  | "configuration"
  | "settings";

export type AppPhase = "onboarding" | "main";
