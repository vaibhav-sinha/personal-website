import { useState } from "react";
import TicTacToeBoard, { type Board } from "./TicTacToeBoard";

const alpha = 0.1;
const reward = 1;

const visitedStates: { board: Board; label: string; before: number; after: number }[] = [
  {
    board: [
      [-1, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    label: "s₁ — after first X move",
    before: 0.0,
    after: 0.1,
  },
  {
    board: [
      [-1, 0, -1],
      [0, 1, 0],
      [0, 0, 1],
    ],
    label: "s₂ — mid-game",
    before: 0.0,
    after: 0.1,
  },
  {
    board: [
      [-1, 0, -1],
      [0, 1, 1],
      [1, 0, 1],
    ],
    label: "s₃ — terminal win for X",
    before: 0.0,
    after: 0.1,
  },
];

export default function ValueUpdateWalkthrough() {
  const [index, setIndex] = useState(0);
  const current = visitedStates[index];
  const delta = alpha * (reward - current.before);

  return (
    <div className="not-prose my-8 rounded-md border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-muted)">
          Monte Carlo value update
        </p>
        <p className="mt-1 max-w-xl font-serif text-sm text-(--color-muted)">
          Episode ends with X winning, so R = +1. Every recorded state gets the
          same update: V(s) ← V(s) + α(R − V(s)).
        </p>
      </div>

      <TicTacToeBoard board={current.board} caption={current.label} />

      <div className="mt-4 grid gap-3 rounded border border-(--color-border) bg-(--color-code-bg) p-4 font-mono text-sm text-(--color-text) sm:grid-cols-2">
        <div>
          <p className="text-(--color-muted)">Before</p>
          <p>V(s) = {current.before.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-(--color-muted)">After</p>
          <p>V(s) = {current.after.toFixed(2)}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-(--color-muted)">Update</p>
          <p>
            Δ = α(R − V) = {alpha} × ({reward} − {current.before.toFixed(2)}) ={" "}
            {delta.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
          className="rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs text-(--color-text) transition-colors hover:border-(--color-muted) disabled:opacity-40"
        >
          Previous state
        </button>
        <button
          type="button"
          disabled={index === visitedStates.length - 1}
          onClick={() => setIndex((i) => i + 1)}
          className="rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs text-(--color-text) transition-colors hover:border-(--color-muted) disabled:opacity-40"
        >
          Next state
        </button>
        <span className="font-mono text-xs text-(--color-muted)">
          State {index + 1} of {visitedStates.length}
        </span>
      </div>
    </div>
  );
}
