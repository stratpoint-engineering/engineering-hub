import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const allowedDomain = process.env.AUTH_GOOGLE_ALLOWED_DOMAINS ?? "stratpoint.com"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email ?? ""
      return allowedDomain
        .split(",")
        .some((domain) => email.endsWith(`@${domain.trim()}`))
    },
  },
})
