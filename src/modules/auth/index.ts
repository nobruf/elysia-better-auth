import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../database/client";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  basePath: "/auth",
  plugins: [openAPI()],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    password: {
      hash: (password: string) => Bun.password.hash(password),
      verify: ({ password, hash }) => Bun.password.verify(password, hash),
    },
  },
  //TODO: implement redis for production
  session: {
    expiresIn: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});
