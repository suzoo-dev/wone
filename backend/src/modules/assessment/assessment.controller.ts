import { FastifyReply, FastifyRequest } from "fastify";
import semver from "semver";
import Prisma from "../../utils/prisma";

export async function createAssessment(
  req: FastifyRequest<{
    Body: { version: string; type: string; steps: any[] };
  }>,
  reply: FastifyReply
) {
  const { version, type, steps } = req.body;

  const createdAssessment = await Prisma.assessment.create({
    data: {
      version,
      type,
      steps: {
        create: steps.map((step) => ({
          id: step.id, //TODO: The current format for this is related to the type of assessment, followed by an integer.
          title: step.title,
          subtitle: step.subtitle,
          type: step.type,
          Input: {
            create: step.inputs.map(
              (input: {
                label: any;
                required: any;
                inputType: any;
                options: any[];
              }) => ({
                label: input.label,
                required: input.required,
                inputType: input.inputType,
                options: {
                  create: input.options.map((option) => ({
                    label: option.label,
                    value: option.value,
                  })),
                },
              })
            ),
          },
        })),
      },
    },
  });

  reply.send(createdAssessment);
}

export async function getAssessmentByTypeAndVersion(
  req: FastifyRequest<{ Params: { version: string; type: string } }>,
  reply: FastifyReply
) {
  const { type, version } = req.params;

  let assessment;

  if (version) {
    assessment = await Prisma.assessment.findUnique({
      where: {
        version_type: {
          version,
          type,
        },
      },
      include: {
        steps: { include: { Input: { include: { options: true } } } },
      },
    });
  } else {
    // If no version is specified, get the latest version of the assessment
    const allAssessments = await Prisma.assessment.findMany({
      where: { type },
      include: {
        steps: { include: { Input: { include: { options: true } } } },
      },
    });

    assessment = allAssessments.sort((a, b) =>
      semver.rcompare(a.version, b.version)
    )[0];
  }

  if (!assessment) {
    reply.status(404).send({ message: "Assessment not found" });
    return;
  }

  reply.send(assessment);
}
