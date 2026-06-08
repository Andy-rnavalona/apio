"use client";

import { useState, useEffect, useRef, type FC, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChartDataSet {
  labels: string[];
  data: number[];
}

interface PeriodOption {
  label: string;
  value: number;
}

interface Transaction {
  id: number;
  label: string;
  category: string;
  date: string;
  amount: number;
  status: "Validé" | "En attente";
}

type AccentType = "black" | "red" | undefined;
type BadgeType = "up" | "down";
type ChartType = "in" | "out";

// ─── Data ────────────────────────────────────────────────────────────────────

const CHART_DATA: Record<ChartType, Record<number, ChartDataSet>> = {
  in: {
    7: {
      labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      data: [2800, 3400, 1900, 4200, 3100, 2600, 3800],
    },
    30: {
      labels: Array.from({ length: 30 }, (_, i) => `J${i + 1}`),
      data: [
        1200, 1800, 1400, 2200, 2700, 1900, 2100, 3200, 2800, 1600, 2400, 2900,
        3100, 2300, 1800, 2600, 3400, 2100, 2800, 3600, 2200, 1900, 3000, 2700,
        3200, 2500, 2800, 3100, 2400, 3800,
      ],
    },
    90: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep"],
      data: [28000, 31000, 27000, 35000, 32000, 38000, 29000, 41000, 36000],
    },
    365: {
      labels: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Jun",
        "Jul",
        "Aoû",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ],
      data: [
        28000, 31000, 27000, 35000, 32000, 38000, 29000, 41000, 36000, 44000,
        39000, 47000,
      ],
    },
  },
  out: {
    7: {
      labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      data: [800, 1200, 900, 1600, 1100, 700, 1300],
    },
    30: {
      labels: Array.from({ length: 30 }, (_, i) => `J${i + 1}`),
      data: [
        600, 900, 700, 1100, 800, 1400, 600, 900, 1200, 700, 1100, 800, 1500,
        900, 700, 1200, 1000, 800, 1300, 900, 700, 1100, 1400, 800, 900, 700,
        1200, 1000, 800, 1300,
      ],
    },
    90: {
      labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep"],
      data: [9000, 11000, 8500, 12000, 10000, 13000, 9500, 14000, 11000],
    },
    365: {
      labels: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Jun",
        "Jul",
        "Aoû",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ],
      data: [
        9000, 11000, 8500, 12000, 10000, 13000, 9500, 14000, 11000, 15000,
        12000, 16000,
      ],
    },
  },
};

const TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    label: "Virement client Acme Corp",
    category: "Revenus",
    date: "07 juin 2025",
    amount: 18500,
    status: "Validé",
  },
  {
    id: 2,
    label: "Loyer bureaux Paris 8e",
    category: "Immobilier",
    date: "05 juin 2025",
    amount: -4200,
    status: "Validé",
  },
  {
    id: 3,
    label: "Abonnements SaaS Q2",
    category: "Logiciels",
    date: "03 juin 2025",
    amount: -980,
    status: "Validé",
  },
  {
    id: 4,
    label: "Paiement fournisseur Delta",
    category: "Achats",
    date: "02 juin 2025",
    amount: -7600,
    status: "En attente",
  },
  {
    id: 5,
    label: "Encaissement contrat Beta",
    category: "Revenus",
    date: "01 juin 2025",
    amount: 22000,
    status: "Validé",
  },
];

const PERIODS: PeriodOption[] = [
  { label: "7j", value: 7 },
  { label: "30j", value: 30 },
  { label: "3m", value: 90 },
  { label: "12m", value: 365 },
];

const fmt = (n: number): string =>
  Math.abs(n).toLocaleString("fr-FR", { minimumFractionDigits: 0 }) + " €";

// ─── MiniChart ───────────────────────────────────────────────────────────────

interface MiniChartProps {
  chartData: ChartDataSet;
  color: string;
  fillColor: string;
}

const MiniChart: FC<MiniChartProps> = ({ chartData, color, fillColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { data, labels } = chartData;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const pad = { top: 12, right: 12, bottom: 28, left: 44 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;

    const min = Math.min(...data) * 0.9;
    const max = Math.max(...data) * 1.05;
    const xStep = innerW / (data.length - 1);
    const yScale = (v: number) =>
      pad.top + innerH - ((v - min) / (max - min)) * innerH;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(128,128,128,0.1)";
    ctx.lineWidth = 0.5;
    [0.25, 0.5, 0.75, 1].forEach((t) => {
      const y = pad.top + innerH * (1 - t);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + innerW, y);
      ctx.stroke();
    });

    // Y labels
    ctx.fillStyle = "rgba(128,128,128,0.65)";
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "right";
    [0, 0.5, 1].forEach((t) => {
      const val = min + (max - min) * t;
      const y = pad.top + innerH * (1 - t);
      const label =
        val >= 1000 ? (val / 1000).toFixed(0) + "k" : val.toFixed(0);
      ctx.fillText(label, pad.left - 4, y + 3);
    });

    // X labels
    ctx.textAlign = "center";
    const step = Math.ceil(data.length / 6);
    labels.forEach((lbl, i) => {
      if (i % step === 0 || i === data.length - 1) {
        ctx.fillText(lbl, pad.left + i * xStep, H - pad.bottom + 14);
      }
    });

    // Fill
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + innerH);
    gradient.addColorStop(0, fillColor);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.moveTo(pad.left, yScale(data[0]));
    data.forEach((v, i) => {
      if (i === 0) return;
      const x0 = pad.left + (i - 1) * xStep;
      const x1 = pad.left + i * xStep;
      const cpx = (x0 + x1) / 2;
      ctx.bezierCurveTo(
        cpx,
        yScale(data[i - 1]),
        cpx,
        yScale(v),
        x1,
        yScale(v),
      );
    });
    ctx.lineTo(pad.left + (data.length - 1) * xStep, pad.top + innerH);
    ctx.lineTo(pad.left, pad.top + innerH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.moveTo(pad.left, yScale(data[0]));
    data.forEach((v, i) => {
      if (i === 0) return;
      const x0 = pad.left + (i - 1) * xStep;
      const x1 = pad.left + i * xStep;
      const cpx = (x0 + x1) / 2;
      ctx.bezierCurveTo(
        cpx,
        yScale(data[i - 1]),
        cpx,
        yScale(v),
        x1,
        yScale(v),
      );
    });
    ctx.stroke();
  }, [chartData, color, fillColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Graphique de tendance financière"
    />
  );
};

// ─── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          height: "3px",
          background: "rgba(128,128,128,0.15)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: "#111",
            borderRadius: "2px",
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
          fontSize: "11px",
          color: "rgba(128,128,128,0.7)",
        }}
      >
        <span>0 €</span>
        <span>75 000 €</span>
        <span>100 000 €</span>
      </div>
    </div>
  );
};

// ─── KPI Card ────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  badge?: string;
  badgeType?: BadgeType;
  accent?: AccentType;
  children?: ReactNode;
}

const KpiCard: FC<KpiCardProps> = ({
  label,
  value,
  sub,
  badge,
  badgeType = "up",
  accent,
  children,
}) => {
  return (
    <div
      style={{
        border: "0.5px solid var(--border)",
        padding: "18px 20px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.6px",
          textTransform: "uppercase",
          color: accent === "red" ? "#C0392B" : "var(--text-muted)",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "26px",
          fontWeight: 500,
          color: accent === "red" ? "#C0392B" : "var(--text)",
          letterSpacing: "-0.5px",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "4px",
          }}
        >
          {sub}
        </div>
      )}
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "11px",
            fontWeight: 500,
            padding: "2px 7px",
            borderRadius: "20px",
            marginTop: "6px",
            background: badgeType === "up" ? "#f0f4f0" : "#fdf0ef",
            color: badgeType === "up" ? "#1e6b24" : "#C0392B",
          }}
        >
          {badge}
        </div>
      )}
      {children}
    </div>
  );
};

// ─── Chart Panel ─────────────────────────────────────────────────────────────

interface ChartPanelProps {
  title: string;
  dot: string;
  type: ChartType;
  periods: PeriodOption[];
  activePeriod: number;
  onPeriod: (v: number) => void;
}

const ChartPanel: FC<ChartPanelProps> = ({
  title,
  dot,
  type,
  periods,
  activePeriod,
  onPeriod,
}) => {
  const d = CHART_DATA[type][activePeriod];
  const isIn = type === "in";
  const color = isIn ? "#111" : "#C0392B";
  const fillColor = isIn ? "rgba(17,17,17,0.07)" : "rgba(192,57,43,0.07)";

  return (
    <div
      style={{
        border: "0.5px solid var(--border)",
        borderRadius: "5px",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: dot,
              display: "inline-block",
            }}
          />
          <span
            style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}
          >
            {title}
          </span>
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          {periods.map((p) => {
            const active = activePeriod === p.value;
            return (
              <button
                key={p.value}
                onClick={() => onPeriod(p.value)}
                style={{
                  fontSize: "11px",
                  padding: "3px 9px",
                  borderRadius: "4px",
                  border: active ? "none" : "0.5px solid var(--border)",
                  background: active
                    ? isIn
                      ? "#111"
                      : "#C0392B"
                    : "transparent",
                  color: active ? "#fff" : "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ height: "170px" }}>
        <MiniChart chartData={d} color={color} fillColor={fillColor} />
      </div>
    </div>
  );
};

// ─── Transactions Table ───────────────────────────────────────────────────────

const TransactionsTable: FC = () => (
  <div
    style={{
      border: "0.5px solid",
      borderRadius: "5px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "0.5px solid var(--border)",
      }}
    >
      <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>
        Dernières transactions
      </span>
      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
        5 entrées
      </span>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {(
              ["Libellé", "Catégorie", "Date", "Montant", "Statut"] as const
            ).map((h, i) => (
              <th
                key={h}
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  padding: "10px 20px",
                  textAlign: i >= 3 ? "right" : "left",
                  borderBottom: "0.5px solid var(--border)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRANSACTIONS.map((tx) => {
            const neg = tx.amount < 0;
            const ok = tx.status === "Validé";
            return (
              <tr key={tx.id}>
                <td style={{ padding: "12px 20px", maxWidth: "220px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tx.label}
                  </div>
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 9px",
                      borderRadius: "20px",
                      background: "var(--tag-bg)",
                      color: "var(--text-muted)",
                      border: "0.5px solid var(--border)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tx.category}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tx.date}
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    textAlign: "right",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: neg ? "#C0392B" : "var(--text)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {neg ? "−" : "+"}
                  {fmt(tx.amount)}
                </td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12px",
                      color: ok ? "#1e6b24" : "#8a6000",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: ok ? "#1e6b24" : "#b07d1a",
                        flexShrink: 0,
                      }}
                    />
                    {tx.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Main Dashboard ──────────────────────────────────────────────────────────

const FinancialDashboard: FC = () => {
  const [periodIn, setPeriodIn] = useState<number>(30);
  const [periodOut, setPeriodOut] = useState<number>(30);

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "var(--text)",
                  letterSpacing: "-0.3px",
                }}
              >
                Tableau de bord financier
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                Vue d'ensemble · Juin 2025
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                border: "0.5px solid var(--border)",
                borderRadius: "8px",
                padding: "5px 12px",
              }}
            >
              Mis à jour aujourd'hui
            </div>
          </div>

          {/* Row 1 — KPIs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <KpiCard
              label="Solde actuel"
              value="75 000 €"
              sub="Compte principal"
              badge="↑ +4,2% ce mois"
              badgeType="up"
              accent="black"
            />
            <KpiCard
              label="Progression prévisionnelle"
              value="75%"
              sub="Objectif : 100 000 €"
            >
              <ProgressBar value={75} />
            </KpiCard>
            <KpiCard
              label="Flux entrants"
              value="124 300 €"
              sub="Total période"
              badge="↑ +8,1%"
              badgeType="up"
            />
            <KpiCard
              label="Flux sortants"
              value="49 300 €"
              sub="Total période"
              badge="↑ +12,4%"
              badgeType="down"
              accent="red"
            />
          </div>

          {/* Row 2 — Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <ChartPanel
              title="Flux entrants"
              dot="#111"
              type="in"
              periods={PERIODS}
              activePeriod={periodIn}
              onPeriod={setPeriodIn}
            />
            <ChartPanel
              title="Flux sortants"
              dot="#C0392B"
              type="out"
              periods={PERIODS}
              activePeriod={periodOut}
              onPeriod={setPeriodOut}
            />
          </div>

          {/* Row 3 — Transactions */}
          <TransactionsTable />
        </div>
      </div>
    </>
  );
};

export default FinancialDashboard;
