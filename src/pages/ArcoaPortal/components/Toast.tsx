import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="arcoa-toast fixed left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl text-sm font-medium text-white shadow-lg max-w-[calc(100%-2rem)]"
      style={{
        bottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
        backgroundColor: "var(--navy)",
      }}
    >
      {message}
    </div>
  );
}
