# ADR-011: File Naming Convention - camelCase for TypeScript Files

## Status
**Accepted** - January 8, 2025

## Context
Consistent file naming conventions are crucial for maintainability and developer experience. Different conventions exist in the JavaScript/TypeScript ecosystem, including:
- **PascalCase**: `MyComponent.ts`, `UserService.ts`
- **camelCase**: `myComponent.ts`, `userService.ts`
- **kebab-case**: `my-component.ts`, `user-service.ts`
- **snake_case**: `my_component.ts`, `user_service.ts`

### Problems with Inconsistent Naming
- **Confusion**: Developers unsure which convention to use
- **Platform issues**: Case-sensitive vs case-insensitive file systems
- **Import inconsistencies**: Different import patterns across files
- **Tooling conflicts**: Some tools expect specific naming conventions

## Decision
We will use **camelCase** for all TypeScript files (`.ts`) with an exception for TSX files (`.tsx`) which represent React components and should use PascalCase.

### Naming Rules
- **TypeScript files (`.ts`)**: Use camelCase
- **TSX files (`.tsx`)**: Use PascalCase (exception for React components)
- **Index files**: Use lowercase `index.ts` or `index.tsx`
- **Config files**: Use camelCase for TypeScript configs, kebab-case for non-TS configs

### Examples
| ✅ Correct | ❌ Incorrect |
|-----------|-------------|
| `userService.ts` | `UserService.ts` |
| `movieRepository.ts` | `movie-repository.ts` |
| `searchController.ts` | `search_controller.ts` |
| `App.tsx` | `app.tsx` |
| `MovieCard.tsx` | `movie-card.tsx` |
| `index.ts` | `Index.ts` |

## Implementation
1. **Rename existing files** to follow camelCase convention
2. **Update imports** to reflect new file names
3. **Update documentation** and examples
4. **Add linting rule** to enforce convention

### Files to Rename
- Multiple TypeScript files from PascalCase to camelCase
- TSX files remain PascalCase (React component convention)

### Import Updates
All imports referencing renamed files must be updated accordingly.

## Consequences
### Positive
- **Consistency**: All TypeScript files follow the same convention
- **JavaScript familiarity**: camelCase aligns with JavaScript variable naming
- **Modern standards**: Many TypeScript projects use camelCase for files
- **Cross-platform**: Avoids case-sensitivity issues

### Negative
- **Migration effort**: Existing files need to be renamed
- **Git history**: File renames may affect git blame/history
- **Mixed conventions**: TSX files use different case than TS files

## Enforcement
- **Code reviews**: Reviewers should check file naming conventions
- **Documentation**: All examples use camelCase
- **Linting**: Consider adding ESLint rules for file naming
- **Templates**: Project templates use correct naming

## Rationale
camelCase for TypeScript files provides:
1. **Consistency** with JavaScript variable naming conventions
2. **Familiarity** for developers coming from JavaScript background
3. **Distinction** from class names (which use PascalCase)
4. **Alignment** with many modern TypeScript projects

This convention distinguishes between file names (camelCase) and the classes/components they contain (PascalCase), including rich domain entities, making the codebase more intuitive.
