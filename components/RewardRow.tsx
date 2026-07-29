"use client";

import { Coins, Trash2 } from "lucide-react";
import { CARD_BORDER } from "@/lib/constants";
import { GhostInput } from "./ui";
import type { Reward } from "@/lib/types";

export function RewardRow({
  reward,
  onChange,
  onDelete,
}: {
  reward: Reward;
  onChange: (reward: Reward) => void;
  onDelete: () => void;
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
      <GhostInput
        placeholder="🎁"
        value={reward.icon}
        onChange={(e) => onChange({ ...reward, icon: e.target.value })}
        style={{ width: 50, textAlign: "center" }}
      />
      <GhostInput
        placeholder="Reward name"
        value={reward.name}
        onChange={(e) => onChange({ ...reward, name: e.target.value })}
        style={{ flex: "1 1 140px" }}
      />
      <GhostInput
        placeholder="Category"
        value={reward.category}
        onChange={(e) => onChange({ ...reward, category: e.target.value })}
        style={{ width: 110 }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Coins size={13} color="#FCD34D" />
        <GhostInput
          type="number"
          value={reward.cost}
          onChange={(e) => onChange({ ...reward, cost: Number(e.target.value) })}
          style={{ width: 80 }}
        />
      </div>
      <GhostInput
        placeholder="Rules (optional)"
        value={reward.rules}
        onChange={(e) => onChange({ ...reward, rules: e.target.value })}
        style={{ flex: "1 1 140px" }}
      />
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", marginLeft: "auto" }}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}
