"use server";

import { signIn } from "@/auth";

export async function doSignIn(data: FormData) {
    await signIn("credentials", data);
}
