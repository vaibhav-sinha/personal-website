const ticTacToeContext = `We are studying reinforcement learning with a tic-tac-toe agent based on Sutton & Barto Chapter 1.

Setup:
- 3x3 board; O = -1, empty = 0, X = +1
- The learning agent always plays X (second player)
- The opponent always moves first in both training and evaluation
- Tabular state values (3^9 entries), epsilon-greedy policy, Monte Carlo updates with alpha=0.1, eps=0.1
- Terminal reward only: +1 win, -1 loss, 0 draw
- Value update: V(s) += alpha * (R - V(s)) for all states visited in the episode
- Evaluation: 10 games per run; score = wins - losses`;

export function ticTacToePrompt(question: string) {
  return [ticTacToeContext, "", "Question:", question].join("\n");
}
