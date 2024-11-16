import React from "react";
import { Step } from "../types";

interface StepComponentProps {
  step: Step;
}

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
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

    return (
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: step.title }}></h2>
        {step.subtitle ? (
          <div dangerouslySetInnerHTML={{ __html: step.subtitle }}></div>
        ) : null}
        <select
          required={input?.required}
          aria-label={input?.label || "Select an option"}
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
