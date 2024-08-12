import * as z from "zod";

// password validateion checks not really needed on login
export const LoginSchema = z.object({
    email: z.string().email({
        // TODO add exclusive zod messages
        message: "Entered Email is invalid"
    }),
    password: z.string().min(1, {
        message: "Password is reqired"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        // TODO add exclusive zod messages
        message: "Entered Email is invalid"
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters are required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});