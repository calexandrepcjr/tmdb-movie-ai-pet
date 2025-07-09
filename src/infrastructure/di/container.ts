/**
 * Dependency Injection Container
 * Implements IoC pattern with proper singleton and factory management
 */

export interface ServiceConstructor<T = any> {
  new (...args: any[]): T;
}

export interface ServiceFactory<T = any> {
  (...args: any[]): T;
}

export interface ServiceDefinition<T = any> {
  factory?: ServiceFactory<T>;
  constructor?: ServiceConstructor<T>;
  dependencies?: string[];
  singleton?: boolean;
  instance?: T;
}

export class Container {
  private services = new Map<string, ServiceDefinition>();
  private instances = new Map<string, any>();

  /**
   * Register a service with the container
   */
  register<T>(
    name: string,
    definition: ServiceDefinition<T>
  ): void {
    this.services.set(name, definition);
  }

  /**
   * Register a singleton service
   */
  singleton<T>(
    name: string,
    constructorOrFactory: ServiceConstructor<T> | ServiceFactory<T>,
    dependencies: string[] = []
  ): void {
    this.register(name, {
      constructor: typeof constructorOrFactory === 'function' && constructorOrFactory.prototype 
        ? constructorOrFactory as ServiceConstructor<T>
        : undefined,
      factory: typeof constructorOrFactory === 'function' && !constructorOrFactory.prototype
        ? constructorOrFactory as ServiceFactory<T>
        : undefined,
      dependencies,
      singleton: true
    });
  }

  /**
   * Register a transient service
   */
  transient<T>(
    name: string,
    constructorOrFactory: ServiceConstructor<T> | ServiceFactory<T>,
    dependencies: string[] = []
  ): void {
    this.register(name, {
      constructor: typeof constructorOrFactory === 'function' && constructorOrFactory.prototype 
        ? constructorOrFactory as ServiceConstructor<T>
        : undefined,
      factory: typeof constructorOrFactory === 'function' && !constructorOrFactory.prototype
        ? constructorOrFactory as ServiceFactory<T>
        : undefined,
      dependencies,
      singleton: false
    });
  }

  /**
   * Register an instance directly
   */
  instance<T>(name: string, instance: T): void {
    this.services.set(name, {
      instance,
      singleton: true
    } as ServiceDefinition<T>);
  }

  /**
   * Resolve a service from the container
   */
  resolve<T>(name: string): T {
    const definition = this.services.get(name);
    
    if (!definition) {
      throw new Error(`Service '${name}' is not registered`);
    }

    // Return existing instance if it's a singleton
    if (definition.singleton && this.instances.has(name)) {
      return this.instances.get(name);
    }

    // Return direct instance if provided
    if (definition.instance) {
      return definition.instance;
    }

    // Resolve dependencies
    const dependencies = (definition.dependencies || []).map(dep => this.resolve(dep));

    let instance: T;

    // Create instance using factory
    if (definition.factory) {
      instance = definition.factory(...dependencies);
    }
    // Create instance using constructor
    else if (definition.constructor) {
      instance = new definition.constructor(...dependencies);
    }
    else {
      throw new Error(`Service '${name}' has no factory or constructor`);
    }

    // Store instance if singleton
    if (definition.singleton) {
      this.instances.set(name, instance);
    }

    return instance;
  }

  /**
   * Check if a service is registered
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * Clear all services and instances
   */
  clear(): void {
    this.services.clear();
    this.instances.clear();
  }
}

// Global container instance
export const container = new Container();
