# Deployment vs runtime environment

We can have different deployment environments:

- `https://dev.foobar.com/`
- `https://uat.foobar.com/`
- `https://staging.foobar.com/`
- `https://foobar.com/`

In our case we just have `dev` and `prod` which we specify through the `stage` parameter when we invoke `sst deploy` (see [ci-cd-dev.yml](https://github.com/bojidaryovchev/nextjs-sst-starter/blob/main/.github/workflows/ci-cd-dev.yml) and [ci-cd-prod.yml](https://github.com/bojidaryovchev/nextjs-sst-starter/blob/main/.github/workflows/ci-cd-prod.yml))

We are then passing the `$app.stage` to our Next.js app through the `DEPLOYMENT_ENV` variable (see [sst.config.ts](https://github.com/bojidaryovchev/nextjs-sst-starter/blob/main/sst.config.ts))

The runtime environment is referenced by `NODE_ENV`:

- when we execute `npm run dev` the `NODE_ENV` is set to `development`
- when we execute `npm run build` the `NODE_ENV` is set to `production`

Whenever we invoke `sst deploy` it builds our app therefore its runtime environment will always be `production`

We have devised utils in `src/lib/env.utils.ts` to help us easily distinguish between them. These utilities help ensure consistency across the project when working with different environment types.

## Environment Utilities

The project includes helper functions in `src/lib/env.utils.ts`:

```typescript
// Runtime environment utilities (development vs production)
getRuntimeEnv(); // Returns current NODE_ENV
isRuntimeEnv("development"); // Check if running in development

// Deployment environment utilities (dev vs prod stage)
getDeploymentEnv(); // Returns current DEPLOYMENT_ENV (defaults to "dev")
isDeploymentEnv("prod"); // Check if deployed to production stage
```

**Example Usage:**

```typescript
import { getDeploymentEnv, getRuntimeEnv, isDeploymentEnv } from "@/lib/env.utils";

// Conditional logic based on deployment stage
if (isDeploymentEnv("prod")) {
  // Production-specific configuration
  enableAnalytics();
} else {
  // Development/staging configuration
  enableDebugMode();
}

// Get current environments
const stage = getDeploymentEnv(); // "dev" or "prod"
const runtime = getRuntimeEnv(); // "development" or "production"
```

**Key Points:**

- Use `DEPLOYMENT_ENV` to determine which stage/environment your code is running in (dev, prod, etc.)
- Use `NODE_ENV` to determine the runtime environment (development vs production)
- Always use the proper environment utilities to maintain consistency
