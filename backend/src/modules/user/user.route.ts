import { FastifyInstance } from "fastify";
import { login } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
          },
          required: ["username"],
        },
      },
    },
    login
  );

  app.log.info("user routes registered");
}
