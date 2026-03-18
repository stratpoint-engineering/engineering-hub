# [Domain] [Framework/Stack] Standards and Best Practices

> A completed example of this template: [Java Spring Boot Standards and Best Practices](./Java%20Springboot%20Standards%20and%20Best%20Practices.docx.md)

---

## Project Structure

Show the recommended folder/file layout for a project in this stack.

```
/project-root/
├── src/
│   └── ...
├── tests/
│   └── ...
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Naming Conventions

Define the naming rules for this stack. Cover at minimum:

| Target | Convention | Example |
|---|---|---|
| Classes / Components | PascalCase | `UserService` |
| Methods / Functions | camelCase or snake_case | `getUserById` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Files | kebab-case or PascalCase | `user-service.ts` |
| Packages / Modules | lowercase | `com.company.module` |

---

## Code Organization

Describe the layers or modules in this stack and what belongs in each.

1. **Layer A** — Responsibility description
2. **Layer B** — Responsibility description
3. **Layer C** — Responsibility description

---

## [Domain-Specific Standards]

> Replace this section title with what makes sense for your domain:
> - Backend → "API Design Standards"
> - Web / Mobile → "Component Standards"
> - Data → "Pipeline Standards"
> - Cloud → "IaC Standards"
> - AI/ML → "Model Standards"

### Sub-topic 1

- Rule or convention

### Sub-topic 2

- Rule or convention

---

## Architectural Patterns

Document the key design patterns used in this stack. For each pattern include the goal, best practice, and a code or config example.

### Pattern Name

**Goal:** One sentence on why this pattern is used.

**Best Practice:** What to do and what to avoid.

```language
// Example
```

---

## Concurrency / Performance

Document concurrency models, async patterns, or performance considerations specific to this stack.

---

## Security Implementation

### Authentication & Authorization

- Rule or convention

### Data Protection

- Rule or convention

### Input Validation

- Rule or convention

---

## Database / Storage Best Practices

> Skip or rename if not applicable to this domain.

- Rule or convention

---

## Testing Requirements

### Coverage Targets

| Layer | Minimum Coverage |
|---|---|
| Unit | 80% |
| Service / Core Logic | 90% |
| Critical Paths | 100% |

### Test Types

| Type | Tool | Notes |
|---|---|---|
| Unit | _e.g., JUnit, Jest, pytest_ | |
| Integration | _e.g., TestContainers, Supertest_ | |
| E2E | _e.g., Playwright, Cypress_ | |

---

## Configuration Management

### Environment Profiles

- List the profiles used (e.g., `dev`, `test`, `staging`, `prod`)
- Describe how secrets are managed

### Logging Strategy

- Log format (structured JSON recommended)
- Log levels per environment
- What to include / exclude in logs

---

## Containerization

Provide a recommended `Dockerfile` and `docker-compose.yml` for local development.

```dockerfile
# Dockerfile
```

```yaml
# docker-compose.yml
```

---

## CI/CD Pipeline

Provide a recommended pipeline configuration (GitHub Actions or equivalent).

```yaml
# .github/workflows/ci.yml
```

---

## Monitoring and Observability

- Metrics tooling (e.g., Prometheus, Micrometer, Datadog)
- Tracing (e.g., OpenTelemetry, Zipkin)
- Health check endpoints

---

## Documentation Requirements

What documentation must accompany a project built on this stack:

- [ ] README with project overview, setup instructions, and common issues
- [ ] API / interface documentation (e.g., Swagger/OpenAPI, gRPC proto docs)
- [ ] Architecture documentation (context diagram, component diagram, data models, sequence diagrams for key flows)
- [ ] Operations runbook (deployment procedures, scaling, monitoring setup, incident response)

---

## Security Gates

Gates that must be passed during development and before deployment.

### Development Security Gates

1. **Code Quality Gate**
   - Static code analysis (e.g., SonarQube, ESLint, Checkstyle)
   - Enforced code coverage thresholds
   - Dependency vulnerability scanning

2. **Design Security Gate**
   - Security architecture review
   - Data classification assessment
   - Authentication / authorization design review
   - API security review

### Deployment Security Gates

1. **Pre-Deployment**
   - Container image security scanning (e.g., Trivy, Grype)
   - OWASP dependency check
   - Secret scanning
   - SBOM generation

2. **Post-Deployment**
   - API security testing
   - Penetration testing (for major releases)
   - Security configuration verification
   - Runtime vulnerability scanning

---

## AI-Assisted Development

Guidelines for using AI coding tools effectively and responsibly within this stack.

### Claude Code

**Recommended uses:**
- Scaffolding new modules, services, or components following this standard's project structure
- Generating boilerplate (DTOs, tests, config files, CI/CD pipelines)
- Explaining unfamiliar code or patterns in the codebase
- Drafting unit and integration tests against existing implementations
- Code review assistance — ask Claude to check against this standard's checklist

**CLAUDE.md setup for this stack:**

```markdown
# CLAUDE.md

## Stack
[Framework/Stack name and version]

## Project Structure
[Brief description or link to your structure section]

## Key Conventions
- [Naming rule 1]
- [Naming rule 2]

## What to follow
- [Key rule from this standard]
- [Key rule from this standard]

## What to avoid
- [Anti-pattern specific to this stack]
- [Anti-pattern specific to this stack]
```

**Guardrails:**
- Do not let Claude generate authentication, authorization, or cryptography code without manual review
- Always review AI-generated SQL queries and data access logic
- Do not share production secrets, PII, or proprietary data in prompts

### Cursor

**Recommended uses:**
- Inline code generation and completion within the IDE
- Refactoring existing code to match conventions
- Asking questions about the codebase using `@codebase` context
- Generating tests for selected functions

**`.cursor/rules` setup for this stack:**

```
## Role
You are a [Domain] engineer working in a [Framework/Stack] project at Stratpoint.

## Standards to follow
- [Key rule 1 from this standard]
- [Key rule 2 from this standard]
- [Key rule 3 from this standard]

## Code style
- [Style rule 1]
- [Style rule 2]

## Always
- Write tests alongside any new implementation
- Follow the naming conventions in this project's standards doc

## Never
- Use deprecated APIs
- Hardcode secrets or environment-specific values
- Skip input validation at entry points
```

**Guardrails:**
- Review all AI-suggested dependency additions before accepting
- Do not use AI-generated code in security-critical paths without a dedicated review pass
- Treat AI suggestions as a first draft — validate against this standard's checklist before merging

---

## Implementation Checklist

A checklist reviewers and engineers use to verify a project meets these standards.

### General

- [ ] Project structure follows the template above
- [ ] Naming conventions are applied consistently
- [ ] Secrets are externalized and not committed to source control
- [ ] Logging is structured and includes correlation IDs

### [Pattern or Topic]

> Add one sub-section per architectural pattern or key standard defined above.
> Use the ENFORCE / FORBID / MANDATE format for clarity.

**Goal:** One line on what this checklist section enforces.

- [ ] ENFORCE: specific rule
- [ ] FORBID: specific anti-pattern
- [ ] MANDATE: specific requirement

### Security

- [ ] Input validation is in place at all entry points
- [ ] Authentication and authorization are implemented
- [ ] Dependencies are scanned for vulnerabilities

### Testing

- [ ] Unit tests meet the minimum coverage targets
- [ ] Integration tests use real dependencies (not mocks where possible)
- [ ] CI pipeline enforces coverage thresholds

### CI/CD

- [ ] Pipeline runs lint, tests, and security scans on every PR
- [ ] Container image is scanned before deployment
- [ ] Deployments are gated on a passing pipeline

### AI-Assisted Code

- [ ] Code follows the naming conventions in this standard
- [ ] No secrets, tokens, or credentials were introduced
- [ ] Business logic is understood by the author, not just accepted from the AI
- [ ] Tests were generated or updated alongside the implementation
- [ ] Security-sensitive paths (auth, data access, encryption) were manually reviewed
- [ ] AI-generated dependencies are vetted and intentional

---

## References

### Official Documentation

- [Framework/Stack official docs](_link_)
- [Language official docs](_link_)

### Internal Resources

- [Stratpoint Engineering Principles](/engineering-principles)
- [Completed example — Java Spring Boot Standards](./Java%20Springboot%20Standards%20and%20Best%20Practices.docx.md)
- [Related golden path in the Engineering Hub](_link_)

### Further Reading

- [Relevant RFC, ADR, or design doc](_link_)
- [Relevant book, article, or course](_link_)
