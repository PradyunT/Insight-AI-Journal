import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const googleId = process.env.GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleId || !googleClientSecret) {
  console.error("Google OAuth environment variables are not defined");
  throw new Error("Google OAuth environment variables are not defined");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        if (!profile) {
          console.error("Google profile is undefined");
          return false;
        }

        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("Error checking if user exists: ", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
