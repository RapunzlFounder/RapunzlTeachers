import React from 'react';
import { connect } from 'react-redux';

class ExpiringProductHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      closedPopup: false,
      canClose: true,
    }
  }

  // Finds Expiration Date & Converts Into Readable Format
  componentDidMount() {

  }
  
  // Closes The Popup for the user to continue their session, unless it is within the final month.
  _handleClosingPopupBanner = () => {
    this.setState({ closedPopup: true });
  }

  // TODO: PRODUCTS - Check Current Product expiresAt in currentProduct and run a time check
  // to determine if the product is 90 days from expiration, 30 days from expiration, 14 days, 7 days
  // and color should increase in severity
  render() {
    if (true && !this.props.closedPopup) {
      return (
        <div className='header-container'>

        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Used To Disable Menu On Home Until Data Is Ready
    userdetailsLoading: state.userDetails.loading,
    // When we show the PDFViewer Component, We Hide The Header & Use Redux To Store The Current State
    pdfVisible: state.dashboard.pdfVisible,
  };
};

export default connect(mapStateToProps)(ExpiringProductHeader);
