import React, { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
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
        {step.title ? (
          <h1 className="text-4xl font-bold mt-4 mb-4">{step.title}</h1>
        ) : null}
        {step.subtitle ? (
          <div dangerouslySetInnerHTML={{ __html: step.subtitle }}></div>
        ) : null}
      </div>
    );
  }

  if (step.type === "ASSESSMENT_QUESTION_STEP") {
    const input = step.Input[0];
    const options = input?.options || [];
    let optionsMin;
    let optionsMax;
    if (options.length > 0) {
      optionsMin = parseInt(
        options.reduce((prev, curr) => (prev.value < curr.value ? prev : curr))
          .value,
        10
      );
      optionsMax = parseInt(
        options.reduce((prev, curr) => (prev.value > curr.value ? prev : curr))
          .value,
        10
      );
    }

    return (
      <div>
        <h1
          className="text-xl mt-8 mb-4"
          dangerouslySetInnerHTML={{ __html: step.title }}
        ></h1>
        {step.subtitle ? (
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: step.subtitle }}
          ></div>
        ) : null}
        <div className="w-[75%] mx-auto flex flex-col mb-8">
          <div className="w-full px-10">
            <Slider
              min={optionsMin}
              max={optionsMax}
              step={1}
              defaultValue={[parseInt(answer, 10)]}
            />
          </div>
          <div className="w-full flex flex-row justify-between mb-2 font-bold italic">
            {options
              ? options.map((option) => {
                  return <div className="w-20">{option.label}</div>;
                })
              : null}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StepComponent;
