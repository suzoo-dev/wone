import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createAssessment } from "./assessment.controller";
import { createAssessmentSchema } from "./assessment.schema";

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

  app.post(
    "/admin/assessment",
    {
      preHandler: [app.authenticate, app.isAdmin],
      schema: createAssessmentSchema,
    },
    createAssessment
  );

  app.log.info("assessment routes registered");
}
