
import { useState } from "react";
import DestinationInputs from "./transfer/DestinationInputs";
import TransferButton from "./transfer/TransferButton";
import { useDataTransfer } from "@/hooks/useDataTransfer";

interface DataTransferFormProps {
  sourceType: "file" | "clickhouse";
  destinationType: "file" | "clickhouse";
  file: File | null;
  selectedFileColumns: string[];
  connectionDetails: {
    host: string;
    port: string;
    database: string;
    username: string;
    jwt: string;
  };
  selectedTable: string;
  selectedTableColumns: string[];
  transferStatus: "idle" | "transferring" | "completed" | "failed";
  setTransferStatus: (status: "idle" | "transferring" | "completed" | "failed") => void;
  setStatusMessage: (message: string) => void;
}

const DataTransferForm = ({
  sourceType,
  destinationType,
  file,
  selectedFileColumns,
  selectedTable,
  selectedTableColumns,
  transferStatus,
  setTransferStatus,
  setStatusMessage
}: DataTransferFormProps) => {
  const {
    tableName,
    setTableName,
    filename,
    setFilename,
    handleTransfer
  } = useDataTransfer({
    sourceType,
    file,
    selectedFileColumns,
    selectedTable,
    selectedTableColumns,
    setTransferStatus,
    setStatusMessage
  });
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        {sourceType === "file" ? (
          <p>Transfer data from the uploaded CSV file to a ClickHouse table</p>
        ) : (
          <p>Transfer data from the selected ClickHouse table to a CSV file</p>
        )}
      </div>
      
      <DestinationInputs
        destinationType={destinationType}
        tableName={tableName}
        setTableName={setTableName}
        filename={filename}
        setFilename={setFilename}
      />
      
      <TransferButton
        sourceType={sourceType}
        transferStatus={transferStatus}
        onClick={handleTransfer}
      />
    </div>
  );
};

export default DataTransferForm;
