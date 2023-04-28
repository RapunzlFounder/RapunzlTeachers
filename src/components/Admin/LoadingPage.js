import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import '../../styles/Admin/General.css';

class LoadingPage extends React.PureComponent {
  render() {
    return (
      <div className='flex-loading-container'>
        <CircularProgress />
        <div className='loading-page-header'>
          Loading Content...
        </div>
        <div className='loading-page-text'>
          This Should Only Take A Moment.<br/>If you're having issues, please refresh the browser.
        </div>
      </div>
    );
   }
}

export default LoadingPage;
