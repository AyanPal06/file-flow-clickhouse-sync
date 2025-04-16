
import React from "react";
import { Input } from "@/components/ui/input";

interface DestinationInputsProps {
  destinationType: "file" | "clickhouse";
  tableName: string;
  setTableName: (value: string) => void;
  filename: string;
  setFilename: (value: string) => void;
}

const DestinationInputs: React.FC<DestinationInputsProps> = ({
  destinationType,
  tableName,
  setTableName,
  filename,
  setFilename,
}) => {
  if (destinationType === "clickhouse") {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">
          Destination Table Name <span className="text-red-500">*</span>
          <span className="text-xs text-muted-foreground ml-1">
            (The ClickHouse table where data will be inserted)
          </span>
        </label>
        <Input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter table name (e.g., my_new_table)"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Destination Filename <span className="text-red-500">*</span>
        <span className="text-xs text-muted-foreground ml-1">
          (The CSV file to be created)
        </span>
      </label>
      <Input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="output.csv"
      />
    </div>
  );
};

export default DestinationInputs;
