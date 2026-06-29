const rewardDefinition =
  "An agent which interacts with an environment is given a numeric reward on each time step which depends on the state the agent is in, and the action that is taken by the agent. The reward provided is a property of the environment. Rewards can also be stochastic i.e. for the same chosen action in a given state, the agent might get different rewards different times. The objective of the agent is to collect as much reward as possible over time. The rewards guide the agent in learning what actions to take in different states.";

const longTermRewardContext =
  "Taking an action which yields the highest immediate reward (referred to as a greedy policy), is generally not optimal. Instead, what one should care about is long term rewards. For example, in a game of chess, it might be possible to gain a large immediate reward by taking a piece (assuming that positive rewards are provided whenever the agent takes a piece), but strategically it might be the wrong move causing the agent to eventually lose the game and get a very large negative reward. Rewards can be stochastic, so we often talk about expected reward.";

export const chessBoardThinkingExercise =
  "Let's say you are an observer of a game of chess. You are looking at the board from the perspective of player A. We need to consider a particular board state, and determine if it is a good position or not for player A.";

const valueFunctionDefinition =
  "How good a state is is measured by its value function. The value function is the expected total reward from that state given a particular policy (policy is the strategy of a player).";

export function rewardPrompt(question: string) {
  return [rewardDefinition, "", "Question:", question].join("\n");
}

export function rewardValuePrompt(question: string) {
  return [
    rewardDefinition,
    "",
    longTermRewardContext,
    "",
    "Thinking exercise:",
    chessBoardThinkingExercise,
    "",
    valueFunctionDefinition,
    "",
    "Question:",
    question,
  ].join("\n");
}
