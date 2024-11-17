import React from "react";
import { Button } from "@/components/ui/button";
import { Option } from "@/types";

interface ButtonOptionsProps {
  options: Option[];
  onClick: (option: Option) => void;
}

const ButtonOptions: React.FC<ButtonOptionsProps> = ({ options, onClick }) => (
  <div className="w-[75%] mx-auto flex flex-row justify-around mb-8">
    {options.map((option) => (
      <Button
        key={`option-${option.value}-${option.label}`}
        onClick={() => onClick(option)}
      >
        {option.label}
      </Button>
    ))}
  </div>
);

export default ButtonOptions;
