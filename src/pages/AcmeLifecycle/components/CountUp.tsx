import { useEffect, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

export function CountUp({
  end,
  duration = 1200,
  formatter = (v) => String(v),
  className = "",
}: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return <span className={className}>{formatter(value)}</span>;
}
