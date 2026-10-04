"use client";

import * as React from "react";
import { useElementWidth, usePrefersReducedMotion } from "@/lib/hooks";

export type ChartPoint = {
  year: number;
  corpus: number;
  invested?: number;
};

type ProjectionChartProps = {
  points: ChartPoint[];
  ariaSummary: string;
  /** Formats an axis value (e.g. ₹50L). */
  axisFormat: (value: number) => string;
  /** Formats a hovered readout (e.g. ₹18,42,000). */
  readoutFormat: (value: number) => string;
  height?: number;
  showInvested?: boolean;
  /** Horizontal goal line. */
  target?: number | null;
  targetLabel?: string;
  /** Play the line-draw sequence on mount (hero only). */
  drawOnMount?: boolean;
  className?: string;
};

const PAD = { top: 16, right: 58, bottom: 24, left: 4 };

function linePath(coords: { x: number; y: number }[]): string {
  if (coords.length === 0) return "";
  let d = `M${coords[0].x.toFixed(2)},${coords[0].y.toFixed(2)}`;
  for (let i = 1; i < coords.length; i += 1) {
    d += `L${coords[i].x.toFixed(2)},${coords[i].y.toFixed(2)}`;
  }
  return d;
}

function niceYearTicks(maxYear: number): number[] {
  const step = maxYear <= 6 ? 1 : maxYear <= 15 ? 3 : 5;
  const ticks: number[] = [];
  for (let y = 0; y <= maxYear; y += step) ticks.push(y);
  if (ticks[ticks.length - 1] !== maxYear) ticks.push(maxYear);
  return ticks;
}

function niceValueTicks(max: number, count = 3): number[] {
  if (max <= 0) return [0];
  const raw = max / count;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;
  const step =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
    magnitude;
  const ticks: number[] = [];
  for (let v = step; v <= max * 1.001; v += step) ticks.push(v);
  return ticks;
}

export function ProjectionChart({
  points,
  ariaSummary,
  axisFormat,
  readoutFormat,
  height = 240,
  showInvested = true,
  target = null,
  targetLabel,
  drawOnMount = false,
  className,
}: ProjectionChartProps) {
  const [wrapRef, width] = useElementWidth<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const w = Math.max(width, 280);
  const h = height;
  const x0 = PAD.left;
  const x1 = w - PAD.right;
  const yTop = PAD.top;
  const yBottom = h - PAD.bottom;
  const plotW = Math.max(x1 - x0, 1);
  const plotH = Math.max(yBottom - yTop, 1);

  const maxYear = points.length ? points[points.length - 1].year : 1;
  const maxValue = Math.max(
    target ?? 0,
    ...points.map((p) => p.corpus),
    1,
  );
  const domainTop = maxValue * 1.1;

  const xFor = React.useCallback(
    (year: number) => x0 + (year / Math.max(maxYear, 0.0001)) * plotW,
    [x0, maxYear, plotW],
  );
  const yFor = React.useCallback(
    (value: number) => yBottom - (value / domainTop) * plotH,
    [yBottom, domainTop, plotH],
  );

  const corpusCoords = points.map((p) => ({ x: xFor(p.year), y: yFor(p.corpus) }));
  const investedCoords =
    showInvested && points.some((p) => p.invested != null)
      ? points.map(
          (p) => ({ x: xFor(p.year), y: yFor(p.invested ?? 0) }),
        )
      : [];

  const corpusPath = linePath(corpusCoords);
  const investedPath = linePath(investedCoords);
  const areaPath =
    corpusCoords.length > 0
      ? `${corpusPath}L${corpusCoords[corpusCoords.length - 1].x.toFixed(2)},${yBottom}L${corpusCoords[0].x.toFixed(2)},${yBottom}Z`
      : "";

  const valueTicks = niceValueTicks(domainTop * 0.92);
  const yearTicks = niceYearTicks(maxYear);

  const setActive = React.useCallback(
    (clientX: number) => {
      const svg = svgRef.current;
      if (!svg || points.length === 0) return;
      const box = svg.getBoundingClientRect();
      const localX = ((clientX - box.left) / box.width) * w;
      const ratio = Math.min(Math.max((localX - x0) / plotW, 0), 1);
      setHoverIndex(Math.round(ratio * (points.length - 1)));
    },
    [points.length, w, x0, plotW],
  );

  const onKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const stepSize = event.shiftKey ? 10 : 1;
    setHoverIndex((current) => {
      const base = current ?? points.length - 1;
      const next =
        event.key === "ArrowRight"
          ? Math.min(base + stepSize, points.length - 1)
          : Math.max(base - stepSize, 0);
      return next;
    });
  };

  const active = hoverIndex != null ? points[hoverIndex] : null;
  const readoutX = active ? xFor(active.year) : 0;
  const boxClampedX = Math.min(
    Math.max(readoutX, x0 + 46),
    Math.max(x1 - 46, x0 + 46),
  );

  const ready = width > 0 && points.length > 1;

  return (
    <div ref={wrapRef} className={className}>
      {ready && (
        <svg
          ref={svgRef}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="block w-full cursor-crosshair touch-pan-y select-none overflow-visible"
          role="img"
          aria-label={ariaSummary}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onBlur={() => setHoverIndex(null)}
          onPointerMove={(event) => setActive(event.clientX)}
          onPointerDown={(event) => setActive(event.clientX)}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="fermor-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#076b39" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#076b39" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {valueTicks.map((tick) => {
            const y = yFor(tick);
            if (y < yTop || y > yBottom) return null;
            return (
              <g key={`v${tick}`}>
                <line
                  x1={x0}
                  x2={x1}
                  y1={y}
                  y2={y}
                  stroke="#0f1211"
                  strokeOpacity={0.09}
                  strokeDasharray="2 5"
                />
                <text
                  x={x1 + 9}
                  y={y}
                  dominantBaseline="middle"
                  className="t-num"
                  fontSize={10.5}
                  fill="#4d5651"
                >
                  {axisFormat(tick)}
                </text>
              </g>
            );
          })}

          {areaPath && (
            <path
              d={areaPath}
              fill="url(#fermor-area)"
              className={drawOnMount && !reduced ? "seq-fade" : undefined}
              style={drawOnMount && !reduced ? { animationDelay: "550ms" } : undefined}
            />
          )}

          {investedPath && (
            <path
              d={investedPath}
              fill="none"
              stroke="#0f1211"
              strokeOpacity={0.38}
              strokeWidth={1.4}
              strokeDasharray="5 5"
            />
          )}

          <path
            d={corpusPath}
            fill="none"
            stroke="#076b39"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className={drawOnMount && !reduced ? "draw-path" : undefined}
          />

          {target != null && (
            <g>
              <line
                x1={x0}
                x2={x1}
                y1={yFor(target)}
                y2={yFor(target)}
                stroke="#c22d1d"
                strokeWidth={1.5}
                strokeDasharray="7 5"
              />
              <text
                x={x0 + 4}
                y={yFor(target) - 8}
                className="t-num"
                fontSize={10.5}
                fontWeight={600}
                fill="#c22d1d"
              >
                {targetLabel}
              </text>
            </g>
          )}

          <line
            x1={x0}
            x2={x1}
            y1={yBottom}
            y2={yBottom}
            stroke="#0f1211"
            strokeOpacity={0.22}
          />

          {yearTicks.map((year) => (
            <text
              key={`y${year}`}
              x={Math.min(Math.max(xFor(year), x0 + 10), x1 - 10)}
              y={yBottom + 15}
              textAnchor="middle"
              className="t-num"
              fontSize={10.5}
              fill="#4d5651"
            >
              {year === 0 ? "Today" : `${year}y`}
            </text>
          ))}

          {active && (
            <g>
              <line
                x1={xFor(active.year)}
                x2={xFor(active.year)}
                y1={yTop}
                y2={yBottom}
                stroke="#0f1211"
                strokeOpacity={0.32}
                strokeDasharray="3 3"
              />
              <circle
                cx={xFor(active.year)}
                cy={yFor(active.corpus)}
                r={5}
                fill="#f2f3f0"
                stroke="#076b39"
                strokeWidth={2.25}
              />
              <g transform={`translate(${boxClampedX}, ${Math.max(yTop - 6, 2)})`}>
                <rect
                  x={-54}
                  y={-14}
                  width={108}
                  height={26}
                  rx={6}
                  fill="#101413"
                />
                <text
                  x={0}
                  y={0}
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="t-num"
                  fontSize={11}
                  fontWeight={500}
                  fill="#ffffff"
                >
                  {`${Math.round(active.year)}y · ${readoutFormat(active.corpus)}`}
                </text>
              </g>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
