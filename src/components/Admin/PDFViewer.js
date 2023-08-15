import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Document, Page, pdfjs } from "react-pdf";
import '../../styles/Admin/PDF.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from './Alert';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props) => {
  // Allows Us To Determine Current Page Number, Total Number Of Pages & Update These State Values
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // Allows Us To Toggle Visibility Of The Alert
  const [alertVisible, toggleAlert] = useState(false);

  // Function Component Equivalent Of ComponentDidUpdate Which Resets The State When Visibility Is Toggled
  // This Sets Page Back To 1 To Avoid Going Out Of Bounds On Different Resources.
  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    toggleAlert(false);
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
      <div className='pdf-loading-page-container'>
        <div className='pdf-loading-text'>
          Error Loading<br/>Document...
        </div>
      </div>
    )
  }
  
  // Returns A Loading Component While We Retrieve The PDF Or Render Each Page For The First Time
  function loadingPDFComponent() {
    return (
      <div className='pdf-loading-page-container'>
        <CircularProgress />
        <div className='pdf-loading-text'>
          Loading<br/>Document...
        </div>
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
      style={{ margin: 0, maxHeight: 'none', maxWidth: 'none' }}
    >
      <Alert
        visible={alertVisible}
        dismiss={() => toggleAlert(false)}
        title={'Google Slides Are Currently Locked'}
        message={'Your account is not permitted to access Google Slides for individual presentations and activities at this time. Please reach out to your point of contact at Rapunzl to upgrade your account.'}
      />
      <div className='pdf-container'>
        <div className='pdf-header-flex'>
          <div className='pdf-close-flex pdf-flex-no-hover' style={{ marginLeft: 40, display: 'block' }}>
            <div className='pdf-close-text' style={{ color: '#0ce0ab' }}>
              {props.pdfName}
            </div>
            <div className='pdf-close-text'>
              Page {pageNumber} of {numPages}
            </div>
          </div>
          <div title="Feature Disabled On Demo Accounts" onClick={() => toggleAlert(true)} className='google-slides-button-flex'>
            <LockClockOutlinedIcon className='google-slides-icon' />
            <div className='google-slides-button-text'>
              View In Google Slides
            </div>
          </div>
          <div title="Dismiss PDF" onClick={props.dismiss} className='pdf-close-flex' style={{ marginRight: 40 }}>
            <HighlightOffIcon className='pdf-close-icon' />
            <div className='pdf-close-text'>
              close
            </div>
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
            <div title="View Previous Page" onClick={() => _previousPDFPage()} className='pdf-button'>
              <KeyboardDoubleArrowLeftIcon className='pdf-button-icon' />
            </div>
          )}
          {pageNumber !== numPages && (
            <div title="View Next Page" onClick={() => _nextPDFPage()} className='pdf-button'>
              <KeyboardDoubleArrowRightIcon className='pdf-button-icon' />
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default PDFViewer;