import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email) return null;
        console.log("🔑 Login attempt for:", credentials.email);

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user) {
          console.log("❌ User not found in database");
          return null;
        }

        console.log("👤 User found:", user.email, "Approved:", user.isApproved);

        // Special case for initial blank password
        if (user.password) {
           const isValid = await bcrypt.compare(credentials.password as string, user.password);
           if (!isValid) {
             console.log("❌ Invalid password");
             return null;
           }
        } else {
           console.log("ℹ️ User has no password set, allowing login");
        }

        if (!user.isApproved) {
           console.log("❌ Account not approved");
           throw new Error("Your account is pending approval.");
        }

        console.log("✅ Login successful");
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
});
