import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { login } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "user route" });
  });

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
