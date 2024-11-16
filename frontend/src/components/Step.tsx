import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step } from "../types";
import { useResponseStore } from "../store/useResponseStore";

interface StepComponentProps {
  step: Step;
}

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const setAnswer = useResponseStore((state) => state.setAnswer);
  const answer = useResponseStore(
    (state) => state.answers.find((ans) => ans.stepId === step.id)?.value || ""
  );

  useEffect(() => {
    setCurrentAnswer(answer);
  }, [answer]);

  useEffect(() => {
    if (!step.Input || step.Input.length === 0) return;
    setAnswer(step.id, step?.Input[0].id, currentAnswer);
  }, [currentAnswer, setAnswer, step?.Input, step.id]);

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
        <Select
          required={input?.required}
          aria-label={input?.label || "Select an option"}
          value={currentAnswer}
          onValueChange={setCurrentAnswer}
        >
          <SelectTrigger>
            <SelectValue placeholder="-- Please select an option --" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return null;
};

export default StepComponent;
