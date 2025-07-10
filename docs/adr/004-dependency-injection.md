# ADR-004: Implement Dependency Injection Container

## Status
Accepted

## Context
With Clean Architecture and DDD, we need a way to manage dependencies and ensure proper inversion of control. The application has multiple layers that need to be loosely coupled while maintaining testability.

## Decision
We will implement a lightweight dependency injection container to manage object creation and lifecycle. The container will:

- Register interface-to-implementation mappings
- Resolve dependencies automatically
- Support singleton and transient lifetimes
- Enable easy testing through mock injection

## Consequences

### Positive Consequences
- **Loose Coupling**: Components depend on abstractions, not concretions
- **Testability**: Easy to inject mocks and test doubles
- **Flexibility**: Can swap implementations without changing consumers
- **Single Responsibility**: Each class focuses on its core responsibility
- **Configuration Centralization**: All dependency wiring in one place

### Negative Consequences
- **Complexity**: Additional abstraction layer
- **Runtime Overhead**: Slight performance cost for dependency resolution
- **Learning Curve**: Developers need to understand DI concepts

## Implementation
Custom dependency injection container:

```typescript
export class Container {
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  register<T>(name: string, factory: () => T, singleton = false): void {
    this.services.set(name, { factory, singleton });
  }

  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    if (service.singleton) {
      if (!this.singletons.has(name)) {
        this.singletons.set(name, service.factory());
      }
      return this.singletons.get(name);
    }

    return service.factory();
  }
}
```

Configuration setup:

```typescript
export class DIConfiguration {
  static getContainer(): Container {
    const container = new Container();
    
    // Register services
    container.register('ConfigService', () => new BrowserConfigService(), true);
    container.register('HttpClient', () => new HttpClient(
      container.resolve('ConfigService')
    ), true);
    
    return container;
  }
}
```

## Alternatives Considered
- **Manual Dependency Management**: Simple but becomes unwieldy as project grows
- **External DI Libraries** (InversifyJS, TSyringe): More features but additional dependency
- **Factory Pattern**: Less flexible and harder to test

## Related ADRs
- [ADR-002: Implement Clean Architecture Pattern](./002-clean-architecture.md)
- [ADR-005: Support Multiple Presentation Layers](./005-multiple-presentation-layers.md)

---

**Date:** 2025-07-09
**Author:** Development Team
**Reviewers:** Architecture Review
