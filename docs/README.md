# Documentation Overview

This directory contains comprehensive documentation for the Next.js SST Starter project.

## Documentation Structure

### 📖 Core Documentation

- **[Architecture Overview](./architecture.md)** - Complete AWS infrastructure and OpenNext integration details
- **[AWS Deployment Guide](./aws-deployment.md)** - Step-by-step AWS setup and deployment instructions
- **[Development Setup](./development-setup.md)** - Development tools, code quality, and local setup
- **[Environment Guide](./deployment-vs-runtime-environment.md)** - Understanding SST environments and configuration

### 🚀 Key Features Documented

#### Next.js 15 & OpenNext Integration

- **Latest Compatibility**: OpenNext v3.6.2 supports Next.js 15.3.2
- **Feature Support Matrix**: Comprehensive list of supported Next.js 15 features
- **Performance Benchmarks**: Real-world performance improvements and optimizations
- **Migration Guides**: Upgrade paths and breaking changes

#### AWS Infrastructure

- **Serverless Architecture**: CloudFront, Lambda, S3, and SES integration
- **Cost Optimization**: ARM64 Graviton2 processors for 34% cost savings
- **Security**: SSL/TLS, WAF, IAM roles, and access control
- **Monitoring**: CloudWatch, X-Ray tracing, and observability

#### Development Experience

- **Code Quality**: ESLint 9, Prettier, Husky, and lint-staged setup
- **UI Development**: shadcn/ui components with Tailwind CSS v4
- **VS Code Integration**: Custom snippets and development workflow
- **Hot Reload**: Turbopack development with enhanced performance

## Recent Updates (January 2025)

### ✅ Completed Improvements

1. **Next.js 15 Feature Documentation**

   - Added comprehensive feature support matrix
   - Updated OpenNext compatibility information (v3.6.2 → Next.js 15.3.2)
   - Documented new React 19 support and async request APIs
   - Added Turbopack performance benchmarks

2. **Enhanced Architecture Documentation**

   - Updated infrastructure diagrams with Mermaid
   - Added performance optimization details
   - Documented ARM64 vs x86_64 performance comparison
   - Enhanced security and monitoring sections

3. **Improved Development Documentation**

   - Complete tooling setup documentation
   - VS Code snippets and workflow optimization
   - react-hot-toast integration details
   - Code quality and linting configuration

4. **AWS Deployment Enhancements**
   - Domain-less deployment instructions
   - GitHub Actions CI/CD pipeline documentation
   - Environment variable management
   - Production optimization strategies

### 📊 Feature Support Status

| Category                  | Features Documented  | Support Level |
| ------------------------- | -------------------- | ------------- |
| **Next.js 15 Core**       | 25+ features         | ✅ Complete   |
| **OpenNext Integration**  | All major features   | ✅ Complete   |
| **AWS Infrastructure**    | All components       | ✅ Complete   |
| **Development Tools**     | All configured tools | ✅ Complete   |
| **Deployment Strategies** | Multiple approaches  | ✅ Complete   |

### 🔧 Technical Highlights

#### Performance Optimizations

- **Cold Start**: 100-150ms on ARM64 (vs 150-200ms x86_64)
- **Bundle Size**: 15-20% smaller with enhanced tree shaking
- **Development**: 76.7% faster startup with Turbopack
- **Build Performance**: 45.8% faster initial compilation

#### Security Features

- Server Actions with unguessable IDs
- Dead code elimination for unused functions
- Enhanced SSL/TLS with CloudFront
- Proper CORS and access control

#### Developer Experience

- Type-safe infrastructure with SST v3
- Comprehensive VS Code integration
- Pre-commit hooks with quality checks
- Live development with SST Console

## Navigation Guide

### For Getting Started

1. Start with [Development Setup](./development-setup.md)
2. Follow [AWS Deployment Guide](./aws-deployment.md)
3. Review [Environment Guide](./deployment-vs-runtime-environment.md)

### For Deep Understanding

1. Study [Architecture Overview](./architecture.md)
2. Review the Next.js 15 feature support matrix
3. Explore the infrastructure diagrams and performance benchmarks

### For Production Deployment

1. Complete AWS account setup in [AWS Deployment Guide](./aws-deployment.md)
2. Configure environment variables per [Environment Guide](./deployment-vs-runtime-environment.md)
3. Follow production optimization in [Architecture Overview](./architecture.md)

## Maintenance Notes

This documentation is maintained to reflect:

- Latest OpenNext compatibility (currently v3.6.2)
- Next.js feature updates (currently 15.3.2)
- AWS service changes and best practices
- Performance improvements and benchmarks
- Security updates and recommendations

## Contributing to Documentation

When updating documentation:

1. Maintain cross-references between files
2. Update version numbers and compatibility matrices
3. Include performance benchmarks when relevant
4. Add diagrams for complex architectural concepts
5. Validate all links and code examples

---

📚 **Last Updated**: January 2025 | **Next.js**: 15.3.2 | **OpenNext**: 3.6.2 | **SST**: 3.17+
