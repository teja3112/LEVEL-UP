"use client";

import { ChevronDown, ChevronUp, Coins, Trash2 } from "lucide-react";
import { CARD_BORDER, CATEGORIES } from "@/lib/constants";
import { GhostInput, GhostSelect } from "./ui";
import type { DraftTask } from "@/lib/types";

export function TaskRow({
  task,
  onChange,
  onDelete,
  onMove,
  isFirst,
  isLast,
}: {
  task: DraftTask;
  onChange: (task: DraftTask) => void;
  onDelete: () => void;
  onMove: (dir: 1 | -1) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
        background: "#0F0F12",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => onMove(-1)}
          disabled={isFirst}
          style={{ background: "none", border: "none", cursor: isFirst ? "default" : "pointer", color: isFirst ? "#3A3A40" : "#9CA3AF" }}
        >
          <ChevronUp size={14} />
        </button>
        <button
          onClick={() => onMove(1)}
          disabled={isLast}
          style={{ background: "none", border: "none", cursor: isLast ? "default" : "pointer", color: isLast ? "#3A3A40" : "#9CA3AF" }}
        >
          <ChevronDown size={14} />
        </button>
      </div>
      <GhostInput
        placeholder="Task name"
        value={task.title}
        onChange={(e) => onChange({ ...task, title: e.target.value })}
        style={{ flex: "1 1 160px" }}
      />
      <GhostSelect value={task.category} onChange={(e) => onChange({ ...task, category: e.target.value })}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </GhostSelect>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Coins size={13} color="#FCD34D" />
        <GhostInput
          type="number"
          value={task.coins}
          onChange={(e) => onChange({ ...task, coins: Number(e.target.value) })}
          style={{ width: 70 }}
        />
      </div>
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", marginLeft: "auto" }}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}
