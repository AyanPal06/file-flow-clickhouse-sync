
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/FileUploader";
import ClickHouseConnector from "@/components/ClickHouseConnector";
import DataPreview from "@/components/DataPreview";
import ColumnSelector from "@/components/ColumnSelector";
import StatusDisplay from "@/components/StatusDisplay";
import DataTransferForm from "@/components/DataTransferForm";

const Index = () => {
  const [selectedSource, setSelectedSource] = useState<"file" | "clickhouse">("file");
  const [selectedDestination, setSelectedDestination] = useState<"file" | "clickhouse">("clickhouse");
  const [file, setFile] = useState<File | null>(null);
  const [fileColumns, setFileColumns] = useState<string[]>([]);
  const [selectedFileColumns, setSelectedFileColumns] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "connected" | "failed">("idle");
  const [clickHouseTables, setClickHouseTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [selectedTableColumns, setSelectedTableColumns] = useState<string[]>([]);
  const [transferStatus, setTransferStatus] = useState<"idle" | "transferring" | "completed" | "failed">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [connectionDetails, setConnectionDetails] = useState({
    host: "play.clickhouse.com",
    port: "443",
    database: "default",
    username: "explorer",
    jwt: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYmY3N2M1Y2MtMWVkNy00MDQ0LWE5ZTQtN2FiMWI0NDRmOTAxIiwiZXhwIjoxNzQ2MDc2NjkwLCJsb2dpbiI6ImV4cGxvcmVyIiwic2NvcGVzIjpbInNlcnZpY2UiXSwic2VydmljZV9pZCI6IjI5YmQyMWE0LTUyYjUtNDYwNi1iZDE1LTk1NmNiYzgwNTI3NiIsInRva2VuX2lkIjoiNjcxMjk2ZmItM2M1NS00MDc1LWFmYmItOGZjYzk0NTU3OGIyIn0.uAQ-EbKCWnJPW6U0i5PuSi-MeUHxzZSbJmgO3vP3Z-_Bx_0YrUOgziLw61s_zT5K60ZbfCR_Uj5Cxc21BDKZ5C7I0bqFqeLSCWJJz_pj2yH6q_qqJh_cPeP6gm2G5P7PIAePrObOrvh47FEh0LDGNJNfLc_7ej8NCyumHOw1BqMMTDqI-PkhglUOR-Vj0UlA-rOKF_sNcB9vz-KYLcmWZPZVEQSrP2ZDJ91AmNBMkJqTjkIahTHMbXL3GtQKfmVdnHvCrOkH1Kxl1-0YcMgn25uflWZmXB7W1NOZMn0ECsqrwFz-4nqN-yYZxwcrHJsNnS3zhWQZB7cM3I_8QJ34Og"
  });

  const handleSourceChange = (value: "file" | "clickhouse") => {
    setSelectedSource(value);
    setSelectedDestination(value === "file" ? "clickhouse" : "file");
    
    // Reset status on source change
    setTransferStatus("idle");
    setStatusMessage("");
  };

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    fetchTableColumns(tableName);
  };

  const fetchTableColumns = async (tableName: string) => {
    if (!tableName) return;
    
    setStatusMessage(`Fetching columns for table '${tableName}'...`);
    
    try {
      // Mock API call to get columns
      // In real implementation:
      // const query = `SELECT name, type FROM system.columns WHERE database = '${connectionDetails.database}' AND table = '${tableName}'`;
      // const result = await client.query({query}).toPromise();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let mockColumns: string[] = [];
      
      // Generate different columns based on selected table (matching sample datasets)
      if (tableName === "uk_price_paid") {
        mockColumns = ["id", "price", "date_of_transfer", "postcode", "property_type", "old_new", "duration", "town", "district", "county"];
      } else if (tableName === "ontime") {
        mockColumns = ["Year", "Quarter", "Month", "DayofMonth", "DayOfWeek", "FlightDate", "UniqueCarrier", "AirlineID", "Carrier", "TailNum", "FlightNum"];
      } else {
        // Generic columns for other tables
        mockColumns = ["id", "name", "created_at", "updated_at", "status", "amount", "category", "description"];
      }
      
      setTableColumns(mockColumns);
      // Auto-select all columns
      setSelectedTableColumns(mockColumns);
      setStatusMessage(`Found ${mockColumns.length} columns in table '${tableName}'`);
      
      // Fetch preview data for the selected table
      fetchTablePreview(tableName, mockColumns);
    } catch (error) {
      console.error("Error fetching columns:", error);
      setStatusMessage(`Error fetching columns for table '${tableName}'`);
    }
  };

  const fetchTablePreview = async (tableName: string, columns: string[]) => {
    if (!tableName || columns.length === 0) return;
    
    setStatusMessage(`Loading preview data for table '${tableName}'...`);
    
    try {
      // Mock API call to get preview data
      // In real implementation:
      // const query = `SELECT ${columns.join(', ')} FROM ${tableName} LIMIT 100`;
      // const result = await client.query({query}).toPromise();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock preview data based on the columns
      const mockPreviewData = Array(5).fill(null).map((_, index) => {
        const row: Record<string, any> = {};
        columns.forEach(column => {
          if (column.toLowerCase().includes('id')) {
            row[column] = 10000 + index;
          } else if (column.toLowerCase().includes('date') || column.toLowerCase().includes('time')) {
            row[column] = "2023-04-15";
          } else if (column.toLowerCase().includes('price') || column.toLowerCase().includes('amount')) {
            row[column] = 1000 + (index * 100);
          } else if (column.toLowerCase().includes('name') || column.toLowerCase().includes('type')) {
            const types = ["Standard", "Premium", "Basic", "Enterprise", "Custom"];
            row[column] = types[index % types.length];
          } else {
            row[column] = `Value ${index + 1}`;
          }
        });
        return row;
      });
      
      setPreviewData(mockPreviewData);
      setStatusMessage(`Preview data loaded for table '${tableName}'`);
    } catch (error) {
      console.error("Error fetching preview data:", error);
      setStatusMessage(`Error loading preview data for table '${tableName}'`);
    }
  };

  // Auto-select all file columns when they're loaded
  useEffect(() => {
    if (fileColumns.length > 0) {
      setSelectedFileColumns(fileColumns);
    }
  }, [fileColumns]);

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bidirectional ClickHouse & CSV File Ingestion Tool
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Panel */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Source</h2>
            <Tabs defaultValue="file" onValueChange={(value) => handleSourceChange(value as "file" | "clickhouse")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="file">Flat File (CSV)</TabsTrigger>
                <TabsTrigger value="clickhouse">ClickHouse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="file" className="space-y-4">
                <FileUploader 
                  onFileUpload={setFile} 
                  onSchemaFetched={setFileColumns}
                  onPreviewFetched={setPreviewData}
                  setStatusMessage={setStatusMessage}
                />
                
                {fileColumns.length > 0 && (
                  <ColumnSelector 
                    columns={fileColumns} 
                    selectedColumns={selectedFileColumns}
                    setSelectedColumns={setSelectedFileColumns}
                    label="Select columns to transfer"
                  />
                )}
                
                {previewData.length > 0 && (
                  <DataPreview data={previewData} columns={fileColumns} />
                )}
              </TabsContent>
              
              <TabsContent value="clickhouse" className="space-y-4">
                <ClickHouseConnector 
                  connectionDetails={connectionDetails}
                  setConnectionDetails={setConnectionDetails}
                  connectionStatus={connectionStatus}
                  setConnectionStatus={setConnectionStatus}
                  onTablesLoaded={setClickHouseTables}
                  setStatusMessage={setStatusMessage}
                />
                
                {clickHouseTables.length > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select table:</label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background"
                        value={selectedTable}
                        onChange={(e) => handleTableSelect(e.target.value)}
                      >
                        <option value="">Select a table</option>
                        {clickHouseTables.map(table => (
                          <option key={table} value={table}>{table}</option>
                        ))}
                      </select>
                    </div>
                    
                    {tableColumns.length > 0 && (
                      <ColumnSelector 
                        columns={tableColumns} 
                        selectedColumns={selectedTableColumns}
                        setSelectedColumns={setSelectedTableColumns}
                        label="Select columns to transfer"
                      />
                    )}
                    
                    {previewData.length > 0 && selectedTable && (
                      <DataPreview data={previewData} columns={tableColumns} />
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Destination Panel */}
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Destination</h2>
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-muted rounded-md">
                {selectedDestination === "file" ? "Flat File (CSV)" : "ClickHouse"}
              </span>
            </div>
            
            <DataTransferForm 
              sourceType={selectedSource}
              destinationType={selectedDestination}
              file={file}
              selectedFileColumns={selectedFileColumns}
              connectionDetails={connectionDetails}
              selectedTable={selectedTable}
              selectedTableColumns={selectedTableColumns}
              transferStatus={transferStatus}
              setTransferStatus={setTransferStatus}
              setStatusMessage={setStatusMessage}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Status Display */}
      <div className="mt-6">
        <StatusDisplay 
          connectionStatus={connectionStatus}
          transferStatus={transferStatus}
          message={statusMessage}
        />
      </div>
    </div>
  );
};

export default Index;
