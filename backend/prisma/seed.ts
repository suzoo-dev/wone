import {
  PrismaClient,
  InputType,
  StepType,
  AssessmentType,
} from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Input {
  id: string;
  label: string;
  required: boolean;
  options: Option[];
  __typename: InputType;
}

interface Step {
  id: string;
  titleHtml: string;
  subtitleHtml: string | null;
  input?: Input;
  __typename: StepType;
}

interface AssessmentData {
  steps: Step[];
  version: string;
  __typename: string;
}

const stepTypeMapping: { [key: string]: StepType } = {
  AssessmentWelcomeStep: StepType.ASSESSMENT_WELCOME_STEP,
  AssessmentInfoStep: StepType.ASSESSMENT_INFO_STEP,
  AssessmentQuestionStep: StepType.ASSESSMENT_QUESTION_STEP,
  AssessmentEndStep: StepType.ASSESSMENT_END_STEP,
};

const inputTypeMapping: { [key: string]: InputType } = {
  SelectInput: InputType.SELECT_INPUT,
  TextInput: InputType.TEXT_INPUT,
};

const assessmentTypeMapping: { [key: string]: AssessmentType } = {
  LearnerAssessment: AssessmentType.LEARNER_ASSESSMENT,
};

async function main() {
  const data: AssessmentData = JSON.parse(
    fs.readFileSync("./assessment.json", "utf8")
  );

  const createdAssessment = await prisma.assessment.create({
    data: {
      version: data.version,
      type: assessmentTypeMapping[data.__typename],
    },
  });

  for (const step of data.steps) {
    const createdStep = await prisma.step.create({
      data: {
        id: step.id,
        title: step.titleHtml,
        subtitle: step.subtitleHtml,
        type: stepTypeMapping[step.__typename],
      },
    });

    if (step.input) {
      const inputData: any = {
        id: step.input.id,
        stepId: createdStep.id,
        label: step.input.label,
        required: step.input.required,
        inputType: inputTypeMapping[step.input.__typename],
      };

      if (step.input.options && step.input.options.length > 0) {
        inputData.options = {
          create: step.input.options.map((option) => ({
            label: option.label,
            value: option.value,
          })),
        };
      }

      await prisma.input.create({
        data: inputData,
      });
    }
    // if (step.input) {
    //   const createdInput = await prisma.input.create({
    //     data: {
    //       id: step.input.id,
    //       label: step.input.label,
    //       required: step.input.required,
    //       inputType: inputTypeMapping[step.input.__typename],
    //       options: {
    //         create: step.input.options.map((option) => ({
    //           label: option.label,
    //           value: option.value,
    //         })),
    //       },
    //       Step: {
    //         connect: { id: step.id },
    //       },
    //     },
    //   });

    //   await prisma.step.create({
    //     data: {
    //       id: step.id,
    //       title: step.titleHtml,
    //       subtitle: step.subtitleHtml,
    //       type: stepTypeMapping[step.__typename],
    //       Input: {
    //         connect: { id: createdInput.id },
    //       },
    //     },
    //   });
    // } else {
    //   await prisma.step.create({
    //     data: {
    //       id: step.id,
    //       title: step.titleHtml,
    //       subtitle: step.subtitleHtml,
    //       type: stepTypeMapping[step.__typename],
    //     },
    //   });
    // }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });