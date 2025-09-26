import { db } from "@/database/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { organization } from "better-auth/plugins";
import { ac, admin } from "./permissions";

export const auth = betterAuth({
  basePath: "/auth",
  plugins: [
    openAPI(),
    organization({
      ac,
      roles: {
        admin,
      },
      async sendInvitationEmail(data) {
        const inviteLink = `http://localhost:4200/accept-invitation/${data.id}`;
        console.log({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          teamName: data.organization.name,
          inviteLink,
        });
      },
      async onInvitationAccepted(data: any) {
        console.log(data);
      },
    }),
  ],
  trustedOrigins: ["http://localhost:3000", "http://localhost:4200"],
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
