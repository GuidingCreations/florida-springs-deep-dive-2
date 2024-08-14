import { Terminal } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const AlertComponent = ({alertMessage, alertType} : {alertMessage: string, alertType: 'destructive' | 'default'}) => {
  return (
    <Alert variant={alertType} className="bg-red-600 mb-3">
      <Terminal className="h-4 w-4" />
      <AlertTitle>{alertMessage}</AlertTitle>
      
    </Alert>
  );
};

export default AlertComponent;
