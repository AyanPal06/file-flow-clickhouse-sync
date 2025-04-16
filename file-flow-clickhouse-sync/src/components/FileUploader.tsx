
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File | null) => void;
  onSchemaFetched: (columns: string[]) => void;
  onPreviewFetched: (data: any[]) => void;
  setStatusMessage: (message: string) => void;
}

const FileUploader = ({ 
  onFileUpload, 
  onSchemaFetched, 
  onPreviewFetched,
  setStatusMessage 
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<string>(",");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileUpload(selectedFile);
      setStatusMessage(`Selected file: ${selectedFile.name}`);
      toast.success(`File selected: ${selectedFile.name}`);
      
      // Automatically start upload process
      uploadFileAndFetchSchema(selectedFile);
    }
  };

  const parseCSV = (csvText: string, delimiter: string): { columns: string[], data: any[] } => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      return { columns: [], data: [] };
    }
    
    // Extract headers (first line)
    const headers = lines[0].split(delimiter).map(header => header.trim().replace(/^"(.+)"$/, '$1'));
    
    // Parse data rows
    const data = [];
    for (let i = 1; i < Math.min(lines.length, 6); i++) {
      const row: Record<string, any> = {};
      const values = lines[i].split(delimiter).map(value => value.trim().replace(/^"(.+)"$/, '$1'));
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      data.push(row);
    }
    
    return { columns: headers, data };
  };

  const uploadFileAndFetchSchema = async (selectedFile: File) => {
    if (!selectedFile) return;
    
    setLoading(true);
    setStatusMessage("Uploading and processing file...");

    try {
      // Read the file content
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvText = e.target?.result as string;
          const { columns, data } = parseCSV(csvText, delimiter);
          
          if (columns.length === 0) {
            throw new Error("No columns found in the CSV file");
          }
          
          onSchemaFetched(columns);
          toast.success(`Schema fetched: ${columns.length} columns found`);
          setStatusMessage(`Found ${columns.length} columns in the file`);
          
          onPreviewFetched(data);
          toast.success("Preview data loaded");
          setStatusMessage("File processed successfully. Please select columns for transfer.");
          setLoading(false);
        } catch (error) {
          console.error("Error parsing CSV:", error);
          toast.error("Failed to parse CSV file");
          setStatusMessage("Error parsing CSV file");
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file");
        setStatusMessage("Error reading file");
        setLoading(false);
      };
      
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process file");
      setStatusMessage("Error processing file");
      setLoading(false);
    }
  };

  const uploadFile = () => {
    if (!file) {
      toast.error("Please select a file first");
      setStatusMessage("Error: Please select a file first");
      return;
    }
    
    uploadFileAndFetchSchema(file);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CSV Delimiter</label>
          <Input 
            type="text" 
            value={delimiter} 
            onChange={(e) => setDelimiter(e.target.value)}
            placeholder="," 
            maxLength={1}
            className="w-full"
          />
        </div>
        
        <Card 
          className="border-dashed border-2 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="flex flex-col items-center">
            {file ? (
              <div className="text-center">
                <FileText className="w-10 h-10 text-blue-500 mb-2" />
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-xs text-green-500 mt-1">
                  {loading ? "Processing..." : "File selected"}
                </p>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click here to select a CSV file</p>
              </>
            )}
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={uploadFile}
          disabled={!file || loading}
          className="flex-1"
        >
          {loading ? 'Processing...' : 'Process File'}
        </Button>
      </div>
      
      {file ? (
        <div className="text-xs text-muted-foreground">
          <p>✅ Select a file (done)</p>
          <p>{loading ? '⏳ Processing file...' : '✅ Process file (done)'}</p>
          <p>{loading ? '⏳ Fetching schema...' : '✅ Fetch schema (done)'}</p>
          <p>👉 Select columns to include in the transfer</p>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground">
          <p>1. Select a CSV file</p>
          <p>2. File will be automatically processed</p>
          <p>3. Select columns to include in the transfer</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
