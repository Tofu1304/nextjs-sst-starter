"use server";

import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Resource } from "sst";
import { CONTACT_EMAIL } from "./constants";

interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export const sendContactFormEmail = async ({ name, email, message }: ContactFormPayload) => {
  const client = new SESv2Client();

  const htmlContent = `
    <div style="font-family: sans-serif; line-height: 1.5;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
  `;

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: `noreply@${Resource.NextEmail.sender}`,
      Destination: {
        ToAddresses: [CONTACT_EMAIL],
      },
      Content: {
        Simple: {
          Subject: {
            Data: "New Contact Form Submission",
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: htmlContent,
              Charset: "UTF-8",
            },
          },
        },
      },
    }),
  );
};
