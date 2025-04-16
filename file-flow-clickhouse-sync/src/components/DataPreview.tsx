
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataPreviewProps {
  data: any[];
  columns: string[];
}

const DataPreview = ({ data, columns }: DataPreviewProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Data Preview</h3>
      <ScrollArea className="h-[250px] border rounded-md">
        <div className="p-1">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(column => (
                  <TableHead key={column} className="px-2 py-2 text-xs">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map(column => (
                    <TableCell key={`${rowIndex}-${column}`} className="px-2 py-2 text-xs">
                      {row[column] !== undefined ? String(row[column]) : ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
      <div className="text-xs text-muted-foreground">
        Showing {data.length} of {data.length > 100 ? "100+" : data.length} rows
      </div>
    </div>
  );
};

export default DataPreview;
