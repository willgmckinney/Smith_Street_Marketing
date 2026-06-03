import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (item: T) => ReactNode;
  mobileLabel?: string;
  hideOnMobile?: boolean;
}

interface ResponsiveListProps<T> {
  items: T[];
  columns: Column<T>[];
  getKey: (item: T) => string;
  rowClassName?: (item: T) => string;
  emptyMessage?: string;
}

export function ResponsiveList<T>({
  items,
  columns,
  getKey,
  rowClassName,
  emptyMessage = "No items.",
}: ResponsiveListProps<T>) {
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-[var(--text-muted)]">{emptyMessage}</p>
    );
  }

  const mobileColumns = columns.filter((c) => !c.hideOnMobile);

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
        <table className="table-sticky-head w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`font-mono px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] ${col.headerClassName ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={getKey(item)}
                className={`border-t border-[var(--border)] hover:bg-[var(--bg)]/50 ${rowClassName?.(item) ?? ""}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 text-[var(--text)] ${col.cellClassName ?? ""}`}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {items.map((item) => (
          <div
            key={getKey(item)}
            className={`rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 ${rowClassName?.(item) ?? ""}`}
          >
            {mobileColumns.map((col) => (
              <div
                key={col.key}
                className="flex items-start justify-between gap-3 py-1.5 first:pt-0 last:pb-0"
              >
                <span className="font-mono shrink-0 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  {col.mobileLabel ?? col.header}
                </span>
                <div className="text-right text-sm">{col.render(item)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
