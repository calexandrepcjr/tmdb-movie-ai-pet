# AI Prompt Engineering Guide

This guide provides specific prompting strategies and templates for effective AI-assisted development in the TMDB Movie Client project.

## 🎯 Overview

Effective prompting is crucial for getting high-quality, architecture-compliant code from AI tools. This guide provides tested prompts and strategies tailored to our project's specific needs.

## 📋 Table of Contents

1. [Fundamental Prompting Principles](#fundamental-prompting-principles)
2. [Context-Setting Templates](#context-setting-templates)
3. [Layer-Specific Prompts](#layer-specific-prompts)
4. [Code Generation Prompts](#code-generation-prompts)
5. [Review and Analysis Prompts](#review-and-analysis-prompts)
6. [Documentation Prompts](#documentation-prompts)
7. [Troubleshooting Prompts](#troubleshooting-prompts)

## 🏗️ Fundamental Prompting Principles

### 1. **Provide Rich Context**
Always include:
- Project architecture (DDD + Clean Architecture)
- TypeScript requirements
- Existing patterns and conventions
- Specific constraints and requirements

### 2. **Be Specific and Detailed**
- Specify exact requirements
- Include examples of desired output
- Define acceptance criteria
- Mention error handling requirements

### 3. **Reference Existing Patterns**
- Point to similar existing implementations
- Maintain consistency with project standards
- Follow established naming conventions

### 4. **🚫 ANTI-VIBE CODING PROMPTING**
**CRITICAL**: Never use vague or intuition-based prompts. All prompts must follow augmented coding principles.

#### ❌ Prohibited Vibe Prompts:
- "Make this better"
- "Fix this code"
- "Create something like this"
- "Implement a quick solution"
- "Generate code that works"

#### ✅ Required Augmented Prompts:
- "Analyze this code against [specific criteria] and propose improvements"
- "Refactor this code to follow [specific pattern] while maintaining [specific requirements]"
- "Create [specific component] following [existing pattern] with [explicit requirements]"
- "Design a solution for [specific problem] considering [architectural constraints]"
- "Generate code that implements [specific interface] with [validation requirements]"

#### Mandatory Prompt Elements:
1. **Context**: Specific project context and constraints
2. **Analysis**: Request for problem analysis before solution
3. **Standards**: Reference to existing patterns and standards
4. **Validation**: Criteria for evaluating the solution
5. **Documentation**: Request for explanation of decisions

## 🎯 Context-Setting Templates

### Base Project Context
```
Context: TMDB Movie Client - TypeScript Project
Architecture: Domain-Driven Design + Clean Architecture
Layers:
- Domain: Entities, Value Objects, Repository Interfaces
- Application: Use Cases, DTOs, Application Services
- Infrastructure: Repository Implementations, HTTP Clients, Configuration
- Presentation: CLI (Node.js) and Browser (React) interfaces

Key Patterns:
- Repository pattern for data access
- Use case pattern for business operations
- Dependency injection for loose coupling
- Interface segregation for testability

TypeScript Requirements:
- Strict type checking enabled
- Interfaces for all contracts (NO Hungarian notation - use descriptive names like ConfigurationService, not IConfigService)
- File naming must use PascalCase (e.g., UserService.ts, MovieRepository.ts)
- Proper error handling with custom exceptions
- JSDoc comments for public APIs
```

### Architecture-Specific Context
```
Clean Architecture Rules:
1. Dependencies point inward (Infrastructure → Application → Domain)
2. Domain layer has no external dependencies
3. Application layer depends only on domain interfaces
4. Infrastructure implements domain interfaces
5. Presentation depends on application use cases

Current Project Structure:
[Include relevant folder structure]
```

## 🏛️ Layer-Specific Prompts

### Domain Layer Prompts

#### Entity Creation
```
Create a domain entity following these requirements:
- Rich domain model with encapsulated business logic
- Proper validation in constructor
- Immutable properties where appropriate
- Business methods that maintain invariants
- No external dependencies
- TypeScript strict typing
- JSDoc comments

Example of existing entity: [reference Movie.ts or Person.ts]
Requirements: [specific entity requirements]
```

#### Value Object Creation
```
Create a value object that:
- Encapsulates a domain concept
- Is immutable
- Has proper validation
- Implements equality comparison
- Includes error handling for invalid values
- Follows existing value object patterns

Example: [reference existing value objects]
Requirements: [specific value object requirements]
```

#### Repository Interface
```
Create a repository interface that:
- Defines data access contract
- Uses domain entities and value objects
- Includes proper error handling
- Supports pagination where needed
- Follows existing repository patterns
- Has comprehensive JSDoc documentation

Existing pattern: [reference MovieRepository interface]
Requirements: [specific repository requirements]
```

### Application Layer Prompts

#### Use Case Creation
```
Create a use case that:
- Orchestrates domain operations
- Uses repository interfaces (not implementations)
- Returns appropriate DTOs
- Handles errors and validation
- Follows single responsibility principle
- Is easily testable with mocks

Pattern: [reference existing use cases]
Requirements: [specific use case requirements]
```

#### DTO Creation
```
Create DTOs that:
- Represent data transfer contracts
- Are separate from domain entities
- Include proper TypeScript types
- Have validation where needed
- Support serialization/deserialization
- Are documented with JSDoc

Existing pattern: [reference SearchRequestDto]
Requirements: [specific DTO requirements]
```

### Infrastructure Layer Prompts

#### Repository Implementation
```
Implement a repository that:
- Implements the domain repository interface
- Uses the HTTP client pattern
- Handles API errors and maps to domain exceptions
- Transforms external data to domain entities
- Includes proper logging and error handling
- Follows existing repository implementations

Pattern: [reference TmdbMovieRepository]
HTTP Client: [reference TmdbHttpClient usage]
Requirements: [specific implementation requirements]
```

#### HTTP Client Implementation
```
Create an HTTP client that:
- Follows the existing TmdbHttpClient pattern
- Handles authentication (query parameter API key)
- Includes proper error handling and retry logic
- Supports request/response transformation
- Has comprehensive logging
- Is fully typed with TypeScript

Existing pattern: [reference TmdbHttpClient]
Requirements: [specific HTTP client requirements]
```

#### Configuration Service
```
Create a configuration service that:
- Implements the ConfigurationService interface
- Handles environment-specific configuration
- Validates required configuration values
- Provides sensible defaults
- Includes proper error handling
- Follows existing configuration patterns

Pattern: [reference BrowserConfigService or ConfigService]
Environment: [CLI/Browser specific requirements]
Requirements: [specific configuration requirements]
```

### Presentation Layer Prompts

#### React Component Creation
```
Create a React component that:
- Uses TypeScript with proper typing
- Follows React functional component patterns
- Uses hooks for state management
- Handles loading and error states
- Includes proper accessibility
- Follows existing component patterns

Pattern: [reference existing components]
Requirements: [specific component requirements]
```

#### CLI Command Creation
```
Create a CLI command that:
- Uses the existing CLI application pattern
- Integrates with dependency injection
- Handles command line arguments
- Provides proper error messages
- Includes help documentation
- Follows existing CLI patterns

Pattern: [reference existing CLI commands]
Requirements: [specific CLI requirements]
```

## 🔧 Code Generation Prompts

### Complete Feature Implementation
```
Implement a complete feature following our architecture:

Feature: [describe the feature]

Requirements:
1. Domain Entity: [entity requirements]
2. Repository Interface: [interface requirements]
3. Repository Implementation: [implementation requirements]
4. Use Case: [use case requirements]
5. DTO: [DTO requirements]
6. Presentation: [UI/CLI requirements]

Please provide:
- All necessary TypeScript files
- Proper error handling
- JSDoc documentation
- Basic unit tests
- Integration with existing DI container

Follow existing patterns from: [reference similar feature]
```

### Augmented Code Generation Strategy
**MANDATORY**: All code generation must follow this structured approach:

#### Phase 1: Analysis and Planning
```
Before generating any code, please:
1. Analyze the problem domain and requirements
2. Identify existing patterns that apply
3. Determine architectural layer placement
4. Plan integration points with existing code
5. Identify potential risks and trade-offs

Problem: [Specific problem description]
Context: [Project context and constraints]
Requirements: [Explicit requirements list]
```

#### Phase 2: Design Validation
```
Based on the analysis, design the solution:
1. Define interfaces and contracts
2. Plan error handling strategy
3. Design testing approach
4. Validate against architectural principles
5. Document design decisions

Do not proceed to implementation without explicit approval of this design.
```

#### Phase 3: Implementation with Validation
```
Generate the implementation with:
1. Complete TypeScript types and interfaces
2. Comprehensive error handling
3. JSDoc documentation
4. Unit tests for all public methods
5. Integration tests where applicable

After generation, provide:
- Explanation of key design decisions
- Validation against architectural principles
- Testing strategy recommendations
- Potential improvement areas
```

### Refactoring Prompts
```
Refactor this code to better follow our architecture:

Current Code: [paste code]

Analysis Required:
1. Current architectural violations
2. Specific improvements needed
3. Impact on existing integrations
4. Testing requirements for changes
5. Migration strategy if needed

Improvements needed:
1. Better separation of concerns
2. Proper error handling
3. Type safety improvements
4. Testability enhancements
5. Documentation updates

Architecture rules: [reference specific rules]
Existing patterns: [reference patterns to follow]

DO NOT provide refactored code until the analysis is complete and approved.
```

## 🎯 Prompt Optimization Tips

### 1. **Iterate and Refine**
- Start with basic prompts
- Refine based on output quality
- Save successful prompts for reuse

### 2. **Use Specific Examples**
- Reference existing code patterns
- Provide concrete examples
- Show desired output format

### 3. **Break Down Complex Tasks**
- Split large tasks into smaller parts
- Use sequential prompts for complex features
- Build up complexity gradually

### 4. **Validate and Test**
- Always validate AI-generated code
- Test with existing systems
- Verify architectural compliance

### 5. **🚫 ANTI-VIBE CODING ENFORCEMENT**

#### Prompt Quality Checklist:
Before submitting any AI prompt, verify:
- [ ] **Specific Context**: Includes relevant project context
- [ ] **Clear Requirements**: Explicit, measurable requirements
- [ ] **Pattern Reference**: References existing patterns
- [ ] **Validation Criteria**: Defines success criteria
- [ ] **Analysis Request**: Asks for problem analysis first
- [ ] **No Vague Language**: Avoids "make it better" type requests

#### Red Flag Prompts (REJECT IMMEDIATELY):
- ❌ "Fix this quickly"
- ❌ "Make this work"
- ❌ "Create something similar"
- ❌ "Implement this feature" (without requirements)
- ❌ "Generate code for X" (without context)

#### Green Flag Prompts (APPROVED PATTERN):
- ✅ "Analyze [specific code] for [specific criteria] and propose improvements"
- ✅ "Design [specific solution] following [pattern] with [constraints]"
- ✅ "Refactor [code] to implement [interface] while maintaining [requirements]"
- ✅ "Create [component] that integrates with [existing system] using [pattern]"

#### Mandatory Prompt Review Process:
1. **Self-Review**: Check against quality checklist
2. **Context Validation**: Ensure sufficient project context
3. **Requirements Check**: Verify explicit requirements
4. **Pattern Alignment**: Confirm reference to existing patterns
5. **Success Criteria**: Define measurable success criteria

#### Escalation for Complex Prompts:
- If architectural impact unclear: **Request design review**
- If multiple solutions possible: **Request analysis of alternatives**
- If affects multiple layers: **Require architectural validation**
- If introduces new patterns: **Mandatory pattern documentation**
