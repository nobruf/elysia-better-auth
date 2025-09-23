import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { OpenAPI } from "@/plugins/openapi";
import { authRoutes, authMiddleware } from "@/plugins/auth";
import { usersController } from "@/modules/users";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .use(authRoutes)
  .use(authMiddleware)
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
    })
  )
  .get("/", () => "Server is running!",{tags: ["healthcheck"]})
  .use(usersController)
  .listen(4000);

console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);
