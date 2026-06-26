## Tailwind

Use Tailwind v4 CSS variable shorthand for theme tokens: `text-(--color-muted)`, `border-(--color-border)`, `bg-(--color-surface)` — not the arbitrary-value form `text-[var(--color-muted)]`.
Register custom properties in `:root` / `@theme` in `src/styles/global.css`; reference them with the parenthesis syntax in class names.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## RL course answers

Keep lesson content in `src/content/rl-course/` lean. Put answer bodies in separate MDX files under `src/components/content/rl-course/`, organized by page and section:

```
src/components/content/rl-course/
  introduction/
    state-and-action/
      velocity-in-state.mdx
    policy/
      stochastic-policy-meaning.mdx
    environment/
      environment-exercise-answer.mdx
```

- **Page directory** matches the lesson slug (e.g. `introduction` for `introduction.mdx`).
- **Section subdirectory** matches the lesson heading slug (e.g. `state-and-action` for `## State and Action`).
- **One answer per file**, named in kebab-case to describe the question (e.g. `past-position-velocity.mdx`).
- Write answers as markdown in `.mdx` files, not `.astro`.
- If an answer needs shared content components (`Math`, `CodeBlock`, etc.), import them at the top of the answer file from `../../../` (e.g. `import Math from "../../../Math.astro"`).

In the lesson MDX, import each answer and pass it to the question or thinking exercise via the `answer` slot. Do not inline long answers in the lesson file.

```mdx
import VelocityInState from "../../components/content/rl-course/introduction/state-and-action/velocity-in-state.mdx";

<Question prompt={carGamePrompt("Did you include the velocity of the car in the state?")}>
  Did you include the velocity of the car in the state?

  <VelocityInState slot="answer" />
</Question>
```

For thinking exercises, use the same pattern:

```mdx
import EnvironmentExerciseAnswer from "../../components/content/rl-course/introduction/environment/environment-exercise-answer.mdx";

<ThinkingExercise prompt={"Explain what is an environment..."}>
  Prompt text for the learner.

  <EnvironmentExerciseAnswer slot="answer" />
</ThinkingExercise>
```

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
