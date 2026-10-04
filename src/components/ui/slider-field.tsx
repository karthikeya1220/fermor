"use client";

import * as React from "react";

type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  minHint?: string;
  maxHint?: string;
  dark?: boolean;
  className?: string;
};

export function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  minHint,
  maxHint,
  dark = false,
  className,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={`range-${label}`}
          className={`t-label ${dark ? "text-slate" : "text-moss"}`}
        >
          {label}
        </label>
        <output
          htmlFor={`range-${label}`}
          className={`t-num text-[0.9375rem] font-medium ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {format(value)}
        </output>
      </div>
      <input
        id={`range-${label}`}
        type="range"
        className={`range mt-1.5 ${dark ? "range--dark" : ""}`}
        style={{ "--range-pct": `${pct}%` } as React.CSSProperties}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={format(value)}
      />
      {(minHint || maxHint) && (
        <div
          className={`t-num flex justify-between text-[0.6875rem] ${
            dark ? "text-slate/80" : "text-moss/70"
          }`}
        >
          <span>{minHint}</span>
          <span>{maxHint}</span>
        </div>
      )}
    </div>
  );
}
