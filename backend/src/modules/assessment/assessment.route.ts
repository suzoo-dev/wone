import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createAssessment } from "./assessment.controller";

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
      schema: {
        body: {
          type: "object",
          properties: {
            version: { type: "string" },
            type: { type: "string" },
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  subtitle: { type: "string" },
                  type: { type: "string" },
                  inputs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string" },
                        required: { type: "boolean" },
                        inputType: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              label: { type: "string" },
                              value: { type: "string" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    createAssessment
  );
  app.log.info("assessment routes registered");
}
