# Contributing to Stratpoint Engineering Hub

## Workflow

1. Create a branch from `main`: `git checkout -b feat/your-topic`
2. Make your changes in `src/content/`
3. Run `pnpm dev` to preview locally
4. Open a Pull Request — no direct pushes to `main`
5. At least one review required before merge

## Content Guidelines

- All docs are written in MDX (`.mdx`)
- Follow the existing structure per domain: `index.mdx`, `best-practices.mdx`, `golden-path.mdx`, `onboarding.mdx`
- Keep language clear, concise, and actionable
- Include code examples where applicable

## Branch Naming

| Type | Pattern |
|------|---------|
| Feature / new content | `feat/topic` |
| Fix / correction | `fix/topic` |
| Improvement | `chore/topic` |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```
feat(web): add React golden path
fix(mobile): correct Flutter setup steps
docs(cloud): update GCP onboarding guide
```
