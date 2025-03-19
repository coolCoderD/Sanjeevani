
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, Eye, Download, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for demonstration purposes
// In a real application, this would come from an API or database
const initialReports = [
  { id: 1, name: 'Blood Test Report', date: '2023-10-15', type: 'PDF', size: '1.2 MB' },
  { id: 2, name: 'X-Ray Results', date: '2023-09-22', type: 'JPEG', size: '3.7 MB' },
  { id: 3, name: 'Annual Health Checkup', date: '2023-08-05', type: 'PDF', size: '2.5 MB' },
];

const MedicalReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [isUploading, setIsUploading] = useState(false);
  const [newReport, setNewReport] = useState({ name: '', file: null as File | null });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewReport({
        name: file.name.split('.')[0], // Default name from filename
        file
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReport({
      ...newReport,
      name: e.target.value
    });
  };

  const handleUpload = () => {
    if (!newReport.file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newReportEntry = {
        id: Date.now(),
        name: newReport.name || newReport.file.name.split('.')[0],
        date: new Date().toISOString().split('T')[0],
        type: newReport.file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: `${(newReport.file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setReports([newReportEntry, ...reports]);
      setNewReport({ name: '', file: null });
      setIsUploading(false);
      
      toast({
        title: "Upload successful",
        description: "Your medical report has been uploaded successfully"
      });
    }, 1500);
  };

  const handleDelete = (id: number) => {
    setReports(reports.filter(report => report.id !== id));
    toast({
      title: "Report deleted",
      description: "The medical report has been removed"
    });
  };

  const handlePreview = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const handleDownload = (report: typeof reports[0]) => {
    // In a real app, this would download the actual file
    toast({
      title: "Download started",
      description: `Downloading ${report.name}`
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Card className="shadow-lg border-health-100">
          <CardHeader className="bg-gradient-to-r from-health-500 to-health-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Medical Reports</CardTitle>
            <CardDescription className="text-health-50">
              Upload and manage your medical records
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="health" className="gap-2">
                    <Upload size={18} />
                    Upload New Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Medical Report</DialogTitle>
                    <DialogDescription>
                      Upload your medical reports securely. Supported formats: PDF, JPG, PNG.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="report-file">Select File</Label>
                      <Input
                        id="report-file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </div>
                    {newReport.file && (
                      <div className="grid gap-2">
                        <Label htmlFor="report-name">Report Name</Label>
                        <Input
                          id="report-name"
                          placeholder="Enter report name"
                          value={newReport.name}
                          onChange={handleNameChange}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewReport({ name: '', file: null })}>
                      Cancel
                    </Button>
                    <Button 
                      variant="health" 
                      onClick={handleUpload}
                      disabled={isUploading || !newReport.file}
                    >
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {reports.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No reports found</AlertTitle>
                <AlertDescription>
                  You haven't uploaded any medical reports yet. Upload your first report to get started.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileText size={16} className="text-health-500" />
                          {report.name}
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handlePreview(report)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye size={16} />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDownload(report)}
                              className="h-8 w-8 p-0"
                            >
                              <Download size={16} />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDelete(report.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedReport?.name}
            </DialogTitle>
            <DialogDescription>
              Uploaded on {selectedReport?.date} • {selectedReport?.type} • {selectedReport?.size}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] w-full bg-slate-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <FileText size={64} className="mx-auto text-health-500 opacity-50" />
              <p className="mt-4 text-sm text-muted-foreground">
                Preview is not available in this demo.
                <br />
                In a real application, the document would be displayed here.
              </p>
            </div>
          </div>
          <DialogFooter className="flex justify-between items-center">
            <div>
              <Button variant="outline" size="sm" onClick={() => setPreviewOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex gap-2">
              {selectedReport && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(selectedReport)}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      if (selectedReport) {
                        handleDelete(selectedReport.id);
                        setPreviewOpen(false);
                      }
                    }}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MedicalReports;
