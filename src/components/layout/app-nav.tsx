"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/lib/utils";
import type { StaffRole } from "@/types";
import { ROLE_LABELS } from "@/types";

const navItems: {
  href: string;
  label: string;
  roles: StaffRole[];
}[] = [
  { href: "/queue", label: "Queue", roles: ["ADMIN", "RECEPTIONIST", "DOCTOR"] },
  { href: "/dashboard", label: "Dashboard", roles: ["ADMIN", "DOCTOR"] },
];

interface AppNavProps {
  userName: string;
  userRole: StaffRole;
}

export function AppNav({ userName, userRole }: AppNavProps) {
  const pathname = usePathname();

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b border-border bg-surface px-5">
      <Logo href="/queue" />

      <nav className="ml-8 flex flex-1 gap-0.5">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-brand-light text-brand-dark"
                : "text-text-secondary hover:bg-surface-muted hover:text-text"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <Badge variant="gray">{ROLE_LABELS[userRole]}</Badge>
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white"
          title={userName}
        >
          {getInitials(userName)}
        </div>
      </div>
    </header>
  );
}
