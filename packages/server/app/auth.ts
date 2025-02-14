import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                password: {},
            },
            authorize: async credentials => {
                if (credentials.password !== process.env.SERVER_PASSWORD) {
                    throw new Error("Invalid credentials.");
                }
                return {};
            },
        }),
    ],
});
