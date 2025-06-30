// SST Configuration for Domain-less Deployment
// This is an example of how to configure SST without a custom domain

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// Utility function to determine if the stage is production
const isProd = (stage: string) => stage.startsWith("prod");

// Interface for additional email identities
interface Identity {
  name: string;
  sender: string;
}

export default $config({
  app(input) {
    return {
      name: "nextjs-sst-starter-domainless",
      removal: isProd(input.stage) ? "retain" : "remove",
      home: "aws",
    };
  },

  async run() {
    // Email identities for sending emails (use verified email addresses)
    const emailIdentities: Identity[] = [
      { name: "SupportEmail", sender: "contact@yourcompany.com" },
      // Add more email identities as needed
      // { name: "NoReplyEmail", sender: "noreply@yourcompany.com" },
    ];

    // Create email identities (each email address needs to be verified in SES)
    const identities = emailIdentities.map(
      (identity) =>
        new sst.aws.Email(identity.name, {
          sender: identity.sender,
        }),
    );

    // Deploy the Next.js application WITHOUT domain configuration
    const nextApp = new sst.aws.Nextjs("NextApp", {
      // No domain configuration - uses default CloudFront distribution
      environment: {
        DEPLOYMENT_ENV: $app.stage,
      },
      link: [...identities],

      // Optional: Configure additional Next.js settings
      // buildCommand: "npm run build",
      // buildOutput: ".next",

      // Optional: Configure Lambda function settings
      // lambda: {
      //   runtime: "nodejs20.x",
      //   architecture: "arm64",
      //   memory: "1024 MB",
      //   timeout: "30 seconds",
      // },

      // Optional: Configure CloudFront settings
      // cloudfront: {
      //   comment: `${$app.name} - ${$app.stage}`,
      //   priceClass: "PriceClass_100", // Use only North America and Europe edge locations
      // },
    });

    // Output the CloudFront URL
    return {
      app: nextApp.url,
      stage: $app.stage,
    };
  },
});
