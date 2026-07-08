import results from "./tic-tac-toe-results.json";

export type TicTacToeScenario =
  | "first_empty_position_opponent"
  | "random_opponent"
  | "agent_opponent";

export type Wdl = [wins: number, draws: number, losses: number];

export type ScenarioRun = [trainingGames: number, evals: [reference: Wdl, optimal: Wdl]];

export type TicTacToeResults = Record<TicTacToeScenario, ScenarioRun[]>;

export const ticTacToeResults = results as TicTacToeResults;

export function scoreFromWdl(wins: number, _draws: number, losses: number): number {
  return wins - losses;
}

export interface TrainingSeries {
  trainingGames: number[];
  vsReference: number[];
  vsOptimal: number[];
}

export function getScenarioSeries(scenario: TicTacToeScenario): TrainingSeries {
  const runs = ticTacToeResults[scenario];
  return {
    trainingGames: runs.map(([n]) => n),
    vsReference: runs.map(([, evals]) => {
      const [w, d, l] = evals[0];
      return scoreFromWdl(w, d, l);
    }),
    vsOptimal: runs.map(([, evals]) => {
      const [w, d, l] = evals[1];
      return scoreFromWdl(w, d, l);
    }),
  };
}

export function getOptimalComparisonSeries(): {
  trainingGames: number[];
  firstEmpty: number[];
  random: number[];
  agent: number[];
} {
  const firstEmpty = getScenarioSeries("first_empty_position_opponent");
  const random = getScenarioSeries("random_opponent");
  const agent = getScenarioSeries("agent_opponent");

  return {
    trainingGames: random.trainingGames,
    firstEmpty: firstEmpty.vsOptimal,
    random: random.vsOptimal,
    agent: agent.vsOptimal,
  };
}
