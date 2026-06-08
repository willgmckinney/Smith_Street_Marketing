import { useState } from "react";
import {
  formatCurrency,
  recoveryItems,
  type RecoveryItem,
} from "../../../data/mockData";
import { ResponsiveList } from "../components/ResponsiveList";
import type { Column } from "../components/ResponsiveList";
import { Toast } from "../components/Toast";

interface RecoveryWatchScreenProps {
  onPickupRequest?: () => void;
}

export function RecoveryWatchScreen({ onPickupRequest }: RecoveryWatchScreenProps) {
  const [toast, setToast] = useState<string | null>(null);
  const hasItems = recoveryItems.length > 0;

  const handlePickup = () => {
    setToast("Pickup requested. ACME notified.");
    onPickupRequest?.();
  };

  const columns: Column<RecoveryItem>[] = [
    {
      key: "assignee",
      header: "Assignee",
      render: (r) => (
        <span>
          <span className="font-mono mr-1 text-[10px] uppercase text-[var(--text-muted)]">
            (former)
          </span>
          {r.assignee}{" "}
          <span className="text-[var(--text-muted)]">({r.department})</span>
        </span>
      ),
    },
    {
      key: "model",
      header: "Model",
      render: (r) => r.model,
    },
    {
      key: "location",
      header: "Location",
      render: (r) => r.location,
    },
    {
      key: "days",
      header: "Unreachable",
      cellClassName: "font-mono",
      render: (r) => (
        <span>
          {r.daysUnreachable}
          <span className="text-[var(--text-muted)]"> d</span>
        </span>
      ),
    },
    {
      key: "data",
      header: "Data-bearing",
      render: () => (
        <span className="font-mono text-xs text-[var(--c-accent)]">Yes</span>
      ),
    },
    {
      key: "value",
      header: "Est. value",
      cellClassName: "font-mono",
      render: (r) => formatCurrency(r.estimatedValue),
    },
    {
      key: "action",
      header: "",
      hideOnMobile: false,
      render: () => (
        <button
          type="button"
          onClick={handlePickup}
          className="min-h-[44px] rounded border border-[var(--c-accent)] px-3 py-1.5 text-xs font-medium text-[var(--c-accent)] transition-colors hover:bg-[var(--c-accent)] hover:text-white"
        >
          Request ACME Pickup
        </button>
      ),
      mobileLabel: "Action",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Recovery Watch
        </h1>
        <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">
          Data-bearing devices that are unaccounted for. These are your
          liability.
        </p>
      </header>

      {hasItems ? (
        <>
          <div className="rounded-lg border border-[var(--a-accent)]/30 bg-[var(--a-accent)]/5 px-4 py-3">
            <p className="font-mono text-sm">
              <span className="font-medium text-[var(--a-accent)]">
                {recoveryItems.length} data-bearing devices unreachable
              </span>
              <span className="text-[var(--text-muted)]">
                {" "}
                across former employees, remote locations. Unrecovered hardware
                with
                active storage is a HIPAA exposure until disposition is
                documented.
              </span>
            </p>
          </div>

          <ResponsiveList
            items={recoveryItems}
            columns={columns}
            getKey={(r) => r.id}
            rowClassName={() => "risk-accent"}
          />
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-[var(--border)] py-16 text-center">
          <p className="text-[var(--text-muted)]">
            Nothing&apos;s gone dark this week. Good.
          </p>
        </div>
      )}

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
