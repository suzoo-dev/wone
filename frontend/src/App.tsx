import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import Assessment from "@/components/Assessment";

export default function App() {
  return (
    <div>
      <Assessment />
      <Toaster />
    </div>
  );
}
