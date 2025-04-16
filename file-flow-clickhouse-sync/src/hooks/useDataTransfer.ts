
import { useState } from "react";
import { toast } from "sonner";

interface UseDataTransferProps {
  sourceType: "file" | "clickhouse";
  file: File | null;
  selectedFileColumns: string[];
  selectedTable: string;
  selectedTableColumns: string[];
  setTransferStatus: (status: "idle" | "transferring" | "completed" | "failed") => void;
  setStatusMessage: (message: string) => void;
}

export const useDataTransfer = ({
  sourceType,
  file,
  selectedFileColumns,
  selectedTable,
  selectedTableColumns,
  setTransferStatus,
  setStatusMessage,
}: UseDataTransferProps) => {
  const [tableName, setTableName] = useState("");
  const [filename, setFilename] = useState("");
  
  // Determine destination type based on source type
  const destinationType = sourceType === "file" ? "clickhouse" : "file";

  const transferFileToClickHouse = async () => {
    if (!file) {
      setTransferStatus("failed");
      setStatusMessage("Error: No file selected");
      toast.error("No file selected");
      return;
    }

    setStatusMessage(`Ingesting CSV data into ClickHouse table '${tableName}'...`);
    
    try {
      // In a real implementation, we would:
      // 1. Read the file using FileReader
      // 2. Parse the CSV (already done in FileUploader)
      // 3. Connect to ClickHouse using a suitable client library
      // 4. Create the table if needed
      // 5. Insert the data into ClickHouse

      // For now, we'll simulate the process
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        const csvData = e.target?.result as string;
        const lines = csvData.split('\n').filter(line => line.trim() !== '');
        const recordCount = Math.max(0, lines.length - 1); // Subtract 1 for header row
        
        // Mock delay for processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setTransferStatus("completed");
        setStatusMessage(`Successfully transferred ${recordCount.toLocaleString()} records to ClickHouse`);
        toast.success(`Data ingested successfully: ${recordCount.toLocaleString()} records`);
      };
      
      fileReader.onerror = () => {
        setTransferStatus("failed");
        setStatusMessage("Error reading file");
        toast.error("Failed to read file");
      };
      
      fileReader.readAsText(file);
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferStatus("failed");
      setStatusMessage("Error during data transfer to ClickHouse");
      toast.error("Data transfer failed");
    }
  };
  
  const transferClickHouseToFile = async () => {
    if (!selectedTable) {
      setTransferStatus("failed");
      setStatusMessage("Error: No table selected");
      toast.error("No table selected");
      return;
    }

    setStatusMessage(`Exporting data from ClickHouse table '${selectedTable}' to CSV...`);
    
    try {
      // Mock delay for processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const recordCount = Math.floor(Math.random() * 10000) + 1000;
      
      // In a real implementation, we would:
      // 1. Connect to ClickHouse using a suitable client library
      // 2. Query the data from the selected table with the selected columns
      // 3. Format the data as CSV
      // 4. Trigger a download of the generated CSV file
      
      setTransferStatus("completed");
      setStatusMessage(`Successfully exported ${recordCount.toLocaleString()} records to file '${filename}'`);
      toast.success(`Data exported successfully: ${recordCount.toLocaleString()} records`);
      
      // Simulate file download (in a real implementation)
      if (destinationType === "file") {
        setTimeout(() => {
          const element = document.createElement("a");
          const mockCsv = "id,name,value\n1,test,100\n2,test2,200";
          const file = new Blob([mockCsv], {type: "text/csv"});
          element.href = URL.createObjectURL(file);
          element.download = filename || "export.csv";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }, 500);
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferStatus("failed");
      setStatusMessage("Error during data export to file");
      toast.error("Data export failed");
    }
  };

  const handleTransfer = async () => {
    // Validation
    if (sourceType === "file") {
      // Validating file source
      if (!file || selectedFileColumns.length === 0) {
        toast.error("Please select a file and at least one column");
        setStatusMessage("Error: Please select a file and at least one column in the Source panel");
        return;
      }
      
      // Check destination (clickhouse)
      if (!tableName) {
        toast.error("Please enter a destination table name");
        setStatusMessage("Error: Please enter a destination table name");
        return;
      }
    } else if (sourceType === "clickhouse") {
      // Validating clickhouse source
      if (!selectedTable || selectedTableColumns.length === 0) {
        toast.error("Please select a table and at least one column");
        setStatusMessage("Error: Please select a table and at least one column in the Source panel");
        return;
      }
      
      // Check destination (file)
      if (!filename) {
        toast.error("Please enter a destination filename");
        setStatusMessage("Error: Please enter a destination filename");
        return;
      }
    }
    
    setTransferStatus("transferring");
    
    // Call the appropriate transfer function based on source type
    if (sourceType === "file" && destinationType === "clickhouse") {
      await transferFileToClickHouse();
    } else if (sourceType === "clickhouse" && destinationType === "file") {
      await transferClickHouseToFile();
    }
  };

  return {
    tableName,
    setTableName,
    filename,
    setFilename,
    handleTransfer
  };
};
