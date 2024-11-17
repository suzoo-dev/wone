import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AlertMessageProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  description,
  variant = "default",
}) => (
  <div className="flex flex-col items-center justify-center w-screen">
    <div className="w-full max-w-lg">
      <Alert variant={variant}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  </div>
);

export default AlertMessage;
