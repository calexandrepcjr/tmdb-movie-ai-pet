# Architecture Decision Records (ADRs)

This directory contains all architectural decisions made for the TMDB Movie Client project. Each ADR documents a significant architectural choice, its context, and consequences.

## 📋 ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./001-domain-driven-design.md) | Adopt Domain-Driven Design Architecture | Accepted | 2025-07-09 |
| [ADR-002](./002-clean-architecture.md) | Implement Clean Architecture Pattern | Accepted | 2025-07-09 |
| [ADR-003](./003-typescript-language.md) | Use TypeScript as Primary Language | Accepted | 2025-07-09 |
| [ADR-004](./004-dependency-injection.md) | Implement Dependency Injection Container | Accepted | 2025-07-09 |
| [ADR-005](./005-multiple-presentation-layers.md) | Support Multiple Presentation Layers | Accepted | 2025-07-09 |
| [ADR-006](./006-browser-environment-naming.md) | Adopt Browser-Centric Naming Convention | Accepted | 2025-07-09 |
| [ADR-007](./007-tmdb-api-authentication.md) | Use Query Parameter Authentication for TMDB API | Accepted | 2025-07-09 |
| [ADR-008](./008-webpack-build-system.md) | Use Webpack for Browser Build System | Accepted | 2025-07-09 |
| [ADR-009](./009-environment-configuration.md) | Implement Environment-Specific Configuration | Accepted | 2025-07-09 |

## 🔍 ADR Guidelines

### When to Create an ADR
- Significant architectural changes
- Technology stack decisions
- Design pattern adoptions
- Major refactoring decisions
- API design choices

### ADR Process
1. **Identify** the architectural decision needed
2. **Research** alternatives and trade-offs
3. **Draft** ADR using the [template](./template.md)
4. **Review** with team members
5. **Accept** and implement the decision
6. **Update** this index

### ADR Status Definitions
- **Proposed**: Decision is being considered
- **Accepted**: Decision is approved and implemented
- **Rejected**: Decision was considered but not adopted
- **Deprecated**: Decision is no longer relevant
- **Superseded**: Decision replaced by newer ADR

---

*For creating new ADRs, use the [ADR Template](./template.md)*
