import { FastifyInstance } from "fastify";
import {
  createAssessment,
  getAssessmentByTypeAndVersion,
} from "./assessment.controller";
import { createAssessmentSchema } from "./assessment.schema";

export async function assessmentRoutes(app: FastifyInstance) {
  app.get(
    "/:type/:version",
    // {
    //   preHandler: [app.authenticate],
    // },
    getAssessmentByTypeAndVersion
  );

  app.post(
    "/",
    {
      preHandler: [app.authenticate, app.isAdmin],
      schema: createAssessmentSchema,
    },
    createAssessment
  );

  app.log.info("assessment routes registered");
}
