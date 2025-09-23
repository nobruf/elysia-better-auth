import { auth } from "@/modules/auth";
import Elysia from "elysia";

export const authRoutes = new Elysia({
  name: "auth-routes",
  prefix: "/auth",
})
  .mount(auth.handler);

export const authMiddleware = new Elysia({
  name: "auth-middleware",
})
  .derive(async ({ request: { headers } }) => {
    const session = await auth.api.getSession({ headers });
    return {
      user: session?.user,
      session: session,
    } as const;
  })
  .macro({
    auth: {
      async resolve({ request: { headers }, status }) {
        const session = await auth.api.getSession({ headers });
        
        if (!session || !session.user) {
          return status(401, {
            message: "Unauthorized",
          });
        }
        
        return { user: session.user };
      },
    },
  });
