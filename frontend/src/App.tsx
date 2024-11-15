import { useEffect, useState } from "react";
import "./App.css";
import { Assessment } from "./types";

const App = () => {
  const [assessment, setAssessment] = useState<Assessment>();

  useEffect(() => {
    const loadAssessment = async () => {
      const assessment = await fetch(
        "http://127.0.0.1:8080/api/assessment/LearnerAssessment/1.5.0"
      );
      const data = await assessment.json();
      setAssessment(data);
    };
    loadAssessment();
  }, []);

  useEffect(() => {
    console.log(assessment);
  }, [assessment]);

  return (
    <>
      {assessment
        ? assessment.steps.map((step, index) => (
            <div key={index}>{step.title}</div>
          ))
        : null}
    </>
  );
};

export default App;
