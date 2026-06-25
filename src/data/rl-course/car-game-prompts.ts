import { formatCarGameProblemForPrompt } from "./car-game-problem";

export const carGameThinkingExerciseApi = `If the game engine had an API to get any information out of it, what properties would you use to define the state of the game at any moment?`;

export const carGameThinkingExerciseImages = `If the game engine could only provide you images of the game, what properties would you use to define the state of the game at any moment?`;

function formatThinkingExercises(thinkingExercises: string[]) {
  if (thinkingExercises.length === 1) {
    return ["Thinking exercise:", thinkingExercises[0], ""];
  }

  return thinkingExercises.flatMap((exercise, index) => [
    `Thinking exercise ${index + 1}:`,
    exercise,
    "",
  ]);
}

export function carGamePrompt(
  question: string,
  thinkingExercises: string | string[] = carGameThinkingExerciseApi,
) {
  const exercises = Array.isArray(thinkingExercises)
    ? thinkingExercises
    : [thinkingExercises];

  return [
    "Problem:",
    formatCarGameProblemForPrompt(),
    "",
    ...formatThinkingExercises(exercises),
    "Question:",
    question,
  ].join("\n");
}
