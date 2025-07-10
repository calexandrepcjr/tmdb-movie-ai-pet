# ADR-003: Use TypeScript as Primary Language

## Status
Accepted

## Context
The project requires a strongly-typed language that can work across different environments (Node.js for CLI, browser for web interface) while providing excellent developer experience and maintainability.

## Decision
We will use TypeScript as the primary programming language for the entire codebase, including:

- Domain entities and business logic
- Application services and use cases
- Infrastructure implementations
- Presentation layer components
- Configuration and build scripts

## Consequences

### Positive Consequences
- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Excellent autocomplete, refactoring, and navigation
- **Self-Documenting Code**: Types serve as living documentation
- **Easier Refactoring**: Types help identify breaking changes
- **Team Productivity**: Reduces debugging time and onboarding complexity
- **Cross-Platform**: Works in both Node.js and browser environments

### Negative Consequences
- **Build Step Required**: Need compilation from TypeScript to JavaScript
- **Learning Curve**: Developers need TypeScript knowledge
- **Additional Tooling**: Requires TypeScript compiler and type definitions

## Implementation
TypeScript configuration (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  }
}
```

Key TypeScript features used:
- **Classes**: Used for rich domain entities with encapsulated behavior.
- **Generics**: Create reusable components and utilities
- **Enums**: Define constants and options
- **Union Types**: Handle multiple possible types
- **Strict Mode**: Maximum type safety

## Alternatives Considered
- **JavaScript**: Simpler but lacks type safety and IDE support
- **Flow**: Facebook's type system but less ecosystem support
- **Dart**: Google's language but would require different tooling

## Related ADRs
- [ADR-008: Use Webpack for Browser Build System](./008-webpack-build-system.md)
- [ADR-009: Implement Environment-Specific Configuration](./009-environment-configuration.md)

---

**Date:** 2025-07-08
**Author:** Development Team
**Reviewers:** Architecture Review
