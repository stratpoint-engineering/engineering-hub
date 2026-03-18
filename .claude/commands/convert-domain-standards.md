# Convert Domain Standards to Engineering Hub

Convert a completed domain standards document (following the Domain Standards Template) into the appropriate Engineering Hub pages.

## Usage

```
/convert-domain-standards <path-to-standards-doc>
```

**Example:**
```
/convert-domain-standards domain-standards/Java Springboot Standards and Best Practices.docx.md
```

---

## Instructions

You are converting a domain standards document into three Engineering Hub MDX pages. Follow these steps exactly.

### Step 1 — Read the source document

Read the file at the path provided by the user. If no path is given, ask for it.

### Step 2 — Identify the domain and stack

From the document title and content, determine:
- **Domain** — one of: `backend`, `web`, `mobile`, `data`, `cloud`, `ai-ml`
- **Stack name** — the framework or stack (e.g., `java-springboot`, `nestjs-microservice`, `flutter`, `terraform-aws`)
- **Display name** — human-readable title (e.g., `Java Spring Boot`, `NestJS Microservice`)

### Step 3 — Determine target file paths

```
src/content/[domain]/golden-paths/[stack].mdx
src/content/[domain]/best-practices.mdx
src/content/[domain]/code-review-checklist.mdx
```

Read all three existing files before writing to them.

### Step 4 — Convert and write each file

Use the section mapping below to extract content from the source document and write it into each hub page.

---

## Section Mapping

### → `golden-paths/[stack].mdx`

Pull these sections from the source document:

| Source Section | Golden Path Section |
|---|---|
| Project Structure | `## Project Structure` — use a `<FileTree>` component |
| Naming Conventions | `### Naming` under `## Conventions` |
| Code Organization | `### Patterns` under `## Conventions` |
| Architectural Patterns | `## Architectural Patterns` — keep all sub-sections and code examples |
| Concurrency / Performance | append to `## Architectural Patterns` or add as its own `## Concurrency` section |
| Database / Storage Best Practices | `## Database` |
| Testing Requirements | `## Testing` — use the coverage table and test types table |
| Configuration Management | `## Local Development` → Environment Variables; Logging goes to `## Observability` |
| Containerization | `## Local Development` → Running Locally (docker-compose); Dockerfile goes in a `<Tabs>` block |
| CI/CD Pipeline | `## CI/CD` |
| Monitoring and Observability | `## Observability` |
| AI-Assisted Development | `## AI-Assisted Development` — include CLAUDE.md and .cursor/rules setup |
| References | `## References` |

**Golden path file format:**

```mdx
---
title: [Display Name]
---

import { Callout, Steps, FileTree, Tabs, Tab } from 'nextra/components'

# [Display Name]

> **Stack:** [stack summary line]

## Overview

[1-2 sentence description of this stack and when to use it]

## When to Use

| ✅ Use this when | ❌ Avoid this when |
|---|---|
| [from document context] | [from document context] |

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| [derived from document] | | |

## Prerequisites

- [ ] [derived from document]

## Project Structure

<FileTree>
  [convert the directory tree to FileTree component syntax]
</FileTree>

## Local Development

### Environment Variables
### Running Locally

## Conventions

### Naming
### Patterns
### Code Style

## Architectural Patterns

[sub-sections per pattern with code blocks]

## Database

[if present in source]

## Testing

[coverage table + test types table]

## CI/CD

[pipeline config]

## Observability

[metrics, tracing, logging]

## Security

[from Security Implementation section]

## AI-Assisted Development

### Claude Code
### Cursor

## References

[official docs, internal links, further reading]
```

---

### → `best-practices.mdx`

This is a **shared domain-level page** — do not overwrite existing content. Add or update only the sections that belong to this stack's domain-specific standards.

Pull these sections from the source document:

| Source Section | Best Practices Section |
|---|---|
| [Domain-Specific Standards] (e.g., API Design Standards) | Add as a new `## [Section Title]` or merge if a section already exists |
| Security Implementation | Merge into `## Security` — keep rules that apply across all stacks in the domain |

**Rules:**
- If the page already has content in a section, append the new stack's rules under a `### [Stack Name]` sub-heading
- If the page is empty / pending, write it fresh
- Do not add stack-specific implementation details here — those belong in the golden path

---

### → `code-review-checklist.mdx`

This is a **shared domain-level page** — do not overwrite existing content. Add or update only the checklist items that belong to this stack.

Pull these sections from the source document:

| Source Section | Checklist Section |
|---|---|
| Implementation Checklist → General | `## General` |
| Implementation Checklist → Security | `## Security` |
| Implementation Checklist → Testing | `## Testing` |
| Implementation Checklist → CI/CD | `## CI/CD` |
| Implementation Checklist → [Pattern sub-sections] | Add as `## [Stack Name] Specifics` section |
| AI-Assisted Code checklist | `## AI-Assisted Code` |

**Rules:**
- General, Security, Testing, and CI/CD items that apply to all stacks go directly in the shared sections
- Stack-specific pattern checklist items (e.g., DI rules, Factory rules) go under a `## [Stack Name] Specifics` section
- Use the ENFORCE / FORBID / MANDATE format from the source document

---

## Step 5 — Update `_meta.js` if needed

If the golden path file is new (did not exist before), check `src/content/[domain]/golden-paths/_meta.js` and add the new stack entry if it is missing.

---

## Step 6 — Confirm

After writing all files, summarize:
- Which files were created vs updated
- Any sections from the source that were skipped and why
