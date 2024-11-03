import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createAssessment, getAssessmentById } from "./assessment.controller";
import { createAssessmentSchema } from "./assessment.schema";

export async function assessmentRoutes(app: FastifyInstance) {
  app.get(
    "/assessment/:id",
    {
      preHandler: [app.authenticate],
    },
    getAssessmentById
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
