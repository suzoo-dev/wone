import { FastifyReply, FastifyRequest } from "fastify";
import Prisma from "../../utils/prisma";

export async function createAssessment(
  req: FastifyRequest<{
    Body: { version: string; type: string; steps: any[] }; //TODO: Need to handle these types.
  }>,
  reply: FastifyReply
) {
  const { version, type, steps } = req.body;

  const createdAssessment = await Prisma.assessment.create({
    data: {
      version,
      type, //TODO: This will be a new type.
      steps: {
        create: steps.map((step) => ({
          id: step.id, //TODO: The current format for this is related to the type of assessment, followed by an integer.
          title: step.title,
          subtitle: step.subtitle,
          type: step.type,
          Input: {
            create: step.inputs.map((input) => ({
              label: input.label,
              required: input.required,
              inputType: input.inputType,
              options: {
                create: input.options.map((option) => ({
                  label: option.label,
                  value: option.value,
                })),
              },
            })),
          },
        })),
      },
    },
  });

  reply.send(createdAssessment);
}
