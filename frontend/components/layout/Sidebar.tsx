"use client";

import { usePathname, useRouter } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { SidebarNavGroup } from "@/components/layout/SidebarNavGroup";
import {
  HR_SIDEBAR,
  LMS_SIDEBAR,
  LOAN_SIDEBAR,
  LOS_SIDEBAR,
  PROFILE_SIDEBAR,
  TVR_SIDEBAR,
  USER_SIDEBAR,
} from "@/lib/sidebar-nav-config";
import type { AuthUser } from "@/types";

type SidebarProps = {
  expandedArea: string | null;
  openMenuId: string;
  activeSectionId: string | null;
  onCollapseTo: (areaId: string | null) => void;
  onOpenMenuChange: (sectionId: string) => void;
  onHrSelectSection: (id: string) => void;
  onHrSelectModule: (sid: string, title: string) => void;
  onUserSelectSection: (id: string) => void;
  onUserSelectModule: (sid: string, title: string) => void;
  onLoanSelectSection: (id: string) => void;
  onLoanSelectModule: (sid: string, title: string) => void;
  onLmsSelectSection: (id: string) => void;
  onLmsSelectModule: (sid: string, title: string) => void;
  onLosSelectSection: (id: string) => void;
  onLosSelectModule: (sid: string, title: string) => void;
  onTvrSelectSection: (id: string) => void;
  onTvrSelectModule: (sid: string, title: string) => void;
  onProfileSelectSection: (id: string) => void;
  onProfileSelectModule: (sid: string, title: string) => void;
  sidebarOpen: boolean;
  user: AuthUser;
};

const AREAS = [
  { config: HR_SIDEBAR, onSection: "onHrSelectSection" as const, onModule: "onHrSelectModule" as const },
  { config: USER_SIDEBAR, onSection: "onUserSelectSection" as const, onModule: "onUserSelectModule" as const },
  { config: LOAN_SIDEBAR, onSection: "onLoanSelectSection" as const, onModule: "onLoanSelectModule" as const },
  { config: LMS_SIDEBAR, onSection: "onLmsSelectSection" as const, onModule: "onLmsSelectModule" as const },
  { config: LOS_SIDEBAR, onSection: "onLosSelectSection" as const, onModule: "onLosSelectModule" as const },
  { config: TVR_SIDEBAR, onSection: "onTvrSelectSection" as const, onModule: "onTvrSelectModule" as const },
  { config: PROFILE_SIDEBAR, onSection: "onProfileSelectSection" as const, onModule: "onProfileSelectModule" as const },
];

export function Sidebar(props: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHomeActive = pathname === "/home" || pathname === "/";
  const isDashboardActive = pathname === "/dashboard";

  const handlers = {
    onHrSelectSection: props.onHrSelectSection,
    onHrSelectModule: props.onHrSelectModule,
    onUserSelectSection: props.onUserSelectSection,
    onUserSelectModule: props.onUserSelectModule,
    onLoanSelectSection: props.onLoanSelectSection,
    onLoanSelectModule: props.onLoanSelectModule,
    onLmsSelectSection: props.onLmsSelectSection,
    onLmsSelectModule: props.onLmsSelectModule,
    onLosSelectSection: props.onLosSelectSection,
    onLosSelectModule: props.onLosSelectModule,
    onTvrSelectSection: props.onTvrSelectSection,
    onTvrSelectModule: props.onTvrSelectModule,
    onProfileSelectSection: props.onProfileSelectSection,
    onProfileSelectModule: props.onProfileSelectModule,
  };

  return (
    <aside className={`sidebar ${props.sidebarOpen ? "is-open" : "is-closed"}`}>
      <div className="brand">Subherp</div>
      <div className="user-card">
        <div className="avatar">{props.user.displayName.charAt(0)}</div>
        <div>
          <strong>Hello, {props.user.displayName}</strong>
          <span><i /> Online</span>
        </div>
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        {primaryNav.slice(0, 2).map((item) => (
          <button
            key={item.label}
            type="button"
            className={item.label === "Home" ? (isHomeActive ? "active" : "") : isDashboardActive ? "active" : ""}
            onClick={() => {
              if (item.label === "Home") router.push("/home");
              else router.push("/dashboard");
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
        {AREAS.map(({ config, onSection, onModule }) => (
          <SidebarNavGroup
            key={config.areaId}
            config={config}
            expanded={props.expandedArea === config.areaId}
            openMenuId={props.expandedArea === config.areaId ? props.openMenuId : ""}
            activeSectionId={props.expandedArea === config.areaId ? props.activeSectionId : null}
            onToggleExpand={() => {
              if (props.expandedArea === config.areaId) {
                props.onCollapseTo(null);
                props.onOpenMenuChange("");
              } else {
                props.onCollapseTo(config.areaId);
                props.onOpenMenuChange(config.defaultOpenSection);
              }
            }}
            onOpenMenuChange={props.onOpenMenuChange}
            onSelectSection={handlers[onSection]}
            onSelectModule={handlers[onModule]}
          />
        ))}
      </nav>
    </aside>
  );
}
