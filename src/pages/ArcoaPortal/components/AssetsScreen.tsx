import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusPill } from "../components/StatusPill";
import { assets, type Asset, type AssetStatus } from "../mockData";

type FilterOption = "All" | AssetStatus;

const filters: FilterOption[] = [
  "All",
  "Remarketed",
  "Recycled",
  "Data Sanitized",
  "In Transit",
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function dispositionLabel(disposition: Asset["disposition"]) {
  switch (disposition) {
    case "Resale":
      return "Remarketed";
    case "Recycle":
      return "Recycled";
    case "Redeployed":
      return "Redeployed";
    case "Pending":
      return "Pending";
  }
}

function AssetCard({ asset }: { asset: Asset }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="arcoa-card w-full text-left p-4 transition-shadow active:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm" style={{ color: "var(--ink)" }}>
            {asset.manufacturer} {asset.model}
          </p>
          <p
            className="font-mono text-xs mt-1 truncate"
            style={{ color: "var(--muted)" }}
          >
            {asset.serial}
          </p>
          <p
            className="font-mono text-xs truncate"
            style={{ color: "var(--muted)" }}
          >
            Tag: {asset.assetTag}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <StatusPill status={asset.status} />
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            style={{ color: "var(--muted)" }}
          />
        </div>
      </div>

      <div
        className="flex items-center justify-between mt-3 pt-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {dispositionLabel(asset.disposition)}
        </span>
        {asset.value != null && (
          <span
            className="font-mono text-sm font-medium"
            style={{ color: "var(--green)" }}
          >
            +${asset.value.toLocaleString()}
          </span>
        )}
      </div>

      {expanded && (
        <div
          className="mt-3 pt-3 border-t space-y-2 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <div className="flex justify-between">
            <span>Date Received</span>
            <span className="font-mono" style={{ color: "var(--ink)" }}>
              {formatDate(asset.dateReceived)}
            </span>
          </div>
          {asset.destructionMethod && (
            <div>
              <span className="block mb-0.5">Data Destruction</span>
              <span className="font-mono text-[11px]" style={{ color: "var(--ink)" }}>
                {asset.destructionMethod}
              </span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

export function AssetsScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterOption>("All");

  const filteredAssets = useMemo(() => {
    const query = search.toLowerCase().trim();
    return assets.filter((asset) => {
      const matchesFilter = filter === "All" || asset.status === filter;
      const matchesSearch =
        !query ||
        asset.serial.toLowerCase().includes(query) ||
        asset.model.toLowerCase().includes(query) ||
        asset.manufacturer.toLowerCase().includes(query) ||
        asset.assetTag.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <div className="px-4 py-5 space-y-4 pb-6">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: "var(--ink)" }}>
          Asset Disposition
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          {assets.length} assets tracked
        </p>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--muted)" }}
        />
        <input
          type="search"
          placeholder="Search serial, model, or tag…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm border outline-none focus:ring-2 min-h-[44px]"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--ink)",
          }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium min-h-[36px] transition-colors"
            style={{
              backgroundColor: filter === f ? "var(--blue)" : "var(--card)",
              color: filter === f ? "#fff" : "var(--muted)",
              border: `1px solid ${filter === f ? "var(--blue)" : "var(--border)"}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAssets.length === 0 ? (
          <p
            className="text-center py-8 text-sm"
            style={{ color: "var(--muted)" }}
          >
            No assets match your search.
          </p>
        ) : (
          filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))
        )}
      </div>
    </div>
  );
}
