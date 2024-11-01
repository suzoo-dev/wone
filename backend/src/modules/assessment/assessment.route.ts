import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function assessmentRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ message: "assessment route" });
    }
  );

  app.log.info("assessment routes registered");
}
