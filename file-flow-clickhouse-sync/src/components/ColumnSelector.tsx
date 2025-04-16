
import { Checkbox } from "@/components/ui/checkbox";

interface ColumnSelectorProps {
  columns: string[];
  selectedColumns: string[];
  setSelectedColumns: (columns: string[]) => void;
  label?: string;
}

const ColumnSelector = ({ 
  columns, 
  selectedColumns, 
  setSelectedColumns,
  label = "Select columns"
}: ColumnSelectorProps) => {
  
  const toggleColumn = (column: string) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const toggleAllColumns = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns([...columns]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">{label}</label>
        <button 
          onClick={toggleAllColumns}
          className="text-xs text-blue-500 hover:underline"
          type="button"
        >
          {selectedColumns.length === columns.length ? "Deselect All" : "Select All"}
        </button>
      </div>
      
      <div className="border rounded-md p-3 max-h-[200px] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {columns.map(column => (
            <div key={column} className="flex items-center space-x-2">
              <Checkbox 
                id={`column-${column}`}
                checked={selectedColumns.includes(column)}
                onCheckedChange={() => toggleColumn(column)}
              />
              <label 
                htmlFor={`column-${column}`}
                className="text-sm cursor-pointer truncate"
              >
                {column}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        {selectedColumns.length} of {columns.length} columns selected
      </div>
    </div>
  );
};

export default ColumnSelector;
