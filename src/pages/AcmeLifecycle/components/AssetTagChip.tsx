interface AssetTagChipProps {
  tag: string;
}

export function AssetTagChip({ tag }: AssetTagChipProps) {
  return (
    <span className="font-mono inline-flex items-center rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
      <span className="mr-1 opacity-50">·</span>
      {tag}
    </span>
  );
}
