# AWS Deployment Guide

This document provides detailed instructions for setting up AWS infrastructure and deployment pipelines.

## AWS IAM Identity Center Setup

Setting up IAM Identity Center allows you to manage user access centrally and securely.

1. Navigate to **IAM Identity Center** in the AWS Console
2. Enable IAM Identity Center with **AWS Organizations**
3. Navigate to **Permission sets** and create a new permission set
   - Attach necessary policies (e.g., `AdministratorAccess`)
   - Name it descriptively (e.g., "AdminAccess")
4. Navigate to **Groups** and create a new group (e.g., `admins`)
5. Navigate to **Users** and create a new user
   - Add the user to the newly created group
6. Navigate to **AWS Accounts**
7. Select your root account
8. Click **Assign users or groups**
9. Select the newly created group
10. Attach the permission set you created

**Benefits:** This setup allows you to grant groups of users granular access to specific AWS services through policies. You maintain one root account where you can invite users and control their access to different parts of your AWS infrastructure (console access, specific services, etc.).

## AWS SSO Configuration

Users added to IAM Identity Center need to authenticate using AWS SSO before they can access AWS resources.

### Setting up Local SSO Authentication

We've included a `start-local-sso.sh` script to simplify the authentication process. Before using it, you need to configure your AWS profile in `~/.aws/config`.

**Example AWS Config:**

```ini
[profile dev-sso]
sso_start_url = https://your-portal.awsapps.com/start
sso_region = eu-central-1
sso_account_id = 123456789012
sso_role_name = AdministratorAccess
region = eu-central-1
```

**Configuration Details:**

1. **sso_start_url**: The AWS access portal URL provided by your IAM Identity Center administrator
2. **sso_region**: The AWS region where your IAM Identity Center is configured (e.g., `eu-central-1`)
3. **sso_account_id**: Your AWS root account ID (12-digit number)
4. **sso_role_name**: The permission set name you're assigned to (e.g., `AdministratorAccess`)
5. **region**: Your preferred AWS region for resources (should match sso_region)

**Authentication:**
Run the following command to authenticate:

```bash
aws configure sso --profile dev-sso
```

Or use our provided script:

```bash
./start-local-sso.sh
```

## Domain Configuration (Optional)

If you want to use a custom domain for your application, follow these steps:

### Purchasing and Setting Up Your Domain

1. **Purchase a domain** from a registrar like GoDaddy, Namecheap, or any other provider (e.g., `example.com`)
2. **Create a hosted zone** in AWS Route53:
   - Navigate to Route53 in the AWS Console
   - Click "Create hosted zone"
   - Enter your domain name (e.g., `example.com`)
   - Select "Public hosted zone"
   - Click "Create hosted zone"
3. **Update nameservers** at your domain registrar:
   - Copy the NS (nameserver) records from your Route53 hosted zone
   - Go to your domain registrar's DNS management panel
   - Replace the existing nameservers with the Route53 nameservers
   - Save changes (DNS propagation may take up to 48 hours)

**Note:** The hosted zone will incur a small monthly cost (~$0.50/month per zone).

## GitHub Actions Deployment Setup

To enable automated deployments through GitHub Actions, we need to create an IAM service account that SST can use to deploy infrastructure.

### Creating an IAM Service Account

1. Navigate to **IAM** in the AWS Console
2. Go to **Users** and click "Create user"
3. Configure the user:
   - **Username**: Use a descriptive name (e.g., `sst-deployment-service`)
   - **Access type**: Programmatic access only
   - **Permissions**: Attach `AdministratorAccess` policy directly
   - Review and create the user
4. Generate access keys:
   - Go to the newly created user
   - Click the **Security credentials** tab
   - Under **Access keys**, click "Create access key"
   - **Use case**: Select "Other"
   - **Description**: Optional (e.g., "SST deployment key")
   - **Important**: Save both the `Access key ID` and `Secret access key` securely

### GitHub Environment Setup

> **⚠️ Requirement:** This setup requires GitHub Pro for access to environment secrets.

Our deployment workflow uses two environments: `dev` and `prod`.

**Setting up GitHub Environments:**

1. Go to your repository **Settings** → **Environments**
2. Create two environments: `dev` and `prod`
3. For each environment, add the following secrets:
   - `AWS_ACCESS_KEY_ID`: The access key ID from the IAM user
   - `AWS_SECRET_ACCESS_KEY`: The secret access key from the IAM user
   - `AWS_REGION`: Your preferred AWS region (e.g., `eu-central-1`)

> **Note:** You can use the same AWS credentials for both environments initially. As your project grows, consider using separate AWS accounts or IAM users for different environments for better security isolation.

### Available GitHub Workflows

The repository includes four automated workflows:

| Workflow         | File                     | Trigger                                  | Purpose                           |
| ---------------- | ------------------------ | ---------------------------------------- | --------------------------------- |
| **Deploy Dev**   | `ci-cd-dev.yml`          | Push to `main` branch or manual dispatch | Deploy to development environment |
| **Deploy Prod**  | `ci-cd-prod.yml`         | Manual dispatch only                     | Deploy to production environment  |
| **Destroy Dev**  | `ci-cd-destroy-dev.yml`  | Manual dispatch only                     | Remove development infrastructure |
| **Destroy Prod** | `ci-cd-destroy-prod.yml` | Manual dispatch only                     | Remove production infrastructure  |

**Manual Dispatch:** Go to Actions tab → Select workflow → Click "Run workflow"

## Email Configuration (AWS SES)

This project includes a contact form that sends emails using AWS Simple Email Service (SES).

### Setup Process

1. **Configure the email settings** in your `constants.tsx`:

   ```typescript
   // In src/constants.tsx
   export const CONTACT_EMAIL = "your-email@example.com";
   ```

2. **Configure the email identities** in your `sst.config.ts`:

   ```typescript
   // In sst.config.ts
   const emailIdentities: Identity[] = [{ name: "SupportEmail", sender: "your-email@example.com" }];
   ```

3. **Deploy the application** using SST (the SES configuration is included in the deployment)

4. **Verify your email address**:

   - After deployment, AWS SES will send a verification email to the address you configured
   - Check your inbox (and spam folder) for the verification email
   - Click the verification link to confirm your email address

5. **Test the contact form**:
   - Once verified, all contact form submissions will be sent to your configured email address
   - The first few emails might end up in your spam folder, so mark them as "not spam"

### Configuration Details

The email configuration involves three main components:

1. **Domain Email Identity**: Configured automatically if you're using a domain
2. **Personal Email Identity**: Set in the `emailIdentities` array in `sst.config.ts`
3. **Contact Email Recipient**: Set in `src/constants.tsx`

The system will send emails from `noreply@yourdomain.com` (if using domain) to the email address specified in `CONTACT_EMAIL`.

> **Note:** In development, AWS SES operates in sandbox mode, which means you can only send emails to verified email addresses. For production use, you may need to request production access from AWS SES.

## Windows Development Setup

> **Note:** As of 2025, SST has limited Windows support. This Docker-based approach ensures proper SST initialization and type safety.

### Using Docker for SST Initialization

We've included Docker configuration files to run SST in a Linux environment on Windows:

1. **Prerequisites**:

   - Install Docker Desktop for Windows
   - Ensure WSL 2 is enabled

2. **Initialize SST**:

   ```bash
   # Start the Docker container
   docker-compose up -d

   # Open a terminal in the running container (via Docker Desktop)
   # Or use: docker-compose exec app bash

   # Inside the container, run:
   npx sst@latest init
   ```

3. **Handling existing SST config**:
   If you already have an `sst.config.ts` file:

   ```bash
   # Temporarily rename the existing config
   mv sst.config.ts sst.config.ts.backup

   # Run SST init
   npx sst@latest init

   # Remove the generated config and restore your original
   rm sst.config.ts
   mv sst.config.ts.backup sst.config.ts
   ```

This approach ensures you get proper TypeScript definitions and SST tooling support even on Windows systems.
