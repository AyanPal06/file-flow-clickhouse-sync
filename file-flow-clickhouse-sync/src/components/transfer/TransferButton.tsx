
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

interface TransferButtonProps {
  sourceType: "file" | "clickhouse";
  transferStatus: "idle" | "transferring" | "completed" | "failed";
  onClick: () => void;
}

const TransferButton: React.FC<TransferButtonProps> = ({
  sourceType,
  transferStatus,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={transferStatus === "transferring"}
      className="w-full"
    >
      {sourceType === "file" ? (
        <>
          <Upload className="mr-2 h-4 w-4" />
          {transferStatus === "transferring" ? "Transferring..." : "Transfer to ClickHouse"}
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {transferStatus === "transferring" ? "Transferring..." : "Transfer to File"}
        </>
      )}
    </Button>
  );
};

export default TransferButton;
