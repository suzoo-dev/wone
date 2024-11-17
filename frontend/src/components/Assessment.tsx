import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useLoadAssessment from "@/hooks/useLoadAssessment";
import { useResponseStore } from "@/store/useResponseStore";
import StepComponent from "@/components/Step";
import AlertMessage from "@/components/AlertMessage";

const Assessment = () => {
  const { toast } = useToast();
  const { assessment, loading, error } = useLoadAssessment();
  const { answers, resetAnswers } = useResponseStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses: answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit response");
      }

      toast({ description: "Response submitted successfully" });
      resetAnswers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({ description: err.message });
      } else {
        toast({ description: "Unknown error occurred" });
      }
    }
  };

  if (loading)
    return (
      <AlertMessage
        title="Loading..."
        description="Please wait while we load the assessment"
      />
    );
  if (error)
    return (
      <AlertMessage title="Error" description={error} variant="destructive" />
    );
  if (!assessment)
    return (
      <AlertMessage
        title="No assessment found"
        description="We can't find any assessment for you"
      />
    );

  return (
    <>
      {assessment
        ? assessment.steps.map((step, index) => (
            <StepComponent key={index} step={step} />
          ))
        : null}
      <Button className="mb-2" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default Assessment;
