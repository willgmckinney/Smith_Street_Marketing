import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-24 left-1/2 z-[200] -translate-x-1/2 md:bottom-8">
      <div className="font-mono rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm shadow-lg text-[var(--text)]">
        {message}
      </div>
    </div>
  );
}
