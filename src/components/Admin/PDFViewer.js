import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Document, Page, pdfjs } from "react-pdf";
import '../../styles/Admin/PDF.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props) => {
  // Allows Us To Determine Current Page Number, Total Number Of Pages & Update These State Values
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Function Component Equivalent Of ComponentDidUpdate Which Resets The State When Visibility Is Toggled
  // This Sets Page Back To 1 To Avoid Going Out Of Bounds On Different Resources.
  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
  }, [props.visible]);

  // Updates The Number Of Pages When The PDF Successfully Loads
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Handles Incrementing The Page Number By One. Will Not Exceed The Total Number Of Pages
  function _nextPDFPage() {
    if (pageNumber + 1 <= numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  // Handles Decrementing The Page Number By One. Will Not Decrease Below 1 For The First Page Of The PDF.
  function _previousPDFPage() {
    if (pageNumber - 1 > 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  // Returns Component If There Is An Error Loading The PDF
  function errorPDFComponent() {
    return (
      <div>
  
      </div>
    )
  }
  
  // Returns A Loading Component While We Retrieve The PDF Or Render Each Page For The First Time
  function loadingPDFComponent() {
    return (
      <div className='pdf-loading-page-container'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Dialog
      open={props.visible}
      onClose={props.dismiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={false}
    >
      <div className='pdf-container'>
        <div onClick={props.dismiss} className='pdf-close-flex'>
          <HighlightOffIcon className='pdf-close-icon' />
          <div className='pdf-close-text'>
            close
          </div>
        </div>
        <Document
          file={props.pdfURL}
          onContextMenu={(e) => e.preventDefault()}
          className="pdf-document"
          pageLayout='singlePage'
          pageMode='fullScreen'
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            orientation={props.orientation}
            wrap={false}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            renderForms={false}
            className='pdf-page'
            error={errorPDFComponent}
            noData={errorPDFComponent}
            loading={loadingPDFComponent}
          />
        </Document>
        <div className='pdf-page-number-text'>
          Page {pageNumber} of {numPages}
        </div>
        <div className='pdf-button-flex'>
          {pageNumber !== 1 && (
            <div onClick={() => _previousPDFPage()} className='pdf-button'>
              <KeyboardDoubleArrowLeftIcon className='pdf-button-icon' />
            </div>
          )}
          {pageNumber !== numPages && (
            <div onClick={() => _nextPDFPage()} className='pdf-button'>
              <KeyboardDoubleArrowRightIcon className='pdf-button-icon' />
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default PDFViewer;