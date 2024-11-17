import React from "react";
import { useResponseStore } from "@/store/useResponseStore";
import { Option, Step } from "@/types";
import SliderInput from "@/components/Step/components/SliderInput";
import ButtonOptions from "@/components/Step/components/ButtonOptions";
import TextInput from "@/components/Step/components/TextInput";
import AssessmentInfo from "@/components/Step/components/AssessmentInfo";

interface StepComponentProps {
  step: Step;
}

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
  const setAnswer = useResponseStore((state) => state.setAnswer);
  const answer = useResponseStore(
    (state) => state.answers.find((ans) => ans.stepId === step.id)?.value || ""
  );

  const handleChange = (value: number[] | string) => {
    const parsedValue = Array.isArray(value) ? value[0].toString() : value;
    setAnswer(step.id, step.Input[0].id, parsedValue);
  };

  const handleClick = (option: Option) => {
    console.log(option);
    setAnswer(step.id, step.Input[0].id, option.value);
  };

  if (step.type === "ASSESSMENT_INFO_STEP") {
    return <AssessmentInfo title={step.title} subtitle={step.subtitle} />;
  }

  if (step.type === "ASSESSMENT_QUESTION_STEP") {
    const input = step.Input[0];
    const options = input?.options || [];

    return (
      <div>
        <h1
          className="text-xl mt-8 mb-2"
          dangerouslySetInnerHTML={{ __html: step.title }}
        ></h1>
        {step.subtitle && (
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: step.subtitle }}
          ></div>
        )}

        {input.inputType === "SELECT_INPUT" && options.length > 2 ? (
          <SliderInput
            options={options}
            answer={answer}
            onChange={(val) => handleChange(val)}
          />
        ) : null}
        {input.inputType === "SELECT_INPUT" && options.length <= 2 ? (
          <ButtonOptions options={options} onClick={handleClick} />
        ) : null}
        {input.inputType === "TEXT_INPUT" ? (
          <TextInput answer={answer} onChange={handleChange} />
        ) : null}
      </div>
    );
  }

  return null;
};

export default StepComponent;
