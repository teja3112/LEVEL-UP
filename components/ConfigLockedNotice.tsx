"use client";

import { Lock } from "lucide-react";
import { AMBER } from "@/lib/constants";
import { GhostButton, PrimaryButton } from "./ui";

export function ConfigLockedNotice({
  onContinue,
  onRequestReset,
}: {
  onContinue: () => void;
  onRequestReset: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "60px 20px", maxWidth: 460, margin: "0 auto" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "rgba(245,166,35,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Lock size={24} color={AMBER} />
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Configuration locked</div>
      <div style={{ fontSize: 13.5, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 26 }}>
        To keep you disciplined, your daily system cannot be changed casually.
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
        <GhostButton onClick={onRequestReset}>Request configuration reset</GhostButton>
      </div>
    </div>
  );
}
