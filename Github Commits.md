# Conventional Commit Types Guide

The **type** in a commit message helps developers and automated tools understand the intent of your changes. For new features, always use **`feat`** (not "feet").

## Standard Types
*   **feat**: A new feature for the user, not a new feature for builds or internal tools.
*   **fix**: A bug fix for the user, not a fix for a build script.
*   **docs**: Changes to the documentation (e.g., README, code comments).
*   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
*   **refactor**: A code change that neither fixes a bug nor adds a feature.
*   **perf**: A code change that improves performance.
*   **test**: Adding missing tests or correcting existing tests.
*   **build**: Changes that affect the build system or external dependencies (example scopes: [npm](https://www.npmjs.com), [Maven](https://maven.apache.org)).
*   **ci**: Changes to CI configuration files and scripts (example scopes: [GitHub Actions](https://github.com), [CircleCI](https://circleci.com)).
*   **chore**: Other changes that don't modify source or test files (e.g., updating `.gitignore`).
*   **revert**: Reverts a previous commit.

## Quick Syntax
`type(optional-scope): description`

### Breaking Changes
Indicate a breaking change by adding a `!` after the type/scope:
`feat(api)!: remove deprecated endpoint`

---
*Based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.*