import React from 'react';
import NotFoundGraphic from '../../assets/images/Admin/NotFound.png';
import Footer from './Footer';
import '../../styles/Admin/General.css';
import { Link } from 'react-router-dom';

class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <div>
        <img alt='' className='not-found-image' src={NotFoundGraphic} />
        <div className='not-found-header'>
          We Can't Find What You're Looking For
        </div>
        <div className='not-found-text'>
          Perhaps there is a typo in the URL you searched, or we encountered a bug on our end. Click the button below to return to the Home Screen and continue browsing the Rapunzl Teacher Portal.
        </div>
        <Link to="/dashboard">
          <div className='not-found-button'>
            Return To Dashboard
          </div>
        </Link>
        <Footer />
      </div>
    );
   }
}

export default NotFoundPage;
