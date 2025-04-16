
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface JoinInterfaceProps {
  tables: string[];
  onJoinQuery: (query: string) => void;
}

const JoinInterface = ({ tables, onJoinQuery }: JoinInterfaceProps) => {
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [joinCondition, setJoinCondition] = useState("");

  const addTable = (table: string) => {
    if (table && !selectedTables.includes(table)) {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const removeTable = (table: string) => {
    setSelectedTables(selectedTables.filter(t => t !== table));
  };

  const handleGenerateJoin = () => {
    if (selectedTables.length < 2 || !joinCondition) {
      return;
    }

    // In a real implementation, this would be sent to the backend
    // to construct the proper JOIN query
    const joinQuery = `
      SELECT * FROM ${selectedTables.join(', ')}
      WHERE ${joinCondition}
    `;
    
    onJoinQuery(joinQuery);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h3 className="text-sm font-medium">Multi-Table Join (Advanced)</h3>
      
      <div className="space-y-2">
        <label className="text-sm">Select tables to join:</label>
        <div className="flex gap-2">
          <Select onValueChange={addTable}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select table" />
            </SelectTrigger>
            <SelectContent>
              {tables.filter(t => !selectedTables.includes(t)).map(table => (
                <SelectItem key={table} value={table}>{table}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" disabled={!tables.length}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {selectedTables.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm">Selected tables:</label>
          <div className="flex flex-wrap gap-2">
            {selectedTables.map(table => (
              <div 
                key={table}
                className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
              >
                {table}
                <button onClick={() => removeTable(table)}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <label className="text-sm">Join condition:</label>
        <Textarea
          placeholder="e.g., table1.id = table2.id"
          value={joinCondition}
          onChange={(e) => setJoinCondition(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        disabled={selectedTables.length < 2 || !joinCondition}
        onClick={handleGenerateJoin}
      >
        Generate Join
      </Button>
    </div>
  );
};

export default JoinInterface;
