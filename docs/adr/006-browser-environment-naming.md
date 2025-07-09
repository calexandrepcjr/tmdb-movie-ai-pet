# ADR-006: Adopt Browser-Centric Naming Convention

## Status
Accepted (Updated - See revision below)

## Revision (2025-07-08)
After implementation, we identified that having separate environment files (.env.browser vs .env) for the same system was unnecessarily complex. The project now uses a unified `.env` file with standard variable names (`TMDB_API_KEY`, `TMDB_BASE_URL`, etc.) that work for both CLI and browser interfaces. Webpack DefinePlugin injects these variables into the browser build, maintaining environment separation while simplifying configuration.

## Context
The original project used "react" in naming conventions (e.g., `.env.react`, `REACT_APP_*` variables, `dist-react` folder). However, the web interface is not specifically tied to React as a framework but rather to the browser environment. The naming should reflect the environment rather than the specific framework.

## Decision
We will adopt browser-centric naming conventions throughout the project:

- **Environment Files**: `.env.browser` instead of `.env.react`
- **Environment Variables**: `BROWSER_APP_*` prefix instead of `REACT_APP_*`
- **Build Output**: `dist-browser` instead of `dist-react`
- **NPM Scripts**: `start:browser`, `build:browser` instead of `start:react`, `build:react`
- **Documentation**: Reference "browser" interface instead of "React" interface

## Consequences

### Positive Consequences
- **Framework Agnostic**: Naming doesn't tie us to React specifically
- **Clear Environment Context**: Clearly indicates browser vs. CLI environment
- **Future Flexibility**: Easier to migrate to other frameworks if needed
- **Consistent Naming**: All browser-related assets use consistent naming
- **Better Documentation**: Users understand it's about browser environment

### Negative Consequences
- **Migration Effort**: Required updating all existing references
- **Potential Confusion**: Developers familiar with React conventions might be confused initially
- **Documentation Updates**: All existing documentation needed updates

## Implementation
Key changes implemented:

### Environment Configuration
```bash
# Before
REACT_APP_TMDB_API_KEY=your-key-here

# After
BROWSER_APP_TMDB_API_KEY=your-key-here
```

### Build Configuration
```javascript
// webpack.config.js
require('dotenv').config({ path: './.env.browser' });

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist-browser'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER_APP_TMDB_API_KEY': JSON.stringify(process.env.BROWSER_APP_TMDB_API_KEY),
    }),
  ],
};
```

### Package.json Scripts
```json
{
  "scripts": {
    "start:browser": "webpack serve --config webpack.config.js --mode development",
    "build:browser": "webpack --config webpack.config.js --mode production"
  }
}
```

### Configuration Service
```typescript
export class BrowserConfigService implements ConfigurationService {
  private loadConfig(): TmdbConfig {
    const apiKey = process.env.BROWSER_APP_TMDB_API_KEY;
    // ... configuration loading
  }
}
```

## Alternatives Considered
- **Keep React Naming**: Simpler but ties us to React framework
- **Use Web Naming**: Less specific about environment
- **Use Client Naming**: Could be confused with CLI client

## Related ADRs
- [ADR-005: Support Multiple Presentation Layers](./005-multiple-presentation-layers.md)
- [ADR-008: Use Webpack for Browser Build System](./008-webpack-build-system.md)

---

**Date:** 2025-07-08
**Author:** Development Team
**Reviewers:** Architecture Review
