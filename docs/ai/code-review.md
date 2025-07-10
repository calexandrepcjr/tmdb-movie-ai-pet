# AI-Assisted Code Review Guidelines

This document provides specific guidelines for using AI tools in the code review process, ensuring consistent quality and architectural compliance.

## 🎯 Overview

AI tools can significantly enhance the code review process by providing automated checks, pattern recognition, and comprehensive analysis. These guidelines ensure effective AI integration in code reviews.

## 📋 Review Process

### 1. **Pre-Review AI Analysis**
Before human review, run AI analysis on:
- Code quality and best practices
- Architecture compliance
- Security vulnerabilities
- Performance implications
- Test coverage

### 2. **🚫 ANTI-VIBE CODING REVIEW ENFORCEMENT**

#### MANDATORY: Vibe Coding Detection
Every code review must actively screen for vibe coding violations:

##### Vibe Coding Red Flags:
- ❌ **No design rationale** in PR description
- ❌ **"Quick fix" or "temporary solution"** language
- ❌ **Copy-paste patterns** without understanding
- ❌ **Missing error handling** with "it works" justification
- ❌ **Architectural violations** justified by "it's faster"
- ❌ **No tests** because "it's simple"
- ❌ **Magic numbers or hardcoded values** without explanation

##### Mandatory Review Questions:
1. **Why was this approach chosen?** (Must have clear rationale)
2. **What alternatives were considered?** (Must show analysis)
3. **How does this fit the architecture?** (Must demonstrate alignment)
4. **What are the trade-offs?** (Must show understanding)
5. **How is this tested?** (Must have validation strategy)

#### IMMEDIATE REJECTION Criteria:
- **No design explanation** in PR description
- **Violates architectural boundaries** without justification
- **Introduces new patterns** without documentation
- **Skips established validation** processes
- **Uses "it works" as justification** for design choices

### 3. **AI-Assisted Review Checklist**

#### Architecture Compliance
```
AI Prompt: "Review this code for Clean Architecture compliance:
- Does it respect layer boundaries?
- Are dependencies pointing in the right direction?
- Is the separation of concerns maintained?
- Are interfaces used appropriately?
- Are there any vibe coding patterns (quick fixes, missing analysis)?

CRITICAL: Flag any code that appears to be written without proper analysis or architectural consideration."
```

#### TypeScript Best Practices
```
AI Prompt: "Analyze this TypeScript code for:
- Type safety violations
- Proper use of interfaces and types
- Generic usage patterns
- Error handling consistency
- Interface naming conventions (NO Hungarian notation - interfaces should use descriptive, abstract names without I- prefix)
- File naming conventions (ALL TypeScript files must use PascalCase)

CRITICAL: Reject any Hungarian notation (I-prefixed interfaces). Examples:
❌ IConfigService → ✅ ConfigurationService
❌ IRepository → ✅ DataRepository
❌ IAuthProvider → ✅ AuthenticationProvider

CRITICAL: Reject incorrect file naming. Examples:
❌ UserService.ts → ✅ userService.ts
❌ MovieRepository.ts → ✅ movieRepository.ts
❌ searchController.ts → ✅ searchController.ts
✅ App.tsx (React components use PascalCase)
✅ MovieCard.tsx (React components use PascalCase)"
```

#### Domain-Driven Design
```
AI Prompt: "Review this code for DDD principles:
- Are domain concepts properly modeled?
- Is business logic in the right layer?
- Are value objects used appropriately?
- Is the ubiquitous language maintained?"
```

## 🔍 Specific Review Areas

### Domain Layer Review
```
AI Analysis Prompt:
"Review this domain entity/value object/service:
1. Business logic encapsulation
2. Invariant enforcement
3. Pure domain concepts
4. No infrastructure dependencies
5. Proper error handling with domain exceptions"

Code: [paste domain code]
```

### Application Layer Review
```
AI Analysis Prompt:
"Review this use case/application service:
1. Orchestration vs business logic
2. Repository interface usage
3. DTO mapping
4. Transaction boundaries
5. Error handling and propagation"

Code: [paste application code]
```

### Infrastructure Layer Review
```
AI Analysis Prompt:
"Review this infrastructure implementation:
1. Interface implementation correctness
2. External dependency handling
3. Error translation to domain exceptions
4. Resource management
5. Configuration usage"

Code: [paste infrastructure code]
```

### Presentation Layer Review
```
AI Analysis Prompt:
"Review this presentation layer code:
1. Separation from business logic
2. Input validation
3. Output formatting
4. Error presentation
5. User experience considerations"

Code: [paste presentation code]
```

## 🧪 Testing Review

### Test Quality Assessment
```
AI Prompt: "Review these tests for:
1. Comprehensive coverage of scenarios
2. Proper mocking of dependencies
3. Clear test structure (AAA pattern)
4. Edge case coverage
5. Test maintainability"

Test Code: [paste test code]
```

### Test Strategy Validation
```
AI Prompt: "Analyze the testing strategy:
1. Unit vs integration test balance
2. Test doubles usage
3. Test data management
4. Performance test considerations
5. Test documentation"
```

## 🔒 Security Review

### Security Analysis
```
AI Prompt: "Perform security analysis:
1. Input validation
2. Authentication/authorization
3. Data exposure risks
4. API security
5. Environment variable handling"

Code: [paste code for security review]
```

### API Security Review
```
AI Prompt: "Review API security:
1. Authentication implementation
2. Rate limiting considerations
3. Input sanitization
4. Error message information leakage
5. CORS configuration"
```

## 📊 Performance Review

### Performance Analysis
```
AI Prompt: "Analyze performance implications:
1. Algorithmic complexity
2. Memory usage patterns
3. Network request optimization
4. Caching opportunities
5. Resource cleanup"

Code: [paste performance-critical code]
```

### Scalability Review
```
AI Prompt: "Review scalability considerations:
1. Concurrent access patterns
2. Resource sharing
3. State management
4. Database query efficiency
5. Memory leak potential"
```

## 📝 Documentation Review

### Code Documentation
```
AI Prompt: "Review code documentation:
1. JSDoc completeness and accuracy
2. Interface documentation
3. Usage examples
4. Error scenarios
5. Configuration options"
```

### API Documentation
```
AI Prompt: "Review API documentation:
1. Endpoint descriptions
2. Request/response examples
3. Error codes and messages
4. Authentication requirements
5. Rate limiting information"
```

## 🔧 Code Quality Metrics

### Maintainability Metrics
- **Cyclomatic Complexity**: Aim for < 10 per method
- **Method Length**: Keep methods under 20 lines
- **Class Size**: Limit to single responsibility
- **Coupling**: Minimize dependencies between components

### AI-Driven Quality Analysis
```
AI Prompt: "Analyze code quality metrics:
1. Cyclomatic complexity
2. Method and class sizes
3. Coupling between components
4. Code duplication
5. Technical debt indicators"
```

## 🚨 Common Issues to Check

### Architecture Violations
- Domain logic in presentation layer
- Infrastructure dependencies in domain
- Circular dependencies
- Inappropriate layer communication

### TypeScript Issues
- `any` type usage
- Missing null checks
- Incorrect generic constraints
- Interface segregation violations

### Error Handling Issues
- Unhandled exceptions
- Inconsistent error types
- Missing error context
- Poor error messages

### Performance Issues
- Inefficient algorithms
- Memory leaks
- Excessive API calls
- Blocking operations

## 📈 Review Metrics

### AI Review Effectiveness
Track these metrics to improve AI-assisted reviews:
- **Issue Detection Rate**: % of issues found by AI
- **False Positive Rate**: % of incorrect AI suggestions
- **Review Time Reduction**: Time saved using AI
- **Quality Improvement**: Defect reduction in production

### Continuous Improvement
```
Monthly AI Review Assessment:
1. Analyze AI suggestion accuracy
2. Update prompts based on missed issues
3. Refine review criteria
4. Train team on new AI capabilities
```

## 🎯 Best Practices

### 1. **Combine AI with Human Review**
- Use AI for initial analysis
- Human reviewers focus on high-level concerns
- AI handles repetitive pattern checking

### 2. **Maintain Review Context**
- Provide architectural context to AI
- Reference existing patterns
- Include project constraints

### 3. **Document AI Insights**
- Save effective prompts
- Document common issues found
- Share successful review patterns

### 4. **Regular Prompt Updates**
- Update prompts based on project evolution
- Incorporate new patterns and standards
- Refine based on team feedback

## 📋 Code Review Checklist

### TypeScript Specific
- [ ] No `any` types used
- [ ] Proper interface definitions
- [ ] Correct generic usage
- [ ] Proper error handling
- [ ] Type guards where needed
- [ ] Immutable data structures

### Architecture Specific
- [ ] Correct layer placement
- [ ] Proper dependency direction
- [ ] Interface segregation
- [ ] Single responsibility
- [ ] Dependency injection usage

### Quality Checks
- [ ] Comprehensive JSDoc comments
- [ ] Unit tests for all public methods
- [ ] Error scenarios tested
- [ ] Performance considerations
- [ ] Security implications reviewed

### 🚫 ANTI-VIBE CODING ENFORCEMENT CHECKLIST

#### MANDATORY PRE-REVIEW CHECKS:
- [ ] **Design Rationale**: PR includes clear explanation of design decisions
- [ ] **Architecture Alignment**: Code follows established architectural patterns
- [ ] **Pattern Consistency**: No new patterns introduced without documentation
- [ ] **Validation Strategy**: Includes comprehensive testing approach
- [ ] **Error Handling**: Proper error handling following project patterns
- [ ] **Documentation**: JSDoc comments explain WHY, not just WHAT

#### CRITICAL REJECTION CRITERIA:
- [ ] ❌ **No design explanation** provided
- [ ] ❌ **Violates Clean Architecture** principles
- [ ] ❌ **"Quick fix" language** in description
- [ ] ❌ **Missing tests** for new functionality
- [ ] ❌ **Hardcoded values** without explanation
- [ ] ❌ **Copy-paste code** without understanding
- [ ] ❌ **Architectural violations** without justification

#### MANDATORY REVIEWER ACTIONS:
1. **Question Design Decisions**: Ask "why" for all architectural choices
2. **Validate Patterns**: Ensure consistency with existing code
3. **Check Analysis**: Verify proper problem analysis was done
4. **Test Strategy**: Confirm comprehensive testing approach
5. **Documentation Review**: Ensure decisions are documented

#### ESCALATION TRIGGERS:
- **Complex architectural changes**: Require architecture review
- **New patterns introduced**: Require pattern documentation
- **Multiple layer impacts**: Require cross-layer validation
- **Performance implications**: Require performance analysis
- **Security concerns**: Require security review

#### REVIEWER RESPONSIBILITIES:
- **Reject vibe coding**: Immediately reject any code showing vibe coding patterns
- **Enforce standards**: Ensure all code follows established guidelines
- **Validate analysis**: Confirm proper problem analysis was performed
- **Document decisions**: Ensure all architectural decisions are documented
- **Maintain quality**: Uphold augmented coding standards consistently
