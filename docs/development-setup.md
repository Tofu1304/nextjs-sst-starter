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
- **SST Types**: Defined in `src/typings/sst-env.d.ts` (manually maintained)

### Import Organization

- Automatic import sorting via Prettier
- Consistent import order enforced

## Environment Management

### SST Environment Types

The `src/typings/sst-env.d.ts` file provides TypeScript definitions for SST resources and is **manually maintained** for type safety:

```typescript
// src/typings/sst-env.d.ts - manually maintained for type safety
import "sst";
export {};
declare module "sst" {
  export interface Resource {
    NextEmail: {
      type: "sst.aws.Email";
      sender: string;
    };
    SupportEmail: {
      type: "sst.aws.Email";
      sender: string;
    };
  }
}
```

**Key Points**:

- ✅ **Manually maintained**: You update this file when adding new SST resources
- ✅ **Type-safe**: Provides full TypeScript support for `Resource` object
- ✅ **Custom definitions**: Define exactly what properties each resource exposes
- ⚠️ **Keep in sync**: Update when you add/remove resources in `sst.config.ts`

**Usage in Your Code**:

```typescript
import { Resource } from "sst";

// Type-safe access to your SES email resources
const supportEmail = Resource.SupportEmail.sender; // "contact@yourcompany.com"
const nextEmail = Resource.NextEmail.sender;
```

**Adding New Resources**:

When you add new resources to `sst.config.ts`, update the type definitions:

```typescript
// 1. Add resource to sst.config.ts
const database = new sst.aws.Postgres("Database", { ... });

// 2. Update src/typings/sst-env.d.ts
declare module "sst" {
  export interface Resource {
    // ...existing resources...
    Database: {
      type: "sst.aws.Postgres";
      connectionString: string;
    };
  }
}
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

## Developer Tools & IDE Setup

### VS Code Snippets

The project includes custom VS Code snippets in `.vscode/component.code-snippets`:

**React Component Snippet:**

- **Trigger**: `r-component`
- **Description**: Creates a React component with the file name as the component name
- **Usage**: Type `r-component` in a new `.tsx` file and press Tab

```typescript
// Generated snippet example (for file named "MyComponent.tsx"):
import React from 'react';

const MyComponent: React.FC = () => {
  return <></>;
};

export default MyComponent;
```

**Benefits:**

- Consistent component structure across the project
- Automatic component naming based on file name
- Proper TypeScript typing with React.FC
- Saves time with boilerplate code generation

**How to Use:**

1. Create a new `.tsx` file with your desired component name
2. Type `r-component`
3. Press Tab to expand the snippet
4. The cursor will be positioned inside the return statement

> **💡 Tip**: You can extend the snippets file with additional patterns like hooks, API routes, or page components.

## Toast Notifications

**React Hot Toast Integration:**

- **Library**: `react-hot-toast` for user feedback
- **Configuration**: Centralized in `src/constants.tsx`
- **Duration**: 6 seconds (6000ms) by default
- **Styling**: Consistent with application theme

**Global Setup:**

```typescript
// In src/app/layout.tsx
<Toaster
  toastOptions={{
    style: {
      fontSize: "0.875rem",
    },
    duration: TOASTER_DURATION_MS, // 6000ms
  }}
/>
```

**Usage Examples:**

```typescript
import toast from "react-hot-toast";

// Success notification
toast.success("Contact form submitted successfully!");

// Error notification
toast.error("An error occurred while sending the message.");

// Loading notification
const loadingToast = toast.loading("Sending message...");
toast.dismiss(loadingToast);
```

**Configuration:**

- **Duration**: Customizable via `TOASTER_DURATION_MS` constant
- **Positioning**: Default positioning (top-center)
- **Styling**: Integrated with application design system

### Lambda Warming Script

**Problem**: SST's default 5-minute warming interval is too long - Lambdas don't stay warm for the full duration, causing cold starts.

**Solution**: Custom `warmer.js` script with 1-minute intervals (optimal duration found through testing, see [SST issue #5534](https://github.com/sst/sst/issues/5534)):

```javascript
// warmer.js - Optimized 1-minute warming strategy
const URL_TO_VISIT = "https://yourdomain.com";
const CONCURRENT_VISITS = 100;

// Keep Lambdas warm every 1 minute (optimal interval)
setInterval(runConcurrentVisits, 60 * 1000);
```

**Why 1 minute works better**:

- Lambdas stay consistently warm without cold starts
- More reliable than SST's default 5-minute interval
- Prevents the Lambda execution context from being destroyed

**Configuration Steps**:

1. **Update URL**: Change `URL_TO_VISIT` to your deployed domain
2. **Run script**: `node warmer.js`
3. **Monitor**: Watch console output for consistent response times

**Benefits**:

- Eliminates cold starts during active periods
- More predictable performance than default warming
- Cost-effective compared to provisioned concurrency

**Usage Notes**:

- Run during business hours or peak traffic periods
- Stop script when not needed to avoid unnecessary costs
- Monitor CloudWatch costs to ensure optimization
