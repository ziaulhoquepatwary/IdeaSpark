import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,

        async sendResetPassword({ user, url }) {
            await sendEmail({
                to: user.email,
                subject: "Reset Your Password",
                text: `Click the link below to reset your password:\n\n${url}`,
            });
        },

        onExistingUserSignUp: async ({ user }) => {
            await sendEmail({
                to: user.email,
                subject: "Sign-up attempt with your email",
                text: "Someone tried to create an account using your email address.",
            });
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        client
    }),
});