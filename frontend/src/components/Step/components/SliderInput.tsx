import React from "react";
import { Slider } from "@/components/ui/slider";
import { Option } from "@/types";

interface SliderInputProps {
  options: Option[];
  answer: string;
  onChange: (value: number[]) => void;
}

const SliderInput: React.FC<SliderInputProps> = ({
  options,
  answer,
  onChange,
}) => {
  const min = Math.min(...options.map((opt) => parseInt(opt.value, 10)));
  const max = Math.max(...options.map((opt) => parseInt(opt.value, 10)));

  return (
    <div className="w-[75%] mx-auto flex flex-col mb-8">
      <div className="w-full px-10 mb-1">
        <Slider
          min={min}
          max={max}
          step={1}
          defaultValue={[parseInt(answer, 10)]}
          onValueChange={onChange}
        />
      </div>
      <div className="w-full flex justify-between font-bold italic">
        {options.map((option) => (
          <div key={option.value} className="w-20">
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderInput;
