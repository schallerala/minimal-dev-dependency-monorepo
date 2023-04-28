# Minimal `runAlong` example

> Monorepo using [Turborepo](https://turbo.build/repo)

## Turborepo example

This is mainly based on [`with-tailwind` example of the turbo repo](https://github.com/vercel/turbo/tree/main/examples/with-tailwind).

## Introduction

2 most imported elements of this monorepo:

* `apps/super-app/`: an Nextjs application with its own Storybook
* `packages/ui/`: a library of React component which is expected to be used in `apps/X` as
  a **dependency**.

## Problematic

### Working

As given in the example, you can run the application in `dev` "mode" at the root of
the monorepo and edit your application: `super-app` or the `ui` lib and everything works
as expected with _Hot Module Replacement_.
(As it will run all workspaces in "_watch mode_").

### Problematic (scenario)

Now, imagine, you have develop multiple components in the `ui` lib, for example with the
example of its own storybook context. (Improve edges, colors, shadows etc).
You are good to go for developing your `super-app` using your components, but, again, it
has its own storybook context.

Then, as the `super-app` projects depends on the `ui` project/lib and will you combine
multiple components of your `ui` lib in a new _story_, you find an issue with the imported
`ui` component and you want to fix it.

You edit your component in the `ui` project, but you wish for your running `super-app`
storybook to apply the changes! But you can't as the `ui` wasn't build again!

Therefore, you would wish for the `dev` scripts of your `super-app`'s dependency to run
along the `storybook` command!

With _turborepo_ you could imagine being able to declare a workspace specific `turbo.json`
file with:

```json
{
  "extends": ["//"],
  "pipeline": {
    "storybook": {
      "dependsOn": ["^dev"],
      "cache": false,
      "persistent": true
    }
  }
}
```

Or something similar. But it won't work... 😢

How to declare this scenario?

### Naive solution

The naive way without _turborepo_ would be than opening 2 terminals and in one:

```bash
./apps/super-app $ npm run storybook
```

and the other:

```bash
./pakcages/ui $ npm run dev
```

### Other problem

Imagine never haven build any of the workspace (new the team, just cloned the project),
and you jump right into running the `storybook` script in the `super-app` project.

Then, huge error in the console, as the `ui` lib did never build and Storybook's builder
(here, along nextjs, it is webpack if I'm not mistaken), can't find `ui` imported
components.
