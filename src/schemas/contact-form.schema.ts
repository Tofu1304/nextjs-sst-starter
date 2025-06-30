import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot contain more than 50 characters")
    .regex(/^[а-яА-Яa-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z.string().email("Please enter a valid email address"),

  message: z
    .string()
    .min(10, "Message must contain at least 10 characters")
    .max(1000, "Message cannot contain more than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
