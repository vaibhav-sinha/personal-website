export const carGameProblem = {
  environment: "A simple game engine where you drive a car on a road with obstacles.",
  objective: "Drive as fast as possible while avoiding obstacles.",
  actions: [
    "Go left",
    "Go right",
    "Accelerate",
    "Decelerate",
    "Do nothing",
  ],
} as const;

export function formatCarGameProblemForPrompt(): string {
  const { environment, objective, actions } = carGameProblem;
  return [
    `Environment: ${environment}`,
    `Objective: ${objective}`,
    `Actions: ${actions.join(", ")}.`,
  ].join(" ");
}
