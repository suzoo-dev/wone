import { useEffect, useState } from "react";
import { Assessment } from "@/types";

const useLoadAssessment = () => {
  const [assessment, setAssessment] = useState<Assessment>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const assessmentRes = await fetch(
          "http://127.0.0.1:8080/api/assessment/LearnerAssessment/1.5.0"
        );
        if (!assessmentRes.ok) {
          throw new Error("Failed to load assessment");
        }
        const data = await assessmentRes.json();
        setAssessment(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    loadAssessment();
  }, []);

  return { assessment, loading, error };
};

export default useLoadAssessment;
