# Next.js SST Starter

A modern Next.js application starter with serverless AWS infrastructure using SST (Serverless Stack).

## Features

- **📝 Contact Form**: F```bash
  ./start-local-sso.sh # Start with AWS SSO (recommended)
  npm run build # Build for production  
  npm run start # Start production server
  npm run lint # Run ESLint
  npm run typecheck # Type checking

````nctional contact form with validation

  - Name field (required)
  - Email field (required)
  - Message field (required)
  - Real-time validation with Zod
  - Toast notifications for user feedback
  - Email delivery via AWS SES

- **🚀 Modern Stack**:

  - Next.js 15 with App Router
  - TypeScript for full type safety
  - Tailwind CSS v4 for styling
  - shadcn/ui components
  - AWS SES for email functionality

- **☁️ Serverless Infrastructure**:

  - SST for AWS infrastructure as code
  - Automated deployments with GitHub Actions
  - Support for custom domains via Route53

- **🛠️ Developer Experience**:
  - ESLint + Prettier with pre-commit hooks
  - Hot reload and fast development
  - Comprehensive documentation

## Quick Start

### Prerequisites

- AWS Account with appropriate permissions
- Node.js 18+ and npm
- GitHub repository (GitHub Pro required for environment secrets)
- Docker Desktop (Windows users only)

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo-url>
   cd nextjs-sst-starter
   npm install
````

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development server:**

   ```bash
   ./start-local-sso.sh  # Recommended: Handles AWS SSO and starts dev server
   ```

   > **⚠️ Important**: Use the SSO script for proper AWS authentication. The script automatically detects your AWS SSO profile. Running `npm run dev` directly won't have AWS credentials.

## Documentation

- **📖 [Development Setup](./docs/development-setup.md)** - Development tools, code quality, and local setup
- **🚀 [AWS Deployment](./docs/aws-deployment.md)** - Complete AWS setup and deployment guide
- **🏗️ [Architecture Overview](./docs/architecture.md)** - Detailed AWS infrastructure and OpenNext architecture
- **🔧 [Environment Guide](./docs/deployment-vs-runtime-environment.md)** - Understanding SST environments

## Quick Deploy

### Local Development

```bash
./start-local-sso.sh       # Start with AWS SSO authentication (recommended)
npm run build              # Build for production
npm run start              # Start production server
```

> **⚠️ Build Limitation**: Stop the `start-local-sso.sh` script before running build commands or Prisma operations, as the script locks the terminal session.

### AWS Deployment

```bash
npx sst deploy --stage dev  # Deploy to development
npx sst deploy --stage prod # Deploy to production
```

> **📋 For complete AWS setup instructions**, see [AWS Deployment Guide](./docs/aws-deployment.md)

## Contact Form Configuration

The contact form sends emails via AWS SES. To configure:

1. **Set your contact email** in `src/constants.tsx`:

   ```typescript
   export const CONTACT_EMAIL = "contact@yourcompany.com";
   ```

2. **Configure email identity** in `sst.config.ts`:

   ```typescript
   const emailIdentities: Identity[] = [{ name: "SupportEmail", sender: "contact@yourcompany.com" }];
   ```

3. **Deploy and verify your email** - AWS will send a verification email after deployment

## Environment Management

The project includes environment utilities for handling different deployment stages and runtime environments:

```typescript
import { getDeploymentEnv, isDeploymentEnv } from "@/lib/env.utils";

// Check deployment stage
if (isDeploymentEnv("prod")) {
  // Production-specific logic
}

const stage = getDeploymentEnv(); // "dev" or "prod"
```

> **📖 For detailed environment concepts**, see [Environment Guide](./docs/deployment-vs-runtime-environment.md)

## Project Structure

```
├── .github/workflows/       # GitHub Actions CI/CD
├── .husky/                 # Git hooks
├── docs/                   # Detailed documentation
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/contact/   # Contact form API
│   │   └── ...
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── contact-form.tsx
│   ├── lib/              # Utility libraries
│   │   ├── utils.ts      # shadcn/ui utilities
│   │   └── env.utils.ts  # Environment utilities
│   ├── schemas/          # Zod validation
│   └── ...
├── components.json        # shadcn/ui config
├── sst.config.ts         # Infrastructure config
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit with meaningful messages
6. Submit a pull request

## Scripts

```bash
./start-local-sso.sh     # Start with AWS SSO (recommended)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Type checking
```

## Support

- [SST Documentation](https://docs.sst.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

Built with ❤️ using Next.js, SST, and AWS
