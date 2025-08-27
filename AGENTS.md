# Repository Guidelines

This repository is a minimal Node.js project. Use this guide to add code and grow the project consistently and safely.

## Project Structure & Module Organization
- `src/`: application code (entrypoint `src/index.js`).
- `tests/`: unit tests and fixtures.
- `assets/`: static files if needed.
- `scripts/`: local tooling and maintenance scripts.
- Root: `package.json`, `.gitignore`, docs.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm test`: currently a placeholder; configure a real test runner before use.
- Run locally: `node src/index.js` (after creating the entry file).

Recommended scripts to add in `package.json`:
```json
{
  "scripts": {
    "dev": "node src/index.js",
    "test": "jest --runInBand",
    "lint": "eslint .",
    "format": "prettier -w ."
  }
}
```

## Coding Style & Naming Conventions
- Indentation: 2 spaces; use semicolons; single quotes for strings.
- Naming: camelCase for variables/functions, PascalCase for classes, kebab-case file names.
- Modules: prefer small, pure functions; keep files under ~200 lines when practical.
- Tooling: ESLint + Prettier (recommended). If configured, run `npm run lint` and `npm run format` before pushing.

## Testing Guidelines
- Framework: Jest (recommended).
- Test names: mirror source path; use `*.test.js` (e.g., `src/utils/math.test.js`).
- Coverage: target ≥80% lines/branches for new or changed code.
- Run tests: `npm test` once Jest is configured.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits (e.g., `feat: add parser`, `fix: handle null id`).
- Scope: small, focused commits; present tense, imperative mood.
- PRs: include a clear description, linked issues, test plan/commands, and screenshots for UI changes.
- Checks: ensure local tests/lint pass; request review when green.

## Security & Configuration Tips
- Secrets: never commit credentials; use `.env` and document required variables.
- Node version: pin with `.nvmrc` (e.g., `18`); run `nvm use`.
- Dependencies: review with `npm audit` and update regularly.
