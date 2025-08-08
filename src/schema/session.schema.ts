import { z } from "zod";

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string().nonempty("Email is required"),
    password: z.string().nonempty("Password is required."),
  }),
});
