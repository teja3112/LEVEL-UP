"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Award,
  Calendar as CalendarIcon,
  Check,
  Coins,
  Flame,
  LayoutGrid,
  Lock,
  Settings as SettingsIcon,
  ShoppingBag,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import {
  AMBER,
  BG,
  BLUE,
  CARD,
  CARD_BORDER,
  CATEGORY_META,
  EMERALD,
  PURPLE,
  QUOTES,
  genCalendar,
  initialAchievements,
} from "@/lib/constants";
import type {
  Achievement,
  AppPhase,
  CalendarDay,
  MainTab,
  OnboardingConfig,
  Reward,
  RewardEffect,
  Task,
} from "@/lib/types";
import { OnboardingWizard } from "./OnboardingWizard";
import { ConfigLockedNotice } from "./ConfigLockedNotice";
import { SettingsPage } from "./SettingsPage";
import { Confetti, EmptyNote, FloatingReward, LegendDot, SectionHeader, StatPill } from "./ui";

interface NavItem {
  id: MainTab;
  label: string;
  icon: LucideIcon;
}

export default function LevelUpApp() {
  const [phase, setPhase] = useState<AppPhase>("onboarding");
  const [mainTab, setMainTab] = useState<MainTab>("dashboard");
  const [requestResetOpen, setRequestResetOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements());
  const [calendar] = useState<CalendarDay[]>(genCalendar());

  const [effects, setEffects] = useState<RewardEffect[]>([]);
  const [redeemFlash, setRedeemFlash] = useState<Reward | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiColors = useMemo(() => [BLUE, PURPLE, EMERALD, "#FCD34D"], []);

  const completedToday = tasks.filter((t) => t.done).length;
  const completionPct = tasks.length ? Math.round((completedToday / tasks.length) * 100) : 0;

  function handleFinishOnboarding(config: OnboardingConfig) {
    setTasks(config.tasks);
    setRewards(config.rewards);
    setPhase("main");
    setMainTab("dashboard");
  }

  function performReset(fullReset: boolean) {
    setTasks([]);
    setRewards([]);
    if (fullReset) {
      setCoins(0);
      setStreak(0);
      setAchievements(initialAchievements());
    }
    setPhase("onboarding");
    setMainTab("dashboard");
    setRequestResetOpen(false);
  }

  function completeTask(task: Task, evt: React.MouseEvent<HTMLButtonElement>) {
    if (task.done || !containerRef.current) return;
    const rect = evt.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    const gainedCoins = task.coins;
    const newStreak = task.streak + 1;

    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: true, streak: newStreak } : t)));

    const effectId = `${task.id}-${Date.now()}`;
    setEffects((prev) => [...prev, { id: effectId, x, y, coins: gainedCoins, streak: newStreak }]);
    setTimeout(() => setEffects((prev) => prev.filter((e) => e.id !== effectId)), 1100);
    setCoins((c) => c + gainedCoins);

    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === "a1") return { ...a, progress: Math.min(a.target, a.progress + 1) };
        if (a.id === "a2") return { ...a, progress: Math.min(a.target, a.progress + 1) };
        return a;
      })
    );
  }

  function redeemReward(reward: Reward) {
    if (coins < reward.cost) return;
    setCoins((c) => c - reward.cost);
    setRedeemFlash(reward);
    setTimeout(() => setRedeemFlash(null), 1800);
  }

  if (phase === "onboarding") {
    return <OnboardingWizard onFinish={handleFinishOnboarding} />;
  }

  const NAV: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "calendar", label: "Calendar", icon: CalendarIcon },
    { id: "rewards", label: "Reward shop", icon: ShoppingBag },
    { id: "achievements", label: "Achievements", icon: Award },
  ];
  const NAV_BOTTOM: NavItem[] = [
    { id: "configuration", label: "Configuration", icon: Lock },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: 720,
        background: BG,
        color: "#E4E4E7",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        border: `1px solid ${CARD_BORDER}`,
      }}
    >
      <style>{`
        @keyframes confetti-pop { 0% { opacity: 1; transform: translate(-50%,-50%) rotate(0deg) scale(1); } 100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--rot)) scale(0.4); } }
        @keyframes float-up { 0% { opacity: 0; transform: translate(-50%, 0); } 15% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -46px); } }
        .floating-reward { animation: float-up 1100ms ease-out forwards; }
        .task-row { transition: background 180ms ease; cursor: pointer; }
        .task-row:hover { background: #17171B; }
        .task-row.done { opacity: 0.55; }
        .checkbox-btn { transition: transform 160ms cubic-bezier(.34,1.56,.64,1), background 160ms ease, border-color 160ms ease; }
        .checkbox-btn:active { transform: scale(0.85); }
        .nav-btn { transition: background 150ms ease, color 150ms ease; }
        .reward-card { transition: transform 180ms ease, border-color 180ms ease; }
        .reward-card:hover { transform: translateY(-3px); border-color: #2A2A30; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 220, borderRight: `1px solid ${CARD_BORDER}`, padding: "22px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px", marginBottom: 22 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={16} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.2 }}>Level Up</span>
        </div>
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = mainTab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setMainTab(n.id)}
              className="nav-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 13.5,
                fontWeight: 500,
                background: active ? "#1A1A1F" : "transparent",
                color: active ? "#fff" : "#9CA3AF",
              }}
            >
              <Icon size={16} color={active ? BLUE : "#8A8A93"} /> {n.label}
            </button>
          );
        })}
        <div style={{ height: 1, background: CARD_BORDER, margin: "8px 4px" }} />
        {NAV_BOTTOM.map((n) => {
          const Icon = n.icon;
          const active = mainTab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => {
                setMainTab(n.id);
                if (n.id !== "settings") setRequestResetOpen(false);
              }}
              className="nav-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 13.5,
                fontWeight: 500,
                background: active ? "#1A1A1F" : "transparent",
                color: active ? "#fff" : "#9CA3AF",
              }}
            >
              <Icon size={16} color={active ? AMBER : "#8A8A93"} /> {n.label}
            </button>
          );
        })}
        <div style={{ marginTop: "auto", padding: "14px 12px", borderRadius: 12, background: CARD, border: `1px solid ${CARD_BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Flame size={14} color={AMBER} /> <span style={{ fontSize: 12, color: "#9CA3AF" }}>Streak</span>
          </div>
          <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 20 }}>{streak} days</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
          <StatPill icon={Coins} label="Coins" value={coins} color="#FCD34D" />
          <StatPill icon={Flame} label="Streak" value={`${streak} days`} color={AMBER} />
          <StatPill icon={Target} label="Today" value={`${completionPct}%`} color={EMERALD} />
        </div>

        {mainTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={16} color={PURPLE} />
              <span style={{ fontSize: 13.5, color: "#C4C4CC", fontStyle: "italic" }}>{quote}</span>
            </div>
            <div>
              <SectionHeader title="Today's tasks" subtitle={`${completedToday}/${tasks.length} complete`} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tasks.map((t) => {
                  const meta = CATEGORY_META[t.category] || { icon: Target, color: BLUE };
                  const Icon = meta.icon;
                  const expanded = expandedTask === t.id;
                  return (
                    <div key={t.id}>
                      <div
                        className={`task-row${t.done ? " done" : ""}`}
                        onClick={() => setExpandedTask(expanded ? null : t.id)}
                        style={{ display: "flex", alignItems: "center", gap: 14, background: CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, padding: "12px 16px" }}
                      >
                        <button
                          className="checkbox-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            completeTask(t, e);
                          }}
                          disabled={t.done}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            border: `1.5px solid ${t.done ? EMERALD : "#3A3A40"}`,
                            background: t.done ? EMERALD : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: t.done ? "default" : "pointer",
                            flexShrink: 0,
                          }}
                        >
                          {t.done && <Check size={15} color="#09090B" strokeWidth={3} />}
                        </button>
                        <div style={{ width: 30, height: 30, borderRadius: 9, background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={14} color={meta.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: 13.5, textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
                          <div style={{ fontSize: 11.5, color: "#8A8A93", marginTop: 2 }}>{t.category}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 12, color: AMBER, flexShrink: 0 }}>
                          <Flame size={12} color={AMBER} /> {t.streak}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 12, color: "#FCD34D", flexShrink: 0 }}>
                          <Coins size={12} color="#FCD34D" /> {t.coins}
                        </div>
                      </div>
                      {expanded && (
                        <div style={{ background: "#0F0F12", border: `1px solid ${CARD_BORDER}`, borderTop: "none", borderRadius: "0 0 14px 14px", padding: "10px 16px 14px 60px", fontSize: 12, color: "#9CA3AF" }}>
                          Reward: {t.coins} coins · current streak: {t.streak} {t.streak === 1 ? "day" : "days"}.
                        </div>
                      )}
                    </div>
                  );
                })}
                {tasks.length === 0 && <EmptyNote text="No tasks configured." />}
              </div>
            </div>
          </div>
        )}

        {mainTab === "calendar" && (
          <div>
            <SectionHeader title="Consistency heatmap" subtitle="Last 35 days" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, maxWidth: 420 }}>
              {calendar.map((d, i) => {
                const bg = d.level === 2 ? EMERALD : d.level === 1 ? AMBER : "#1C1C20";
                return (
                  <div
                    key={i}
                    title={d.date.toDateString()}
                    style={{ width: "100%", aspectRatio: "1", borderRadius: 6, background: bg, opacity: d.level === 0 ? 1 : 0.85, border: `1px solid ${CARD_BORDER}` }}
                  />
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12, color: "#8A8A93" }}>
              <LegendDot color={EMERALD} label="Perfect day" />
              <LegendDot color={AMBER} label="Partial" />
              <LegendDot color="#1C1C20" label="Missed" />
            </div>
          </div>
        )}

        {mainTab === "rewards" && (
          <div>
            <SectionHeader title="Reward shop" subtitle={`${coins} coins available`} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
              {rewards.map((r) => {
                const affordable = coins >= r.cost;
                return (
                  <div key={r.id} className="reward-card" style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ fontSize: 28 }}>{r.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    {r.rules && <div style={{ fontSize: 11, color: "#8A8A93" }}>{r.rules}</div>}
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: "#FCD34D", display: "flex", alignItems: "center", gap: 6 }}>
                      <Coins size={13} /> {r.cost}
                    </div>
                    <button
                      onClick={() => redeemReward(r)}
                      disabled={!affordable}
                      style={{
                        marginTop: 4,
                        padding: "8px 0",
                        borderRadius: 10,
                        border: "none",
                        cursor: affordable ? "pointer" : "not-allowed",
                        fontWeight: 600,
                        fontSize: 12.5,
                        background: affordable ? `linear-gradient(90deg, ${BLUE}, ${PURPLE})` : "#1C1C20",
                        color: affordable ? "#fff" : "#6B7280",
                      }}
                    >
                      {affordable ? "Redeem" : "Not enough coins"}
                    </button>
                  </div>
                );
              })}
              {rewards.length === 0 && <EmptyNote text="No rewards configured." />}
            </div>
          </div>
        )}

        {mainTab === "achievements" && (
          <div>
            <SectionHeader
              title="Achievements"
              subtitle={`${achievements.filter((a) => a.progress >= a.target).length}/${achievements.length} unlocked`}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {achievements.map((a) => {
                const unlocked = a.progress >= a.target;
                const pct = Math.min(100, Math.round((a.progress / a.target) * 100));
                return (
                  <div key={a.id} style={{ background: CARD, border: `1px solid ${unlocked ? "#3A3020" : CARD_BORDER}`, borderRadius: 16, padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: unlocked ? "rgba(245,166,35,0.15)" : "#1A1A1F",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Trophy size={16} color={unlocked ? AMBER : "#4B4B52"} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A93" }}>{a.desc}</div>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: "#1C1C20", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: unlocked ? AMBER : BLUE, borderRadius: 999, transition: "width 500ms ease" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 6, fontFamily: "monospace" }}>
                      {a.progress}/{a.target}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mainTab === "configuration" && (
          <ConfigLockedNotice
            onContinue={() => setMainTab("dashboard")}
            onRequestReset={() => {
              setRequestResetOpen(true);
              setMainTab("settings");
            }}
          />
        )}

        {mainTab === "settings" && <SettingsPage autoOpenReset={requestResetOpen} onPerformReset={performReset} />}
      </div>

      {effects.map((e) => (
        <React.Fragment key={e.id}>
          <Confetti originX={e.x} originY={e.y} colors={confettiColors} />
          <FloatingReward x={e.x} y={e.y - 10} coins={e.coins} streak={e.streak} />
        </React.Fragment>
      ))}

      {redeemFlash && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 90,
            background: CARD,
            border: `1px solid ${EMERALD}`,
            borderRadius: 14,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "fade-in 200ms ease",
          }}
        >
          <span style={{ fontSize: 20 }}>{redeemFlash.icon}</span>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{redeemFlash.name} redeemed</span>
          <Check size={15} color={EMERALD} />
        </div>
      )}
    </div>
  );
}
