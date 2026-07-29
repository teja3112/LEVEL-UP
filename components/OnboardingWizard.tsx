"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Lock, Plus, Sparkles } from "lucide-react";
import { BG, BLUE, CARD, CARD_BORDER, PURPLE, defaultRewards, defaultTasks, uid } from "@/lib/constants";
import { GhostButton, PrimaryButton } from "./ui";
import { TaskRow } from "./TaskRow";
import { RewardRow } from "./RewardRow";
import type { DraftTask, OnboardingConfig, Reward } from "@/lib/types";

const WIZARD_STEPS = ["Daily tasks", "Reward shop", "Review"];

function ReviewCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, padding: 14 }}>
      <div style={{ fontSize: 11.5, color: "#8A8A93", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

export function OnboardingWizard({ onFinish }: { onFinish: (config: OnboardingConfig) => void }) {
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState<DraftTask[]>(defaultTasks());
  const [rewards, setRewards] = useState<Reward[]>(defaultRewards());

  function updateTaskAt(id: string, updated: DraftTask) {
    setTasks((prev) => prev.map((x) => (x.id === id ? updated : x)));
  }
  function deleteTaskAt(id: string) {
    setTasks((prev) => prev.filter((x) => x.id !== id));
  }
  function moveTask(id: string, dir: 1 | -1) {
    setTasks((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }
  function updateRewardAt(id: string, updated: Reward) {
    setRewards((prev) => prev.map((x) => (x.id === id ? updated : x)));
  }
  function deleteRewardAt(id: string) {
    setRewards((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <div
      style={{
        minHeight: 720,
        background: BG,
        color: "#E4E4E7",
        borderRadius: 20,
        border: `1px solid ${CARD_BORDER}`,
        padding: "28px 34px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 26 }}>
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
        <span style={{ fontWeight: 700, fontSize: 15 }}>Level Up — setup</span>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 26, flexWrap: "wrap" }}>
        {WIZARD_STEPS.map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              background: i === step ? "#1A1A1F" : "transparent",
              border: `1px solid ${i === step ? BLUE : CARD_BORDER}`,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: i <= step ? BLUE : "#1C1C20",
                color: i <= step ? "#fff" : "#6B7280",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: 12.5, color: i === step ? "#fff" : "#8A8A93" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ animation: "fade-in 250ms ease" }}>
        {step === 0 && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Enter your daily tasks</h3>
            <p style={{ fontSize: 12.5, color: "#8A8A93", marginBottom: 16 }}>
              These become your fixed daily system once setup is finished. Each one earns coins and builds its own streak
              as you keep it up.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tasks.map((t, i) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  isFirst={i === 0}
                  isLast={i === tasks.length - 1}
                  onChange={(u) => updateTaskAt(t.id, u)}
                  onDelete={() => deleteTaskAt(t.id)}
                  onMove={(dir) => moveTask(t.id, dir)}
                />
              ))}
            </div>
            <GhostButton
              style={{ marginTop: 12 }}
              onClick={() => setTasks([...tasks, { id: uid(), title: "", category: "Personal", coins: 13 }])}
            >
              <Plus size={14} /> Add task
            </GhostButton>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Create your reward shop</h3>
            <p style={{ fontSize: 12.5, color: "#8A8A93", marginBottom: 16 }}>
              Define what your coins can buy. These prices are fixed once setup finishes.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rewards.map((r) => (
                <RewardRow key={r.id} reward={r} onChange={(u) => updateRewardAt(r.id, u)} onDelete={() => deleteRewardAt(r.id)} />
              ))}
            </div>
            <GhostButton
              style={{ marginTop: 12 }}
              onClick={() => setRewards([...rewards, { id: uid(), icon: "🎁", name: "", cost: 100, category: "", rules: "" }])}
            >
              <Plus size={14} /> Add reward
            </GhostButton>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Review your system</h3>
            <p style={{ fontSize: 12.5, color: "#8A8A93", marginBottom: 16 }}>
              Once you finish setup, this configuration locks. You&apos;ll only be able to change it later through a
              dedicated configuration reset in Settings.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
              <ReviewCard label="Daily tasks" value={tasks.filter((t) => t.title.trim()).length} />
              <ReviewCard label="Reward shop items" value={rewards.filter((r) => r.name.trim()).length} />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
        <GhostButton onClick={() => setStep((s) => Math.max(0, s - 1))} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
          <ArrowLeft size={14} /> Back
        </GhostButton>
        {step < WIZARD_STEPS.length - 1 ? (
          <PrimaryButton onClick={() => setStep((s) => s + 1)}>
            Next <ArrowRight size={14} />
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() =>
              onFinish({
                tasks: tasks
                  .filter((t) => t.title.trim())
                  .map((t) => ({ ...t, done: false, streak: 0 })),
                rewards: rewards.filter((r) => r.name.trim()),
              })
            }
          >
            <Lock size={14} /> Finish setup
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
