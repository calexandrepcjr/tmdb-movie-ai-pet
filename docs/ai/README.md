# AI-Assisted Development Guidelines

This document outlines best practices for AI-assisted development in the TMDB Movie Client project, including effective prompting strategies, code review practices, and integration patterns.

## 🎯 Overview

AI tools (GitHub Copilot, ChatGPT, Claude, etc.) are valuable development assistants that can enhance productivity while maintaining code quality. These guidelines ensure consistent and effective AI usage across the project.

## 📋 Table of Contents

1. [AI Integration Principles](#ai-integration-principles)
2. [Effective Prompting Strategies](#effective-prompting-strategies)
3. [Code Generation Best Practices](#code-generation-best-practices)
4. [Review and Validation Process](#review-and-validation-process)
5. [Architecture-Aware Prompting](#architecture-aware-prompting)
6. [Testing with AI](#testing-with-ai)
7. [Documentation with AI](#documentation-with-ai)
8. [Common Pitfalls](#common-pitfalls)

## 🏗️ AI Integration Principles

### 1. **AI as Assistant, Not Replacement**
- AI should augment developer capabilities, not replace critical thinking
- Always review and understand AI-generated code
- Maintain architectural consistency and project standards

### 2. **Context-Aware Development**
- Provide relevant project context to AI tools
- Reference existing patterns and conventions
- Align AI suggestions with project architecture

### 3. **Incremental Enhancement**
- Use AI for specific tasks rather than complete features
- Build upon AI suggestions with domain knowledge
- Iterate and refine AI-generated solutions

### 4. **🚫 STRICT NO-VIBE CODING POLICY**
**Vibe coding** (coding based on intuition without proper analysis) is strictly prohibited. All development must follow an **augmented coding strategy**.

#### What is Vibe Coding (PROHIBITED):
- Writing code based on "gut feeling" or intuition
- Making architectural decisions without proper analysis
- Copying code patterns without understanding their purpose
- Implementing solutions without considering trade-offs
- Using AI suggestions without validation and testing

#### Augmented Coding Strategy (REQUIRED):
1. **Analyze First**: Understand the problem domain and requirements
2. **Research Patterns**: Study existing code patterns and architectural decisions
3. **Plan Structure**: Design the solution following established principles
4. **Validate Approach**: Review against architecture and business requirements
5. **Implement Incrementally**: Build with proper testing and validation
6. **Document Decisions**: Record rationale for future reference

#### Enforcement Guidelines:
- ❌ **Never accept AI code without understanding its purpose**
- ❌ **Never implement without considering architectural impact**
- ❌ **Never skip validation steps for "quick fixes"**
- ✅ **Always validate AI suggestions against project standards**
- ✅ **Always test and document implementation decisions**
- ✅ **Always consider long-term maintainability**

## 💡 Effective Prompting Strategies

### Domain-Driven Design Context
```
Context: This is a TypeScript project using Domain-Driven Design with Clean Architecture.
The project has these layers:
- Domain: entities, value objects, repository interfaces
- Application: use cases, DTOs
- Infrastructure: repository implementations, HTTP clients
- Presentation: CLI and browser interfaces

Task: [Specific request]
Requirements: [Specific constraints]
```

### Augmented Coding Approach
**CRITICAL**: All AI interactions must follow the augmented coding strategy:

#### 1. **Analysis-First Prompting**
```
Before generating code, help me analyze:
1. Problem domain and business requirements
2. Existing architectural patterns that apply
3. Potential impact on current system design
4. Trade-offs and alternative approaches
5. Testing and validation requirements

Context: [Provide specific context]
Problem: [Describe the specific problem]
```

#### 2. **Pattern-Based Prompting**
```
Generate code following these established patterns:
- Existing pattern: [Reference specific existing code]
- Architecture layer: [Specify which layer]
- Design principles: [List relevant principles]
- Integration points: [Specify dependencies]
- Validation requirements: [List what needs validation]

DO NOT generate code that:
- Violates architectural boundaries
- Introduces new patterns without justification
- Skips error handling or validation
- Lacks proper TypeScript typing
```

#### 3. **Validation-Driven Prompting**
```
After generating the code, provide:
1. Explanation of design decisions made
2. How it fits into existing architecture
3. Potential risks or trade-offs
4. Testing strategy recommendations
5. Documentation requirements

Code: [Generated code]
Validate against: [List specific criteria]
```

### Architecture-Specific Prompts
```
I need to implement a new feature following our existing patterns:
- Repository pattern for data access
- Use case pattern for business logic
- Dependency injection for loose coupling
- TypeScript interfaces for contracts

Example: Create a new TvShowRepository following the MovieRepository pattern.
```

### Code Review Prompts
```
Please review this code for:
1. Adherence to Clean Architecture principles
2. TypeScript best practices
3. Error handling patterns
4. Testing considerations
5. Performance implications

Code: [paste code here]
```

## 🔧 Code Generation Best Practices

### 1. **Start with Interfaces**
- Generate interfaces before implementations
- Ensure type safety and contracts
- Follow existing interface patterns

### 2. **Follow Existing Patterns**
- Reference existing similar implementations
- Maintain consistency with project conventions
- Use established error handling patterns

### 3. **Include Proper Error Handling**
```typescript
// Good AI prompt
Generate a repository method that:
- Follows the existing error handling pattern
- Throws domain-specific exceptions
- Includes proper TypeScript types
- Has JSDoc comments
```

### 4. **Generate Complete Units**
- Generate complete methods/classes, not fragments
- Include necessary imports
- Add appropriate tests

## ✅ Review and Validation Process

### AI-Generated Code Checklist
- [ ] **Architecture Compliance**: Follows DDD and Clean Architecture
- [ ] **Type Safety**: Proper TypeScript usage
- [ ] **Error Handling**: Consistent error patterns
- [ ] **Testing**: Testable design and test coverage
- [ ] **Documentation**: Clear comments and documentation
- [ ] **Performance**: No obvious performance issues
- [ ] **Security**: No security vulnerabilities

### Validation Steps
1. **Static Analysis**: Run TypeScript compiler and linters
2. **Unit Tests**: Generate and run comprehensive tests
3. **Integration Tests**: Test with existing components
4. **Architecture Review**: Ensure architectural consistency
5. **Performance Check**: Verify performance implications

## 🏛️ Architecture-Aware Prompting

### Domain Layer Prompts
```
Create a domain entity that:
- Has proper encapsulation
- Includes business logic validation
- Uses value objects for complex types
- Follows the existing entity patterns
```

### Application Layer Prompts
```
Generate a use case that:
- Orchestrates domain operations
- Uses repository interfaces
- Returns proper DTOs
- Handles errors appropriately
```

### Infrastructure Layer Prompts
```
Implement a repository that:
- Implements the domain interface
- Uses the HTTP client pattern
- Handles API errors properly
- Maps external data to domain entities
```

## 🧪 Testing with AI

### Test Generation Strategy
```
Generate comprehensive tests for this [component/service/use case]:
- Unit tests for all public methods
- Mock external dependencies
- Test both success and error scenarios
- Follow existing test patterns
- Use TypeScript test utilities
```

### Test Coverage Areas
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **Contract Tests**: Interface compliance testing
- **Error Scenario Tests**: Error handling validation

## 📚 Documentation with AI

### Documentation Generation
```
Generate documentation for this component that includes:
- Purpose and responsibility
- Usage examples
- Interface documentation
- Configuration options
- Error scenarios
```

### ADR Generation
```
Create an ADR for this architectural decision:
- Context: [background and problem]
- Decision: [what we decided]
- Consequences: [benefits and trade-offs]
- Alternatives: [other options considered]
```

## ⚠️ Common Pitfalls

### 1. **Over-Reliance on AI**
- Don't accept AI suggestions without understanding
- Validate architectural decisions independently
- Maintain human oversight for critical decisions

### 2. **Context Loss**
- Provide sufficient project context
- Reference existing patterns and conventions
- Ensure AI understands project constraints

### 3. **Inconsistent Patterns**
- Review AI code for pattern consistency
- Align with existing project standards
- Don't mix different architectural approaches

### 4. **Incomplete Error Handling**
- Ensure AI-generated code handles errors properly
- Follow project error handling patterns
- Test error scenarios thoroughly

### 5. **Missing Type Safety**
- Verify TypeScript types are correct
- Ensure proper interface usage
- Check for type safety violations

### 6. **🚨 VIBE CODING VIOLATIONS (CRITICAL)**
These are serious violations that must be avoided:

#### Red Flags - Stop Immediately:
- ❌ **"This looks right"** without analysis
- ❌ **"Let's try this approach"** without validation
- ❌ **"I'll fix it later"** for architectural decisions
- ❌ **"It works on my machine"** without testing
- ❌ **"Quick and dirty solution"** for production code

#### Mandatory Prevention Steps:
1. **Pause and Analyze**: Before writing any code, understand the problem
2. **Research First**: Check existing patterns and architectural decisions
3. **Plan the Solution**: Design before implementing
4. **Validate Early**: Test assumptions and architectural fit
5. **Document Rationale**: Record why decisions were made

#### Escalation Process:
- If unsure about architectural impact: **Stop and consult documentation**
- If tempted to skip validation: **Mandatory pause and review**
- If considering "quick fix": **Requires architectural review**
- If AI suggests unfamiliar patterns: **Research and validate first**

#### Code Review Enforcement:
- All pull requests must include **design rationale**
- Reviewers must verify **architectural compliance**
- Any "vibe coding" patterns result in **immediate rejection**
- Documentation must explain **why**, not just **what**

## 🎯 AI Tool Recommendations

### GitHub Copilot
- Excellent for code completion and pattern following
- Good at maintaining consistency within files
- Best for incremental development

### ChatGPT/Claude
- Great for architectural discussions
- Excellent for documentation generation
- Good for code review and refactoring

### AI-Powered Code Review Tools
- Use for automated code quality checks
- Supplement human code reviews
- Identify potential issues early

## 🔄 Continuous Improvement

### Regular Review Process
1. **Monthly AI Usage Review**: Assess AI tool effectiveness
2. **Pattern Updates**: Update guidelines based on new learnings
3. **Tool Evaluation**: Evaluate new AI tools and techniques
4. **Team Training**: Share best practices and lessons learned

### Feedback Integration
- Collect feedback on AI-generated code quality
- Identify common issues and improvements
- Update guidelines based on team experience
- Share successful prompting strategies

---

*For more specific guidance, see:*
- [Prompt Engineering Guide](./prompt-engineering.md)
- [Code Review Guidelines](./code-review.md)
- [Architecture Documentation](../architecture/README.md)

*Last Updated: July 8, 2025*
