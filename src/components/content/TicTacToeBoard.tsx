export type CellValue = -1 | 0 | 1;
export type Board = CellValue[][];

export interface BoardHighlight {
  row: number;
  col: number;
  label?: string;
  variant?: "candidate" | "chosen" | "muted";
}

interface TicTacToeBoardProps {
  board: Board;
  highlights?: BoardHighlight[];
  caption?: string;
}

function cellSymbol(value: CellValue): string {
  if (value === 1) return "X";
  if (value === -1) return "O";
  return "";
}

function highlightAt(
  highlights: BoardHighlight[] | undefined,
  row: number,
  col: number,
): BoardHighlight | undefined {
  return highlights?.find((h) => h.row === row && h.col === col);
}

export default function TicTacToeBoard({
  board,
  highlights,
  caption,
}: TicTacToeBoardProps) {
  return (
    <div className="not-prose my-6">
      <div className="mx-auto grid w-fit grid-cols-3 gap-1 rounded border border-(--color-border) bg-(--color-code-bg) p-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const highlight = highlightAt(highlights, rowIndex, colIndex);
            const variant = highlight?.variant ?? "candidate";

            const ringClass =
              variant === "chosen"
                ? "ring-2 ring-(--color-accent)"
                : variant === "candidate"
                  ? "ring-1 ring-(--color-muted)"
                  : "";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`relative flex h-16 w-16 flex-col items-center justify-center rounded border border-(--color-border) bg-(--color-surface-raised) ${ringClass}`}
              >
                <span className="font-mono text-xl text-(--color-text)">
                  {cellSymbol(cell)}
                </span>
                {highlight?.label && (
                  <span className="absolute bottom-1 font-mono text-[9px] text-(--color-muted)">
                    {highlight.label}
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>
      {caption && (
        <p className="mt-2 text-center font-serif text-sm text-(--color-muted)">
          {caption}
        </p>
      )}
    </div>
  );
}
