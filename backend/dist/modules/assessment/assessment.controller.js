"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssessment = createAssessment;
exports.getAssessmentByTypeAndVersion = getAssessmentByTypeAndVersion;
const prisma_1 = __importDefault(require("../../utils/prisma"));
async function createAssessment(req, reply) {
    const { version, type, steps } = req.body;
    const createdAssessment = await prisma_1.default.assessment.create({
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
async function getAssessmentByTypeAndVersion(req, reply) {
    const { type, version } = req.params;
    const assessment = await prisma_1.default.assessment.findUnique({
        where: {
            version_type: {
                version,
                type,
            },
        },
    });
    if (!assessment) {
        reply.status(404).send({ message: "Assessment not found" });
        return;
    }
    reply.send(assessment);
}
