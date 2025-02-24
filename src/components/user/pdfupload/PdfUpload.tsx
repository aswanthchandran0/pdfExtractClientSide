import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileUp, FileWarning } from 'lucide-react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { processPdfApi } from '../../../service/user/api';
import toast from 'react-hot-toast';

// Configure PDF.js worker (CDN version)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  
  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file));
      setFileName(`processed_${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`);
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

     // Reset all errors at submission start
     setError('');
     setFileNameError('');
     
     // Validate filename
     let isValid = true;
     let errorMsg = '';
     
     if (!fileName.trim()) {
       isValid = false;
       errorMsg = 'File name is required';
       toast.error('File name is required')
     } else if (/[\\/:*?"<>|]/.test(fileName)) {
       isValid = false;
       errorMsg = 'Invalid characters (\\, /, :, *, ?, ", <, >, |)';
        toast.error('Invalid characters (\\, /, :, *, ?, ", <, >, |)')
     } else if (fileName.toLowerCase().endsWith('.pdf')) {
       isValid = false;
       errorMsg = 'Omit .pdf extension - it will be added automatically';
       toast.error('Omit .pdf extension - it will be added automatically')
     }
 
     if (!isValid) {
       setFileNameError(errorMsg);
       return;
     }
     setFileNameError('');

     
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
      link.download = `${fileName.replace(/[^a-zA-Z0-9.-]/g, '')}.pdf`;
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      setSelectedPages([])
      setPdfFile(null)
      setPdfUrl(null)
      setNumPages(0)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process PDF';
      setError(errorMessage);
      console.error('PDF Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };



  // Add these functions inside the component
const movePageUp = (index: number) => {
  if (index === 0) return;
  const newPages = [...selectedPages];
  [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
  setSelectedPages(newPages);
};

const movePageDown = (index: number) => {
  if (index === selectedPages.length - 1) return;
  const newPages = [...selectedPages];
  [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
  setSelectedPages(newPages);
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

    {/* Add in the return section (after file upload area, before PDF preview) */}
  {pdfFile && (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Output File Name
      </label>
      <input
        type="text"
        value={fileName}
        onChange={(e) => {setFileName(e.target.value) 
       setFileNameError(''); // Clear filename error when typing
      setError(''); // Clear general errors too
        }}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter  file name"
      />
       {fileNameError && (
            <p className="mt-1 text-sm text-red-500">{fileNameError}</p>
          )}
      <p className="mt-1 text-sm text-gray-500">
        Default: processed_{pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}
      </p>
    </div>
  )}
  
      {/* PDF Preview and Selection */}
      {pdfUrl && (
        <div className="mt-8 ">
          <h2 className="mb-4 text-xl font-semibold">Select Pages</h2>
          <div className='overflow-y-auto rounded border max-h-[70vh] shadow-sm  hover:shadow-md'>
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
          </div>
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
                    `Process ${selectedPages.length} Page${selectedPages.length !== 1 ? 's' : ''} in Order`
                )}
              </button>
            </div>
          )}
        </div>
      )}


      {/* Add this section after the Document component */}
{selectedPages.length > 0 && (
  <div className="mt-6">
    <h3 className="mb-2 text-lg font-medium">Selected Pages Order</h3>
    <div className="mb-4 text-sm text-gray-600">
      Adjust the order using the arrows
    </div>
    <ul className="space-y-2">
      {selectedPages.map((page, index) => (
        <li
          key={page}
          className="flex items-center justify-between p-2 rounded-md bg-gray-50"
        >
          <span>Page {page}</span>
          <div className="flex gap-2">
            <button
              onClick={() => movePageUp(index)}
              disabled={index === 0}
              className="px-2 py-1 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↑
            </button>
            <button
              onClick={() => movePageDown(index)}
              disabled={index === selectedPages.length - 1}
              className="px-2 py-1 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↓
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default PdfUpload;