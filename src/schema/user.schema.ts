import { z } from "zod";

export const createUserSchema = z
  .object({
    body: z.object({
      name: z.string().nonempty("Name is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
          "Password must contain at least one number, one lowercase and one uppercase letter"
        )
        .nonempty("Password is required."),
      passwordConfirmation: z
        .string()
        .nonempty("Password Confirmation is required."),
      email: z
        .string()
        .email("Please enter a valid email")
        .nonempty("Email is required")
        .regex(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "Invalid email format"
        ),
    }),
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["body", "passwordConfirmation"],
  });

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  "passwordConfirmation"
>;
