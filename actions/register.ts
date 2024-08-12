// never be bundled with client code (equicalent to api routes)
"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getuserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    // giving saltrounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // confirm email is not taken already
    const existingUser = await getuserByEmail(email);

    if (existingUser) {
        return { error: "Email is already in use" };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    // TODO : send verification token email

    return {
        success: "User created!"
    };
};
