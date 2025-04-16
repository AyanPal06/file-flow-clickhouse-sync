
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Database, Lock } from "lucide-react";

interface ClickHouseConnectorProps {
  connectionDetails: {
    host: string;
    port: string;
    database: string;
    username: string;
    jwt: string;
  };
  setConnectionDetails: (details: any) => void;
  connectionStatus: "idle" | "connecting" | "connected" | "failed";
  setConnectionStatus: (status: "idle" | "connecting" | "connected" | "failed") => void;
  onTablesLoaded: (tables: string[]) => void;
  setStatusMessage: (message: string) => void;
}

const ClickHouseConnector = ({
  connectionDetails,
  setConnectionDetails,
  connectionStatus,
  setConnectionStatus,
  onTablesLoaded,
  setStatusMessage
}: ClickHouseConnectorProps) => {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConnectionDetails({ ...connectionDetails, [name]: value });
  };

  const handleConnect = async () => {
    const { host, port, database, username, jwt } = connectionDetails;
    
    if (!host || !port || !database || !username || !jwt) {
      toast.error("All connection fields are required");
      setStatusMessage("Error: All connection fields are required");
      return;
    }
    
    setLoading(true);
    setConnectionStatus("connecting");
    setStatusMessage("Connecting to ClickHouse...");
    
    try {
      // Mock API call to connect to ClickHouse
      // In real implementation, would use ClickHouse client library:
      // 1. For Node.js: @clickhouse/client
      // 2. For Python: clickhouse-driver
      // 3. For Java: clickhouse-jdbc
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setConnectionStatus("connected");
      toast.success("Connected to ClickHouse successfully");
      setStatusMessage("Connected to ClickHouse");
      
      // Fetch tables after successful connection
      fetchTables();
    } catch (error) {
      console.error("Connection error:", error);
      setConnectionStatus("failed");
      toast.error("Failed to connect to ClickHouse");
      setStatusMessage("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchTables = async () => {
    setLoading(true);
    setStatusMessage("Fetching tables...");
    
    try {
      // Mock API call to get tables
      // In real implementation with ClickHouse:
      // const query = `SELECT name FROM system.tables WHERE database = '${connectionDetails.database}'`;
      // const result = await client.query({query}).toPromise();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Using sample tables mentioned in the assignment
      const mockTables = [
        "uk_price_paid",  // example dataset mentioned in requirements
        "ontime",         // example dataset mentioned in requirements
        "customer_data", 
        "transaction_log", 
        "website_analytics"
      ];
      
      onTablesLoaded(mockTables);
      toast.success(`Found ${mockTables.length} tables`);
      setStatusMessage(`Found ${mockTables.length} tables`);
    } catch (error) {
      console.error("Error fetching tables:", error);
      toast.error("Failed to fetch tables");
      setStatusMessage("Error fetching tables");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Host <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="host"
            value={connectionDetails.host}
            onChange={handleInputChange}
            placeholder="localhost or play.clickhouse.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Port <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="port"
            value={connectionDetails.port}
            onChange={handleInputChange}
            placeholder="8123 (HTTP) or 9440 (HTTPS)"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Database <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          name="database"
          value={connectionDetails.database}
          onChange={handleInputChange}
          placeholder="default"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          name="username"
          value={connectionDetails.username}
          onChange={handleInputChange}
          placeholder="default"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          JWT Token <span className="text-red-500">*</span>
          <span className="text-xs text-muted-foreground ml-1">
            (For authentication with ClickHouse Cloud)
          </span>
        </label>
        <div className="relative">
          <Input
            type="password"
            name="jwt"
            value={connectionDetails.jwt}
            onChange={handleInputChange}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
      </div>
      
      <Button 
        onClick={handleConnect} 
        disabled={loading || connectionStatus === "connecting"}
        className="w-full"
      >
        <Database className="mr-2 h-4 w-4" />
        {connectionStatus === "connecting" ? "Connecting..." : 
         connectionStatus === "connected" ? "Reconnect" : "Connect"}
      </Button>
      
      {connectionStatus === "connected" && (
        <div className="text-xs text-green-600">
          ✅ Connected to ClickHouse at {connectionDetails.host}:{connectionDetails.port}
        </div>
      )}
    </div>
  );
};

export default ClickHouseConnector;
