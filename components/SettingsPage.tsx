"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { AMBER, RED } from "@/lib/constants";
import { GhostButton, GhostInput, PrimaryButton, SectionHeader } from "./ui";

export function SettingsPage({
  autoOpenReset,
  onPerformReset,
}: {
  autoOpenReset: boolean;
  onPerformReset: (fullReset: boolean) => void;
}) {
  const [resetOpen, setResetOpen] = useState<boolean>(autoOpenReset);
  const [confirmText, setConfirmText] = useState("");
  const [fullReset, setFullReset] = useState(false);

  return (
    <div style={{ maxWidth: 560 }}>
      <SectionHeader title="Settings" subtitle="" />
      <div style={{ background: "#111113", border: "1px solid #1F1F23", borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Lock size={16} color={AMBER} />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Your configuration is locked</span>
        </div>
        <p style={{ fontSize: 12.5, color: "#8A8A93", lineHeight: 1.6, marginBottom: 14 }}>
          Tasks and rewards are fixed until you perform a configuration reset.
        </p>
        {!resetOpen && <GhostButton onClick={() => setResetOpen(true)}>Reset configuration</GhostButton>}

        {resetOpen && (
          <div style={{ marginTop: 10, background: "#17110A", border: "1px solid #4A3410", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: AMBER, marginBottom: 6 }}>⚠ Warning</div>
            <p style={{ fontSize: 12.5, color: "#D4C5A3", lineHeight: 1.6, marginBottom: 12 }}>
              Resetting your configuration will require rebuilding your tasks and rewards. Progress — coins, streaks and
              achievements — remains unless you explicitly choose a full reset.
            </p>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#D4D4D8", marginBottom: 14 }}>
              <input type="checkbox" checked={fullReset} onChange={(e) => setFullReset(e.target.checked)} />
              Full reset — also erase coins, streaks and achievement progress
            </label>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>Type RESET to confirm</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <GhostInput value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="RESET" style={{ width: 140 }} />
              <PrimaryButton
                disabled={confirmText !== "RESET"}
                onClick={() => onPerformReset(fullReset)}
                style={{ background: confirmText === "RESET" ? RED : undefined }}
              >
                Confirm reset
              </PrimaryButton>
              <GhostButton
                onClick={() => {
                  setResetOpen(false);
                  setConfirmText("");
                  setFullReset(false);
                }}
              >
                Cancel
              </GhostButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
