"use client";

import { useCountUp } from "@/lib/hooks";

type AnimatedNumberProps = {
  value: number;
  format: (value: number) => string;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  value,
  format,
  className,
  duration = 320,
}: AnimatedNumberProps) {
  const shown = useCountUp(value, duration);
  return <span className={className}>{format(shown)}</span>;
}
