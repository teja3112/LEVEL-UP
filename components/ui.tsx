"use client";

import React, { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { AMBER, CARD, CARD_BORDER, BLUE, PURPLE } from "@/lib/constants";

export function Confetti({
  originX,
  originY,
  colors,
}: {
  originX: number;
  originY: number;
  colors: string[];
}) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        dist: 60 + Math.random() * 90,
        size: 4 + Math.random() * 5,
        color: colors[i % colors.length],
        rot: Math.random() * 360,
        delay: Math.random() * 0.08,
      })),
    [colors]
  );

  return (
    <div style={{ position: "absolute", left: originX, top: originY, pointerEvents: "none", zIndex: 50 }}>
      {pieces.map((p) => {
        const tx = Math.cos(p.angle) * p.dist;
        const ty = Math.sin(p.angle) * p.dist - 40;
        return (
          <span
            key={p.id}
            style={
              {
                position: "absolute",
                width: p.size,
                height: p.size * 1.6,
                background: p.color,
                left: 0,
                top: 0,
                borderRadius: 1,
                opacity: 0,
                animation: `confetti-pop 900ms ease-out ${p.delay}s forwards`,
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--rot": `${p.rot}deg`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export function FloatingReward({
  x,
  y,
  coins,
  streak,
}: {
  x: number;
  y: number;
  coins: number;
  streak: number;
}) {
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none", zIndex: 60 }} className="floating-reward">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <span style={{ color: "#FCD34D", fontFamily: "monospace", fontWeight: 700, fontSize: 15, textShadow: "0 0 12px rgba(252,211,77,0.5)" }}>
          +{coins} coins
        </span>
        <span style={{ color: AMBER, fontFamily: "monospace", fontWeight: 700, fontSize: 12, textShadow: "0 0 12px rgba(245,166,35,0.5)" }}>
          🔥 streak {streak}
        </span>
      </div>
    </div>
  );
}

export function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: CARD,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: "10px 14px",
        minWidth: 128,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}1A`,
        }}
      >
        <Icon size={16} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#8A8A93", lineHeight: 1 }}>{label}</div>
        <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: "#F4F4F5" }}>{value}</div>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 15.5 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#8A8A93" }}>{subtitle}</div>
    </div>
  );
}

export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: "inline-block" }} />
      {label}
    </div>
  );
}

export function GhostInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { style, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        background: "#1A1A1F",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 8,
        padding: "8px 10px",
        color: "#F4F4F5",
        fontSize: 13,
        outline: "none",
        ...style,
      }}
    />
  );
}

export function GhostSelect({
  children,
  style,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...rest}
      style={{
        background: "#1A1A1F",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 8,
        padding: "8px 10px",
        color: "#F4F4F5",
        fontSize: 13,
        outline: "none",
        ...style,
      }}
    >
      {children}
    </select>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        fontSize: 13.5,
        background: disabled ? "#1C1C20" : `linear-gradient(90deg, ${BLUE}, ${PURPLE})`,
        color: disabled ? "#6B7280" : "#fff",
        display: "flex",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        border: `1px solid ${CARD_BORDER}`,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13.5,
        background: "transparent",
        color: "#D4D4D8",
        display: "flex",
        alignItems: "center",
        gap: 6,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function EmptyNote({ text }: { text: string }) {
  return <div style={{ fontSize: 12.5, color: "#6B7280", padding: "20px 0" }}>{text}</div>;
}
