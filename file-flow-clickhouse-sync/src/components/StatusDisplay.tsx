
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatusDisplayProps {
  connectionStatus: "idle" | "connecting" | "connected" | "failed";
  transferStatus: "idle" | "transferring" | "completed" | "failed";
  message: string;
}

const StatusDisplay = ({ 
  connectionStatus, 
  transferStatus,
  message 
}: StatusDisplayProps) => {
  
  let statusIcon;
  let statusTitle;
  let statusVariant: "default" | "destructive" | "success" = "default";
  let showProgress = false;
  
  if (transferStatus === "transferring") {
    statusIcon = <Loader2 className="h-4 w-4 animate-spin" />;
    statusTitle = "Data Transfer in Progress";
    showProgress = true;
  } else if (transferStatus === "completed") {
    statusIcon = <CheckCircle2 className="h-4 w-4 text-green-500" />;
    statusTitle = "Data Transfer Complete";
    statusVariant = "success";
  } else if (transferStatus === "failed") {
    statusIcon = <CircleAlert className="h-4 w-4 text-red-500" />;
    statusTitle = "Data Transfer Failed";
    statusVariant = "destructive";
  } else if (connectionStatus === "connecting") {
    statusIcon = <Loader2 className="h-4 w-4 animate-spin" />;
    statusTitle = "Connecting";
  } else if (connectionStatus === "connected") {
    statusIcon = <CheckCircle2 className="h-4 w-4 text-green-500" />;
    statusTitle = "Connected";
    statusVariant = "success";
  } else if (connectionStatus === "failed") {
    statusIcon = <CircleAlert className="h-4 w-4 text-red-500" />;
    statusTitle = "Connection Failed";
    statusVariant = "destructive";
  } else if (message) {
    statusIcon = <AlertCircle className="h-4 w-4" />;
    statusTitle = "Status";
  } else {
    return null; // No status to display
  }

  return (
    <Alert variant={statusVariant}>
      <div className="flex items-center">
        {statusIcon}
        <AlertTitle className="ml-2">{statusTitle}</AlertTitle>
      </div>
      {message && <AlertDescription className="mt-1">{message}</AlertDescription>}
      {showProgress && (
        <Progress className="mt-2" value={45} />
      )}
    </Alert>
  );
};

export default StatusDisplay;
