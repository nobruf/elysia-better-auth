import Elysia from "elysia";
import * as z from "zod";

export const usersController = new Elysia({
  prefix: "/users",
})
  .get(
    ":id",
    ({ params, user }: any) => {
      const userId = params.id;
      const authenticatedUser = user?.name || "Unknown";

      return {
        id: userId,
        name: authenticatedUser,
      };
    },
    {
      auth: true,
      detail: {
        summary: "Buscar um usuario pelo ID",
        tags: ["users"],
      },
      params: z.object({
        id: z.uuidv7(),
      }),
      response: {
        200: z.object({
          id: z.string(),
          name: z.string(),
        }),
      },
    }
  );
