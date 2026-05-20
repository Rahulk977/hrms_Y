"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sectionItems } from "@/data/modules";
import { PROFILE_PREFIX, PROFILE_SECTIONS } from "@/data/profile";
import {
  getActiveStandardSection,
  getStandardAreaFromPath,
  LMS_AREA,
  LOAN_AREA,
  LOS_AREA,
  TVR_AREA,
  USER_AREA,
} from "@/lib/area-configs";
import {
  getActiveSidebarSectionId,
  getSidebarAreaFromPath,
} from "@/lib/sidebar-nav-config";
import { slugify } from "@/lib/slugify";
import type { AuthUser, ProfileSectionId, SectionKey, StandardSectionKey, UserSectionKey } from "@/types";
import { PageHeader } from "./PageHeader";
import { ProfilePageHeader } from "./ProfilePageHeader";
import { StandardAreaPageHeader } from "./StandardAreaPageHeader";
import { UserPageHeader } from "./UserPageHeader";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ onLogout, user, children }: { onLogout: () => void; user: AuthUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState("");

  const sidebarArea = useMemo(() => getSidebarAreaFromPath(pathname), [pathname]);
  const activeSectionId = useMemo(
    () => (sidebarArea ? getActiveSidebarSectionId(pathname, sidebarArea) : null),
    [pathname, sidebarArea]
  );

  const activeStandardArea = useMemo(() => getStandardAreaFromPath(pathname), [pathname]);
  const activeStandardSection = useMemo(() => {
    if (!activeStandardArea) return null;
    return getActiveStandardSection(pathname, activeStandardArea);
  }, [pathname, activeStandardArea]);

  useEffect(() => {
    const area = getSidebarAreaFromPath(pathname);
    if (!area) {
      setExpandedArea(null);
      setOpenMenuId("");
      return;
    }
    setExpandedArea(area.areaId);
    const sectionId = getActiveSidebarSectionId(pathname, area);
    if (sectionId) setOpenMenuId(sectionId);
  }, [pathname]);

  const standardHeader = useMemo(() => {
    if (!activeStandardArea || !activeStandardSection || activeStandardSection === "dashboard") return null;
    const listPath = `${activeStandardArea.prefix}/${activeStandardSection}`;
    if (pathname !== listPath) return null;
    return {
      config: activeStandardArea,
      section: activeStandardSection,
      count: activeStandardArea.sectionItems[activeStandardSection].length,
    };
  }, [activeStandardArea, activeStandardSection, pathname]);

  const userItems =
    activeSectionId === "master-creation" || activeSectionId === "report-search"
      ? USER_AREA.sectionItems[activeSectionId as UserSectionKey]
      : [];

  const profileItems =
    activeSectionId === "applications" || activeSectionId === "approvals" || activeSectionId === "my-records"
      ? PROFILE_SECTIONS.find((s) => s.id === activeSectionId)?.items ?? []
      : [];

  const isProfileSectionPage =
    pathname === "/profile/applications" ||
    pathname === "/profile/approvals" ||
    pathname === "/profile/my-records";

  return (
    <main className="shell">
      <Sidebar
        expandedArea={expandedArea}
        openMenuId={openMenuId}
        activeSectionId={activeSectionId}
        onCollapseTo={setExpandedArea}
        onOpenMenuChange={setOpenMenuId}
        onHrSelectSection={(id) => {
          if (id === "master" || id === "manage" || id === "report") router.push(`/hrmanagement/${id}`);
        }}
        onHrSelectModule={(_sid, title) => {
          let section: "master" | "manage" | "report" = "master";
          if (sectionItems.manage.some((i) => i.title === title)) section = "manage";
          else if (sectionItems.report.some((i) => i.title === title)) section = "report";
          router.push(`/hrmanagement/${section}/${slugify(title)}`);
        }}
        onUserSelectSection={(id) => router.push(`/user-management/${id}`)}
        onUserSelectModule={(_sid, title) =>
          router.push(`/user-management/${USER_AREA.sectionForSlug(slugify(title))}/${slugify(title)}`)
        }
        onLoanSelectSection={(id) => router.push(`/loan-management/${id}`)}
        onLoanSelectModule={(_sid, title) =>
          router.push(`/loan-management/${LOAN_AREA.sectionForSlug(slugify(title))}/${slugify(title)}`)
        }
        onLmsSelectSection={(id) => router.push(`/lms/${id}`)}
        onLmsSelectModule={(_sid, title) =>
          router.push(`/lms/${LMS_AREA.sectionForSlug(slugify(title))}/${slugify(title)}`)
        }
        onLosSelectSection={(id) => router.push(`/los-management/${id}`)}
        onLosSelectModule={(_sid, title) =>
          router.push(`/los-management/${LOS_AREA.sectionForSlug(slugify(title))}/${slugify(title)}`)
        }
        onTvrSelectSection={(id) => router.push(`/tvr-management/${id}`)}
        onTvrSelectModule={(_sid, title) =>
          router.push(`/tvr-management/${TVR_AREA.sectionForSlug(slugify(title))}/${slugify(title)}`)
        }
        onProfileSelectSection={(id) => router.push(`${PROFILE_PREFIX}/${id}`)}
        onProfileSelectModule={(_sid, title) => router.push(`${PROFILE_PREFIX}/${slugify(title)}`)}
        sidebarOpen={sidebarOpen}
        user={user}
      />

      <section className="workspace">
        <Topbar onLogout={onLogout} onToggleSidebar={() => setSidebarOpen((v) => !v)} user={user} />
        {pathname === "/hrmanagement/master" || pathname === "/hrmanagement/manage" || pathname === "/hrmanagement/report" ? (
          <PageHeader
            activeSection={activeSectionId as Exclude<SectionKey, "dashboard">}
            itemCount={activeSectionId && activeSectionId in sectionItems ? sectionItems[activeSectionId as keyof typeof sectionItems].length : 0}
            onSelectSection={(s) => router.push(`/hrmanagement/${s}`)}
          />
        ) : null}
        {(pathname === "/user-management/master-creation" || pathname === "/user-management/report-search") && activeSectionId ? (
          <UserPageHeader
            activeSection={activeSectionId as UserSectionKey}
            itemCount={userItems.length}
            onSelectSection={(s) => router.push(`/user-management/${s}`)}
          />
        ) : null}
        {standardHeader ? (
          <StandardAreaPageHeader
            config={standardHeader.config}
            activeSection={standardHeader.section}
            itemCount={standardHeader.count}
            onSelectSection={(s) => router.push(`${standardHeader.config.prefix}/${s}`)}
          />
        ) : null}
        {isProfileSectionPage && activeSectionId ? (
          <ProfilePageHeader
            activeSection={activeSectionId as ProfileSectionId}
            itemCount={profileItems.length}
            onSelectSection={(s) => router.push(`${PROFILE_PREFIX}/${s}`)}
          />
        ) : null}
        <div className="workspace-content" style={{ display: "flex", flexDirection: "column", flex: 1, overflowY: "auto" }}>
          {children}
        </div>
      </section>
    </main>
  );
}
