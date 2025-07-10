# ADR-005: Support Multiple Presentation Layers

## Status
Accepted

## Context
The TMDB Movie Client needs to support different user interfaces and interaction methods. Users may want to use the application through a command-line interface for automation or through a web browser for visual interaction.

## Decision
We will design the application to support multiple presentation layers while sharing the same domain, application, and infrastructure layers. Supported presentation layers:

- **CLI (Command Line Interface)**: For scripting and automation
- **Browser (Web Interface)**: For interactive visual experience

## Consequences

### Positive Consequences
- **Code Reuse**: Domain and application logic shared across interfaces
- **Flexibility**: Users can choose their preferred interface
- **Testability**: Business logic tested independently of UI
- **Maintainability**: Changes to business logic affect all interfaces consistently
- **Scalability**: Easy to add new presentation layers (e.g., mobile app)

### Negative Consequences
- **Initial Complexity**: More complex project structure
- **Build Configuration**: Need different build processes for different targets
- **Environment Management**: Different configuration for each environment

## Implementation
Project structure supports multiple presentations:

```
src/
├── presentation/
│   ├── cli/
│   │   ├── CliApplication.ts
│   │   └── commands/
│   └── browser/
│       ├── App.tsx
│       ├── components/
│       ├── hooks/
│       └── pages/
├── application/           # Shared use cases
├── domain/               # Shared domain logic
└── infrastructure/       # Shared infrastructure
```

### CLI Implementation
```typescript
export class CliApplication {
  constructor(private container: Container) {}
  
  async run(args: string[]): Promise<void> {
    const searchUseCase = this.container.resolve<MovieSearchUseCase>('MovieSearchUseCase');
    // CLI-specific logic
  }
}
```

### Browser Implementation
```typescript
export const App: React.FC = () => {
  const searchUseCase = useContainer().resolve<MovieSearchUseCase>('MovieSearchUseCase');
  // React-specific logic
};
```

### Build Configuration
- **CLI**: TypeScript compilation to Node.js
- **Browser**: Webpack bundling for browser environment

## Alternatives Considered
- **Single Presentation Layer**: Simpler but limits user choice
- **Separate Applications**: Would duplicate business logic
- **Monolithic UI**: Less flexible for different use cases

## Related ADRs
- [ADR-001: Adopt Domain-Driven Design Architecture](./001-domain-driven-design.md)
- [ADR-006: Adopt Browser-Centric Naming Convention](./006-browser-environment-naming.md)

---

**Date:** 2025-07-09
**Author:** Development Team
**Reviewers:** Architecture Review
