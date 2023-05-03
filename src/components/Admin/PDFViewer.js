import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Document, Page, pdfjs } from "react-pdf";
import '../../styles/Admin/PDF.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (pdfURL, visible, dismiss) => (
  <Dialog
    open={visible}
    onClose={dismiss}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <div className='container'>
      <Document
        file={pdfURL}
        onContextMenu={(e) => e.preventDefault()}
        className="pdf-container"
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  </Dialog>
); 

export default PDFViewer;