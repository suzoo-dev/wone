import { FastifyReply, FastifyRequest } from "fastify";
import Prisma from "../../utils/prisma";
import { randomUUID } from "crypto";

export async function createResponse(
  req: FastifyRequest<{
    Body: { responses: any[] };
  }>,
  reply: FastifyReply
) {
  const { responses } = req.body;

  const entryId = randomUUID();

  const responseData = responses.map((response) => ({
    entryId,
    stepId: response.stepId,
    inputId: response.inputId,
    userId: 5, // req.user.id,
    value: response.value,
  }));

  const createdResponse = await Prisma.response.createMany({
    data: responseData,
  });

  reply.send(createdResponse);
}
