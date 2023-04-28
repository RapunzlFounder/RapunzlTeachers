import RecommendIcon from '@mui/icons-material/Recommend';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SuggestedArticles from '../../../constants/SuggestedArticles';

class RecommendedArticles extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='tile article-suggestions'>
        <div className='home-header-flex'>
          <RecommendIcon />
          <div className='home-header'>
            Articles To Help Get Started
          </div>
        </div>
        <div className='recommended-articles-flex'>
          {SuggestedArticles.map((item) => {
            // item.id Represents The Spot In The Array For The Article & We Pass This To The Articles Route
            // In Order To Render The Correct Article For The User
            return (
              <Link className='recommended-article' key={item.id} to={'/article/' + item.id}>
                <div className='recommended-article-title'>
                  {item.title}
                </div>
                <div className='recommended-article-text'>
                  {item.previewText}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Handles Colors Which Are Updated Throughout When MarketOpen Changes
    colors: state.userDetails.appColors,
    // Handles Which Asset Class User Currently Has Selected (Equities or Crypto)
    asset: state.gamesettings.asset,
  };
};

export default connect(mapStateToProps)(RecommendedArticles);
