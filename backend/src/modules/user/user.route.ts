import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "user route" });
  });

  app.log.info("user routes registered");
}
