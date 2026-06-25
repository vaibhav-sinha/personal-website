const policyDefinition =
  "The policy is essentially a mapping from states to actions. It tells what action the agent would take when it is in a given state.";

const policyQuestions = [
  "The book says that policies may be stochastic. What does that mean?",
  "Why would you want to have stochastic policies?",
  "Is it ever a good idea to have stochastic policies if the environment is not stochastic?",
  "Is it ever a good idea to have stochastic policies if the environment is not stochastic and also stationary?",
  "Let's say you are in state S at time t. What factors would you consider to determine what action A you should take next?",
];

function formatPolicyQuestions() {
  return policyQuestions.flatMap((question, index) => [
    `Question ${index + 1}:`,
    question,
    "",
  ]);
}

export function policyPrompt(question: string) {
  return [policyDefinition, "", "Question:", question].join("\n");
}

export function policyThinkingExercisePrompt(exercise: string) {
  return [
    policyDefinition,
    "",
    "Answer the following questions about policies:",
    "",
    ...formatPolicyQuestions(),
    "Thinking exercise:",
    exercise,
  ].join("\n");
}
