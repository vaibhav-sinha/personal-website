import { useState } from "react";
import TicTacToeBoard, { type Board } from "./TicTacToeBoard";

const exampleBoard: Board = [
  [-1, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

interface CandidateMove {
  row: number;
  col: number;
  value: number;
}

const candidateMoves: CandidateMove[] = [
  { row: 0, col: 1, value: 0.42 },
  { row: 0, col: 2, value: 0.38 },
  { row: 1, col: 0, value: 0.55 },
  { row: 1, col: 2, value: 0.61 },
  { row: 2, col: 0, value: 0.35 },
  { row: 2, col: 1, value: 0.33 },
  { row: 2, col: 2, value: 0.72 },
];

const chosenMove = candidateMoves.reduce((best, move) =>
  move.value > best.value ? move : best,
);

const steps = [
  {
    title: "Current state",
    description:
      "O moved first (top-left). It is X's turn. The agent lists every empty cell as a legal action.",
    board: exampleBoard,
    highlights: [],
  },
  {
    title: "Look ahead to successor states",
    description:
      "For each legal move, the agent simulates the move on a cloned board and reads V(s') from the table.",
    board: exampleBoard,
    highlights: candidateMoves.map((move) => ({
      row: move.row,
      col: move.col,
      label: `V=${move.value.toFixed(2)}`,
      variant: "candidate" as const,
    })),
  },
  {
    title: "Greedy choice",
    description:
      "The agent picks the move with the highest successor value. With ε = 0.1, this greedy branch is taken 90% of the time during training.",
    board: exampleBoard,
    highlights: [
      {
        row: chosenMove.row,
        col: chosenMove.col,
        label: `V=${chosenMove.value.toFixed(2)}`,
        variant: "chosen" as const,
      },
    ],
  },
  {
    title: "Record the visited state",
    description:
      "After playing the move, the post-move board is appended to states_encountered for the Monte Carlo update at episode end.",
    board: exampleBoard.map((row, r) =>
      row.map((cell, c) =>
        r === chosenMove.row && c === chosenMove.col ? 1 : cell,
      ),
    ) as Board,
    highlights: [],
  },
];

export default function GreedyMoveWalkthrough() {
  const [step, setStep] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const current = steps[step];

  return (
    <div className="not-prose my-8 rounded-md border border-(--color-border) bg-(--color-surface) p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-muted)">
            Greedy move selection
          </p>
          <p className="mt-1 max-w-xl font-serif text-sm text-(--color-muted)">
            {current.description}
          </p>
        </div>
        <label className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
          <input
            type="checkbox"
            checked={showExplore}
            onChange={(e) => setShowExplore(e.target.checked)}
            className="accent-(--color-accent)"
          />
          Show ε-greedy explore branch
        </label>
      </div>

      {showExplore && (
        <p className="mb-4 rounded border border-(--color-border) bg-(--color-code-bg) px-3 py-2 font-serif text-sm text-(--color-muted)">
          With probability ε = 0.1, the agent skips this value comparison and
          plays a uniformly random empty cell instead. That random move is also
          recorded in states_encountered.
        </p>
      )}

      <p className="mb-3 font-mono text-sm text-(--color-text)">{current.title}</p>

      <TicTacToeBoard
        board={current.board}
        highlights={current.highlights}
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs text-(--color-text) transition-colors hover:border-(--color-muted) disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={step === steps.length - 1}
          onClick={() => setStep((s) => s + 1)}
          className="rounded border border-(--color-border) px-3 py-1.5 font-mono text-xs text-(--color-text) transition-colors hover:border-(--color-muted) disabled:opacity-40"
        >
          Next
        </button>
        <span className="font-mono text-xs text-(--color-muted)">
          Step {step + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
}
