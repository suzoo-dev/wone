import React from "react";

interface AssessmentInfoProps {
  title?: string;
  subtitle?: string;
}

const AssessmentInfo: React.FC<AssessmentInfoProps> = ({ title, subtitle }) => (
  <div>
    {title && <h1 className="text-4xl font-bold mt-4 mb-4">{title}</h1>}
    {subtitle && (
      <div
        className="mb-2"
        dangerouslySetInnerHTML={{ __html: subtitle }}
      ></div>
    )}
  </div>
);

export default AssessmentInfo;
