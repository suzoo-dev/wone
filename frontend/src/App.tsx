import { useEffect } from "react";
import "./App.css";
import useLoadAssessment from "./hooks/useLoadAssessment";
import { useResponseStore } from "./store/useResponseStore";
import StepComponent from "./components/Step";

const App = () => {
  const { assessment, loading, error } = useLoadAssessment();
  const { answers, resetAnswers } = useResponseStore();

  const handleSubmit = async () => {
    console.log(answers);
    try {
      const response = await fetch("http://127.0.0.1:8080/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses: answers }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to submit response");
      }

      console.log("Response submitted successfully");
      resetAnswers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unknown error");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!assessment) return <div>No assessment found</div>;

  /**
   * TODO:
   * - [x] Save responses
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
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default App;
