import { useEffect } from "react";
import "./App.css";
import useLoadAssessment from "./hooks/useLoadAssessment";
import StepComponent from "./components/Step";

const App = () => {
  const { assessment, loading, error } = useLoadAssessment();

  useEffect(() => {
    console.log(assessment);
  }, [assessment]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!assessment) return <div>No assessment found</div>;

  /**
   * TODO:
   * - [ ] Save responses
   * - [ ] Load previous responses
   * - [ ] Break steps into groups based on id prefix
   * - [ ] Add step navigation
   * - [ ] Add progress bar
   */

  return (
    <>
      {assessment
        ? assessment.steps.map((step, index) => (
            <StepComponent key={index} step={step} />
          ))
        : null}
    </>
  );
};

export default App;
