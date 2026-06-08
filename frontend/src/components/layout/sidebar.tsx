"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router";

// ─── Icons (inline SVGs, no external dep) ────────────────────────────────────

const icons = {
  home: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <path d="M3 9.75L12 3l9 6.75V21a.75.75 0 0 1-.75.75H15v-5.25h-6V21.75H3.75A.75.75 0 0 1 3 21V9.75z" />
    </svg>
  ),
  layers: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 12 12 18.5 22 12" />
    </svg>
  ),
  chart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  inbox: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 17.17 4H6.83a2 2 0 0 0-1.38.55z" />
    </svg>
  ),
  settings: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  url?: string;
};

// ─── Nav data ─────────────────────────────────────────────────────────────────

const mainNav: NavItem[] = [
  { id: "home", label: "Dashboard", icon: icons.home, url: "/dashboard" },
  { id: "layers", label: "Exercise", icon: icons.layers, url: "/exercise" },
  { id: "chart", label: "Transaction", icon: icons.chart, url: "/transaction" },
  { id: "inbox", label: "Messages", icon: icons.inbox, badge: 3 },
];

const bottomNav: NavItem[] = [
  { id: "search", label: "Rechercher", icon: icons.search },
  { id: "settings", label: "Paramètres", icon: icons.settings },
];

function NavButton({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            aria-label={item.label}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 group",
              active
                ? "bg-black text-white shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
                : "text-neutral-400 hover:text-black hover:bg-neutral-100",
            )}
          >
            {item.icon}

            {/* Badge */}
            {item.badge !== undefined && item.badge > 0 && (
              <span
                className={cn(
                  "absolute top-1.5 right-1.5 w-1.75 h-1.75 rounded-full border",
                  active ? "bg-white border-black" : "bg-black border-white",
                )}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={14}
          className="bg-black text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-lg border-0 shadow-xl"
        >
          {item.label}
          {item.badge ? (
            <span className="ml-1.5 opacity-60 font-mono">{item.badge}</span>
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function FloatingSidebar() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  return (
    <aside
      className={cn(
        // Floating container
        "fixed left-5 top-1/2 -translate-y-1/2",
        "flex flex-col items-center gap-1",
        "w-15 py-4 px-2",
        "bg-white rounded-2xl",
        "border border-neutral-200/80",
        "shadow-[0_8px_40px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]",
        "select-none",
      )}
    >
      {/* Logo mark */}
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-black mb-2">
        <span className="text-white text-[11px] font-bold tracking-tight leading-none">
          M
        </span>
      </div>

      <Separator className="bg-neutral-100 my-1 w-6 mx-auto" />

      {/* Main nav */}
      <nav className="flex flex-col items-center gap-0.5 w-full">
        {mainNav.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={() => {
              setActive(item.id);
              if (item.url) navigate(item.url);
            }}
          />
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      <Separator className="bg-neutral-100 my-1 w-6 mx-auto" />

      {/* Bottom nav */}
      <nav className="flex flex-col items-center gap-0.5 w-full">
        {bottomNav.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={active === item.id}
            onClick={() => {
              setActive(item.id);
              if (item.url) navigate(item.url);
            }}
          />
        ))}
      </nav>

      <Separator className="bg-neutral-100 my-1 w-6 mx-auto" />

      {/* Avatar */}
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="mt-1 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none">
              <Avatar className="w-8 h-8 rounded-xl border border-neutral-200">
                <AvatarFallback className="bg-neutral-100 text-black text-[11px] font-semibold rounded-xl">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            sideOffset={14}
            className="bg-black text-white text-[11px] font-medium tracking-wide px-2.5 py-1.5 rounded-lg border-0 shadow-xl"
          >
            Jean Dupont
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  );
}
