import React from 'react';
import AppStoreGraphic from '../../assets/images/Admin/AppStore.png';
import GooglePlayGraphic from '../../assets/images/Admin/GooglePlay.png';
import Container from '@mui/material/Container';
import '../../styles/Admin/Footer.css';

class Footer extends React.PureComponent {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container
        disableGutters={true}
        fixed={false}
        maxWidth={'md'}
        style={{ marginTop: '40px' }}
      >
        <div className='footer-text'>
          Pricing data is provided by Nasdaq Inc and Coinbase Inc. All information provided "as is" for informational purposes only. This information is not intended for trading purposes nor is it intended as advice. Neither Rapunzl nor any of its independent providers is liable for informational errors, incompleteness, or delays, or for actions taken in reliance on information contained herein. By accessing the Rapunzl platform you agree not to redistribute the information found therein.
          {'\n'}
          The information contained on this website and from any communication related to this website is for information purposes only. Rapunzl Investments LLC (Rapunzl) does not hold itself out as providing any legal, financial or other advice. Rapunzl also does not make any recommendation or endorsement as to any investment, advisor or other service or product or to any material submitted by third parties or linked to this website. In addition, Rapunzl does not offer any advice regarding the nature, potential value or suitability of any particular investment, security or investment strategy. The material on this website does not constitute advice and you should not rely on any material in this website to make (or refrain from making) any decision or take (or refrain from making) any action. All investment, borrowing or tax decisions should be made with the advice of an appropriately qualified and licensed advisor.
        </div>
        <hr className='footer-divider'/>
        <div className='footer-header'>
          Create A Free Rapunzl Account
          <br/>& Trade Alongside Your Class
        </div>
        <div className='footer-flex'>
          <button 
            href="https://apps.apple.com/us/app/rapunzl-invest-compete-win/id1222181232"
            className='footer-app-button'
          >
            <img
              alt="App Store Download Button"
              src={AppStoreGraphic}
              className='appstore-image'
            />
          </button>
          <button 
            href="https://play.google.com/store/apps/details?id=com.rapunzlinvestments.app2"
            className='footer-app-button'
          >
            <img
              alt="Google Play Download Button"
              src={GooglePlayGraphic}
              className='google-play-image'
            />
          </button>
        </div>
        <button
          href="https://www.rapunzlinvestments.com"
          className="website-button"
        >
          View Rapunzl Website
        </button>
        <div className='copyright-text'>
          © 2020 Rapunzl. All rights reserved.
        </div>
      </Container>
    );
   }
}

export default Footer;
