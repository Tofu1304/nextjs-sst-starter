# Documentation Overview

This directory contains focused documentation for the Next.js SST Starter project.

## Quick Navigation

### 🚀 Getting Started

1. **[Development Setup](./development-setup.md)** - Local development environment
2. **[AWS Deployment Guide](./aws-deployment.md)** - Step-by-step AWS setup and deployment
3. **[Environment Guide](./deployment-vs-runtime-environment.md)** - Understanding SST environments

### 🏗️ Understanding the Stack

1. **[Architecture Overview](./architecture.md)** - AWS infrastructure and OpenNext integration

## Documentation Focus

This documentation focuses on **project-specific configurations** and edge cases:

- SST and AWS setup for this starter
- Contact form with SES integration
- Lambda warming optimization (1-minute intervals)
- Windows development with Docker
- Build process limitations and workarounds

### What's Not Covered

Generic topics are covered in official docs:

- General Next.js features → [Next.js docs](https://nextjs.org/docs)
- React fundamentals → [React docs](https://react.dev/)
- Basic TypeScript → [TypeScript docs](https://www.typescriptlang.org/docs/)

## Recent Updates (January 2025)

### ✅ Streamlined Documentation

- Removed excessive feature listings and repetition
- Focused on project-specific configurations
- Updated [`sst-env.d.ts`](../src/typings/sst-env.d.ts) documentation (manually maintained)
- Documented Lambda warming optimization and known edge cases

---

📚 **Stack**: Next.js 15.3.2 | OpenNext 3.6.2 | SST 3.17+ | Node.js 20.x
