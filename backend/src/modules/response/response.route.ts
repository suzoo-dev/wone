import { FastifyInstance } from "fastify";
import { createResponse } from "./response.controller";
import { createResponseSchema } from "./response.schema";

export async function responseRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [app.authenticate],
      schema: createResponseSchema,
    },
    createResponse
  );

  app.log.info("response routes registered");
}
