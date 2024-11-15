export type Assessment = {
  id: number;
  version: string;
  type: string;
  steps: Step[];
  createdAt: string;
  updatedAt: string;
  createdById: number | null;
  updatedById: number | null;
};

export type Step = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  assessmentId: number;
  Input: Input[];
};

export type Input = {
  id: string;
  label: string;
  options: Option[];
  required: boolean;
  inputType: string;
};

export type Option = {
  id: number;
  label: string;
  value: string;
  inputType: string;
};
