import type { ReactNode } from "react";
import { RegistrationTicks } from "./RegistrationTicks";

export function SnapshotCard({
  children,
  className = "",
  risk = false,
}: {
  children: ReactNode;
  className?: string;
  risk?: boolean;
}) {
  return (
    <div
      className={`relative border bg-drafting-surface p-6 ${risk ? "border-redline bg-redline-wash" : "border-chalk/15"} ${className}`}
    >
      <RegistrationTicks />
      {children}
    </div>
  );
}
