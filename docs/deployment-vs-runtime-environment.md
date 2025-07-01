# Deployment vs Runtime Environment

This project uses two types of environments that serve different purposes:

**Deployment Environments** (SST stages):

- `dev` - Development deployment (`https://dev.yoursite.com`)
- `prod` - Production deployment (`https://yoursite.com`)

**Runtime Environments** (Node.js modes):

- `development` - Local development (`npm run dev`)
- `production` - Built application (`npm run build`)

## How They Work Together

When you run `sst deploy --stage dev`, SST:

1. Sets `DEPLOYMENT_ENV=dev` in your Next.js app
2. Runs `npm run build` (which sets `NODE_ENV=production`)
3. Deploys to your dev AWS infrastructure

When you run `./start-local-sso.sh`:

1. `DEPLOYMENT_ENV` defaults to `dev`
2. `NODE_ENV=development` for hot reloading
3. AWS credentials via SSO for local SES testing

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
