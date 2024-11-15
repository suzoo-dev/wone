import { useEffect } from "react";
import "./App.css";
import useLoadAssessment from "./hooks/useLoadAssessment";

const App = () => {
  const { assessment, loading, error } = useLoadAssessment();

  useEffect(() => {
    console.log(assessment);
  }, [assessment]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!assessment) return <div>No assessment found</div>;

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
