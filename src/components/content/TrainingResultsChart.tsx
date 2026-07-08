import {
  getOptimalComparisonSeries,
  getScenarioSeries,
  type TicTacToeScenario,
} from "../../data/rl-course/tic-tac-toe-results";

type SeriesKey = "reference" | "optimal";

interface TrainingResultsChartProps {
  scenario?: TicTacToeScenario;
  series?: SeriesKey[];
  compareOptimal?: boolean;
  title?: string;
  yLabel?: string;
}

const SERIES_COLORS: Record<string, string> = {
  reference: "var(--color-accent)",
  optimal: "var(--color-muted)",
  firstEmpty: "#c97b63",
  random: "#6b9e78",
  agent: "#7b8fd4",
};

const SERIES_LABELS: Record<string, string> = {
  reference: "vs training opponent",
  optimal: "vs optimal opponent",
  firstEmpty: "trained vs first-empty",
  random: "trained vs random",
  agent: "trained vs agent",
};

const CHART_WIDTH = 560;
const CHART_HEIGHT = 280;
const PADDING = { top: 20, right: 20, bottom: 44, left: 48 };

function buildLinePath(
  xs: number[],
  ys: number[],
  xScale: (x: number) => number,
  yScale: (y: number) => number,
): string {
  return xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${xScale(x)} ${yScale(ys[i])}`)
    .join(" ");
}

export default function TrainingResultsChart({
  scenario,
  series = ["reference"],
  compareOptimal = false,
  title = "Training performance",
  yLabel = "Score (W − L)",
}: TrainingResultsChartProps) {
  const lines: { key: string; xs: number[]; ys: number[] }[] = [];

  if (compareOptimal) {
    const comparison = getOptimalComparisonSeries();
    lines.push(
      { key: "firstEmpty", xs: comparison.trainingGames, ys: comparison.firstEmpty },
      { key: "random", xs: comparison.trainingGames, ys: comparison.random },
      { key: "agent", xs: comparison.trainingGames, ys: comparison.agent },
    );
  } else if (scenario) {
    const data = getScenarioSeries(scenario);
    if (series.includes("reference")) {
      lines.push({ key: "reference", xs: data.trainingGames, ys: data.vsReference });
    }
    if (series.includes("optimal")) {
      lines.push({ key: "optimal", xs: data.trainingGames, ys: data.vsOptimal });
    }
  }

  const allX = lines.flatMap((l) => l.xs);
  const allY = lines.flatMap((l) => l.ys);
  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const yMin = Math.min(-10, ...allY);
  const yMax = Math.max(10, ...allY);

  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;

  const xScale = (x: number) =>
    PADDING.left + ((x - xMin) / (xMax - xMin || 1)) * plotWidth;
  const yScale = (y: number) =>
    PADDING.top + plotHeight - ((y - yMin) / (yMax - yMin || 1)) * plotHeight;

  const yTicks = [-10, -5, 0, 5, 10].filter((t) => t >= yMin && t <= yMax);
  const xTicks = [...new Set(allX)].sort((a, b) => a - b);

  return (
    <div className="not-prose my-8 rounded-md border border-(--color-border) bg-(--color-surface) p-5">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-(--color-muted)">
        {title}
      </p>
      <p className="mb-4 font-serif text-sm text-(--color-muted)">{yLabel}</p>

      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label={title}
      >
        {/* axes */}
        <line
          x1={PADDING.left}
          y1={PADDING.top + plotHeight}
          x2={PADDING.left + plotWidth}
          y2={PADDING.top + plotHeight}
          stroke="var(--color-border)"
        />
        <line
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={PADDING.top + plotHeight}
          stroke="var(--color-border)"
        />

        {/* y grid + labels */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING.left}
              y1={yScale(tick)}
              x2={PADDING.left + plotWidth}
              y2={yScale(tick)}
              stroke="var(--color-border)"
              strokeDasharray="4 4"
              opacity={0.5}
            />
            <text
              x={PADDING.left - 8}
              y={yScale(tick) + 4}
              textAnchor="end"
              className="fill-(--color-muted) font-mono text-[10px]"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* x labels */}
        {xTicks.map((tick) => (
          <text
            key={tick}
            x={xScale(tick)}
            y={CHART_HEIGHT - 12}
            textAnchor="middle"
            className="fill-(--color-muted) font-mono text-[10px]"
          >
            {(tick / 1000).toFixed(0)}k
          </text>
        ))}

        <text
          x={PADDING.left + plotWidth / 2}
          y={CHART_HEIGHT - 2}
          textAnchor="middle"
          className="fill-(--color-muted) font-mono text-[10px]"
        >
          Training games
        </text>

        {/* lines */}
        {lines.map((line) => (
          <path
            key={line.key}
            d={buildLinePath(line.xs, line.ys, xScale, yScale)}
            fill="none"
            stroke={SERIES_COLORS[line.key]}
            strokeWidth={2}
          />
        ))}

        {/* points */}
        {lines.map((line) =>
          line.xs.map((x, i) => (
            <circle
              key={`${line.key}-${x}`}
              cx={xScale(x)}
              cy={yScale(line.ys[i])}
              r={3}
              fill={SERIES_COLORS[line.key]}
            />
          )),
        )}
      </svg>

      <div className="mt-3 flex flex-wrap justify-center gap-4">
        {lines.map((line) => (
          <div key={line.key} className="flex items-center gap-2">
            <span
              className="inline-block h-0.5 w-5"
              style={{ backgroundColor: SERIES_COLORS[line.key] }}
            />
            <span className="font-mono text-xs text-(--color-muted)">
              {SERIES_LABELS[line.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
