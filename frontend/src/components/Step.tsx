import React from "react";
import { Step } from "../types";
import { useResponseStore } from "../store/useResponseStore";

interface StepComponentProps {
  step: Step;
}

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
  const setAnswer = useResponseStore((state) => state.setAnswer);
  const answer = useResponseStore(
    (state) => state.answers.find((ans) => ans.stepId === step.id)?.value || ""
  );

  if (step.type === "ASSESSMENT_INFO_STEP") {
    return (
      <div>
        {step.title ? <h2>{step.title}</h2> : null}
        {step.subtitle ? (
          <div dangerouslySetInnerHTML={{ __html: step.subtitle }}></div>
        ) : null}
      </div>
    );
  }

  if (step.type === "ASSESSMENT_QUESTION_STEP") {
    const input = step.Input[0];
    const options = input?.options || [];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setAnswer(step.id, input.id, e.target.value);
    };

    return (
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: step.title }}></h2>
        {step.subtitle ? (
          <div dangerouslySetInnerHTML={{ __html: step.subtitle }}></div>
        ) : null}
        <select
          required={input?.required}
          aria-label={input?.label || "Select an option"}
          value={answer}
          onChange={handleChange}
        >
          <option value="">-- Please select an option --</option>
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
};

export default StepComponent;
