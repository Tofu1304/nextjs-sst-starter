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
      name: "a-unique-kebab-case-name-for-your-resources",
      removal: isProd(input.stage) ? "retain" : "remove",
      home: "aws",
    };
  },

  // The main run function where all Pulumi resources are defined
  async run() {
    // Determine the domain name based on the deployment stage
    const domainName = isProd($app.stage) ? "yourdomain.com" : `${$app.stage}.yourdomain.com`;

    // Create a SES domain identity with DMARC policy for email sending
    const domainIdentity = new sst.aws.Email("NextEmail", {
      sender: domainName,
      dmarc: "v=DMARC1; p=quarantine; adkim=s; aspf=s;",
    });

    const emailIdentities: Identity[] = [{ name: "SupportEmail", sender: "contact@yourcompany.com" }];

    const identities = [
      domainIdentity,
      ...emailIdentities.map((identity) =>
        isProd($app.stage)
          ? sst.aws.Email.get(identity.name, identity.sender)
          : new sst.aws.Email(identity.name, { sender: identity.sender }),
      ),
    ];

    // Deploy the Next.js application with specified domain
    new sst.aws.Nextjs("NextApp", {
      domain: {
        name: domainName,
        dns: sst.aws.dns({
          zone: "YOUR_DOMAIN_HOSTED_ZONE_ID",
        }),
      },
      server: {
        architecture: "arm64",
      },
      environment: {
        DEPLOYMENT_ENV: $app.stage,
      },
      link: [...identities],
    });
  },
});
