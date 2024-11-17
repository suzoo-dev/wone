import React from "react";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  answer: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ answer, onChange }) => (
  <div className="w-[75%] mx-auto flex flex-col mb-8">
    <div className="w-full px-10 mb-1">
      <Input defaultValue={answer} onChange={(e) => onChange(e.target.value)} />
    </div>
  </div>
);

export default TextInput;
