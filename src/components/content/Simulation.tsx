import { useState } from "react";

const GRID_SIZE = 4;
const GOAL = { row: 0, col: 3 };

function createGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0),
  );
}

function cellKey(row: number, col: number) {
  return `${row}-${col}`;
}

export default function Simulation() {
  const [agent, setAgent] = useState({ row: 3, col: 0 });
  const [values, setValues] = useState<Record<string, number>>({});
  const [steps, setSteps] = useState(0);

  const isGoal = agent.row === GOAL.row && agent.col === GOAL.col;

  function moveAgent(direction: "up" | "down" | "left" | "right") {
    if (isGoal) return;

    const next = { ...agent };
    if (direction === "up") next.row = Math.max(0, next.row - 1);
    if (direction === "down") next.row = Math.min(GRID_SIZE - 1, next.row + 1);
    if (direction === "left") next.col = Math.max(0, next.col - 1);
    if (direction === "right") next.col = Math.min(GRID_SIZE - 1, next.col + 1);

    const reward = next.row === GOAL.row && next.col === GOAL.col ? 1 : -0.04;
    const key = cellKey(next.row, next.col);

    setAgent(next);
    setValues((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + reward }));
    setSteps((s) => s + 1);
  }

  function reset() {
    setAgent({ row: 3, col: 0 });
    setValues({});
    setSteps(0);
  }

  const grid = createGrid();

  return (
    <div className="not-prose my-8 rounded-md border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-muted)">
            Interactive simulation
          </p>
          <p className="mt-1 font-serif text-sm text-(--color-muted)">
            Move the agent toward the goal. Each step updates a running value estimate.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="shrink-0 rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs text-(--color-text) transition-colors hover:border-(--color-muted)"
        >
          Reset
        </button>
      </div>

      <div
        className="mx-auto grid w-fit gap-1 rounded border border-(--color-border) bg-(--color-code-bg) p-2"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 3.5rem)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isAgent = agent.row === rowIndex && agent.col === colIndex;
            const isGoalCell = GOAL.row === rowIndex && GOAL.col === colIndex;
            const value = values[cellKey(rowIndex, colIndex)];

            return (
              <div
                key={cellKey(rowIndex, colIndex)}
                className="relative flex h-14 w-14 flex-col items-center justify-center rounded border border-(--color-border) bg-(--color-surface-raised) text-center"
              >
                {isGoalCell && (
                  <span className="font-mono text-[10px] uppercase tracking-wide text-(--color-muted)">
                    Goal
                  </span>
                )}
                {isAgent && (
                  <span className="absolute inset-0 m-auto size-4 rounded-full bg-(--color-accent)" />
                )}
                {value !== undefined && !isAgent && (
                  <span className="font-mono text-[10px] text-(--color-muted)">
                    {value.toFixed(2)}
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {(["up", "down", "left", "right"] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => moveAgent(dir)}
            disabled={isGoal}
            className="rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs capitalize text-(--color-text) transition-colors hover:border-(--color-muted) disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dir}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-xs text-(--color-muted)">
        Steps: {steps}
        {isGoal && " · Goal reached"}
      </p>
    </div>
  );
}
