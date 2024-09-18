// PDFViewer.tsx

import React from 'react';

interface PDFViewerProps {
  vidCheck: string | null;
  pdfThumbnail: string; // Replace 'string' with the actual type of your PDF thumbnail
}

const PDFViewer: React.FC<PDFViewerProps> = ({ vidCheck, pdfThumbnail }) => {
  return (
    <>
      {vidCheck === 'PDF' && (
        <div className="p-4 idk rounded-md flex flex-wrap custom-hidden justify-center items-center video-container" style={{ height: '400px', marginTop: '15px', marginRight: '20px', marginLeft: '10px' }}>
          {/* Add your image tag with border-radius styling */}
          <img src={pdfThumbnail} alt="PDF Thumbnail" style={{ borderRadius: '10px', width: '100%', height: '100%' }} />
        </div>
      )}
    </>
  );
};

export default PDFViewer;
