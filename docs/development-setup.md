# Development Setup Guide

This document explains the development tools and configuration choices made in this project.

> **🏗️ For AWS infrastructure details**, see [Architecture Overview](./architecture.md)

## Code Quality Tools

### ESLint Configuration

- **Version**: ESLint 9 with flat configuration
- **Rules**: Next.js recommended + TypeScript
- **Ignores**: `.next/**`, `.sst/**`
- **File**: `eslint.config.mjs`

### Prettier Configuration

- **Print Width**: 120 characters
- **Tab Width**: 2 spaces
- **End of Line**: LF (Unix style)
- **Plugins**:
  - `prettier-plugin-organize-imports`: Automatically sorts imports
  - `prettier-plugin-tailwindcss`: Sorts Tailwind classes

### Git Hooks with Husky

- **Pre-commit**: Runs `lint-staged` to format and lint only staged files
- **Setup**: Run `npm run prepare` to install hooks
- **Benefits**: Ensures consistent code quality before commits

### Lint-Staged Configuration

```json
{
  "*.{js,mjs,ts,tsx,css,md,json}": ["npm run lint-staged:prettier:write"],
  "*.{js,mjs,ts,tsx}": ["npm run lint-staged:eslint:fix"]
}
```

## UI Development

### shadcn/ui Setup

- **Style**: "new-york" - Clean, modern component styling
- **Base Color**: Stone - Neutral color palette
- **CSS Variables**: Enabled for dynamic theming
- **RSC**: React Server Components compatible
- **Icon Library**: Lucide React

### Component Organization

```
src/components/
├── ui/           # Base shadcn/ui components
└── [feature]/    # Feature-specific components
```

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

## Styling System

### Tailwind CSS v4

- **Configuration**: Inline theme in `globals.css`
- **Advantages**:
  - Faster builds
  - Better integration with CSS-in-JS
  - No separate config file needed
- **CSS Variables**: Used for dynamic theming

### Color System

- Semantic color names (`primary`, `secondary`, etc.)
- CSS variables for easy theme switching
- Dark mode support built-in

### Animation Library

- **tw-animate-css**: Extended animation utilities beyond Tailwind defaults
- **Usage**: Add animation classes directly to elements

## TypeScript Configuration

### Type Safety Features

- **Strict Mode**: Enabled for maximum type safety
- **Path Aliases**: `@/` points to `src/` directory
- **SST Types**: Auto-generated in `sst-env.d.ts`

### Import Organization

- Automatic import sorting via Prettier
- Consistent import order enforced

## Environment Management

### SST Environment Types

The `sst-env.d.ts` file provides TypeScript definitions for SST resources:

```typescript
import { Resource } from "sst";
// Resource.NextEmail.sender is fully typed!
```

### Environment Variables

- **Development**: Use `.env.local` (copy from `.env.example`)
- **Production**: Set via GitHub environment secrets
- **Types**: Consider adding environment variable validation

### Environment Utilities

The project includes environment utilities in `src/lib/env.utils.ts` for handling both runtime and deployment environments:

```typescript
// Runtime environment (development vs production)
getRuntimeEnv(); // Current NODE_ENV
isRuntimeEnv("development"); // Boolean check

// Deployment environment (dev vs prod stage)
getDeploymentEnv(); // Current DEPLOYMENT_ENV (defaults to "dev")
isDeploymentEnv("prod"); // Boolean check for production stage
```

**Use Cases:**

- Conditional feature flags based on deployment stage
- Environment-specific configuration
- Debug mode toggles
- Analytics enablement

> **📖 For detailed environment concepts**, see [deployment-vs-runtime-environment.md](./deployment-vs-runtime-environment.md)

## Browser Support

### Browserslist Configuration

Moved to `.browserslistrc` for better tool compatibility:

- Modern browsers with >1% market share
- Last 2 versions of each browser
- Excludes unmaintained browsers

### Build Targets

- **Next.js**: Handles browser targeting automatically
- **Tailwind**: Uses browserslist for CSS prefixing
- **Babel**: Respects browserslist for transpilation

## Scripts Overview

### Development

- `./start-local-sso.sh`: Start development server with AWS SSO authentication (recommended)
- `npm run dev`: Start development server with Turbopack (requires manual AWS setup)
- `npm run typecheck`: Type checking without emitting files

> **⚠️ Important**: Use `start-local-sso.sh` for proper AWS integration. Stop the script before running build commands or Prisma operations.

### Build & Deploy

- `npm run build`: Production build (stop SSO script first)
- `npm run start`: Start production server

### Quality Assurance

- `npm run lint`: Run ESLint on entire codebase
- `npm run lint-staged:*`: Format/fix staged files only

## Recommended Workflow

1. **Start Development**: `./start-local-sso.sh`
2. **Make Changes**: Edit files, auto-formatting on save
3. **Stop Script**: Press any key to stop the SSO script before building
4. **Build/Deploy**: Run build commands or push to trigger GitHub Actions
5. **Commit**: Git hooks run quality checks automatically

## Future Improvements

### Testing Setup

Consider adding:

- **Vitest**: Fast unit testing
- **Testing Library**: Component testing
- **Playwright**: E2E testing

### Additional Tools

- **Storybook**: Component development
- **Bundle Analyzer**: Build size monitoring
- **Commitlint**: Conventional commit messages

### Performance Monitoring

- **Lighthouse CI**: Automated performance testing
- **Bundle Analysis**: Track bundle size changes
- **Core Web Vitals**: Monitor real user metrics
