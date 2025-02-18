import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileUp, FileWarning } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { processPdfApi } from '../../../service/user/api';

// Configure PDF.js worker (CDN version)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const togglePage = (page: number) => {
    setSelectedPages(prev => 
      prev.includes(page) 
        ? prev.filter(p => p !== page) 
        : [...prev, page]
    );
  };

  
  const handleSubmit = async () => {
    if (!pdfFile || selectedPages.length === 0) return;
    setIsProcessing(true);
    setError('');
  
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      formData.append('pages', JSON.stringify(selectedPages));
  
      // Call the API to get the Base64-encoded PDF
      const response = await processPdfApi(formData);
  
      // Extract the Base64 string from the response
      const pdfBase64 = response.data.pdfBase64;
  
      // Create a download link using the Base64 string
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = `processed_${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process PDF';
      setError(errorMessage);
      console.error('PDF Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      {/* File Upload Area */}
      <div className="p-8 mb-8 text-center border-2 border-gray-300 border-dashed rounded-lg">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="flex flex-col items-center">
            {error ? (
              <FileWarning className="w-12 h-12 mb-4 text-red-500" />
            ) : (
              <FileUp className="w-12 h-12 mb-4 text-blue-500" />
            )}
            <p className="text-lg font-medium">
              {pdfFile ? pdfFile.name : 'Click to upload PDF'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {error || 'Max file size: 50MB'}
            </p>
          </div>
        </label>
      </div>

      {/* PDF Preview and Selection */}
      {pdfUrl && (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Select Pages</h2>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
            loading={<div className="text-center">Loading PDF...</div>}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={`page_${i + 1}`}
                onClick={() => togglePage(i + 1)}
                className={`relative cursor-pointer border-2 ${
                  selectedPages.includes(i + 1)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-transparent'
                }`}
              >
                <Page
                  pageNumber={i + 1}
                  width={200}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
                <div className="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full bottom-2 right-2">
                  {i + 1}
                </div>
                {selectedPages.includes(i + 1) && (
                  <div className="absolute p-1 text-white bg-blue-500 rounded-full top-2 right-2">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </Document>

          {numPages > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                disabled={isProcessing || selectedPages.length === 0}
                className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  'Processing...'
                ) : (
                  `Process ${selectedPages.length} Selected Pages`
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfUpload;