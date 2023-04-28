import React, { Component } from 'react';
import { Link, Navigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Header from '../components/Admin/Header';
import Footer from '../components/Admin/Footer';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TooNarrowIcon from '../assets/images/Admin/TooNarrow.png';
import SuggestedArticles from '../constants/SuggestedArticles';
import '../styles/Home/HomeScreen.css';
import '../styles/ArticleScreen.css';

class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handleLogout: false,
    }
  }

  // Handles Ensuring That When User Selects Logout That User Is Navigated Out of The App
  componentDidUpdate(prevProps) {
    if (prevProps.jwtToken !== this.props.jwtToken && (this.props.jwtToken === null || this.props.jwtToken === undefined)) {
      this.setState({ handleLogout: true });
    }
  }

  // Handles Figuring Out Next & Previous Articles For Buttons At Bottom Of Page
  getNextArticle(articleID) {
    if (SuggestedArticles.length > parseInt(articleID) + 1) {
      // Update Navigation Params To Increase By One
      return [`/article/${parseInt(articleID) + 1}`, SuggestedArticles[parseInt(articleID) + 1].title];
    } else {
      // Update Navigation Params To Set To Zero
      return [`/article/0`, SuggestedArticles[0].title];
    }
  }
  getBackArticle(articleID) {
    if (articleID - 1 < 0) {
      // Update Navigatio Params To Length Of SuggestedArticles Minus 1
      return [`/article/${parseInt(SuggestedArticles.length - 1)}`, SuggestedArticles[SuggestedArticles.length - 1].title];
    } else {
      // Update Navigation Params To Decrease By One
      return [`/article/${parseInt(articleID - 1)}`, SuggestedArticles[articleID - 1].title];
    }
  }

  render() {
    if (this.state.handleLogout) {
      return(
        <Navigate to="/login" replace={true} />
      );
    } else {
      const { articleID } = this.props.match.params;
      return(
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={false}
          className='route-container'
        >
          <Header />
          <div style={{ height: '1px' }} />
          <Container
            disableGutters={true}
            fixed={false}
            maxWidth={'md'}
            style={{ padding: '30px', marginTop: '50px', marginBottom: '90px', borderRadius: '5px' }}
          >
            <div className='not-available-container'>
              <img alt='' className='not-available-image' src={TooNarrowIcon} />
              <div className='not-available-title'>
                Your Browser Is Too Narrow
              </div>
              <div className='not-available-text'>
                At this point in time, Rapunzl's teacher portal is designed for computers and iPads. We do not provide a mobile version of our teacher portal.
              </div>
            </div>
            <div className='article-width-restriction'>
              <Link to='/dashboard'>
                <div className='article-back-button'>
                  Back To Dashboard
                </div>
              </Link>
              <h1>
                {SuggestedArticles[articleID].title}
              </h1>
              {SuggestedArticles[articleID].content.map((item, index) => {
                if (item.type === 'h1') {
                  return (
                    <h2 key={index}>
                      {item.text}
                    </h2>
                  )
                } else if (item.type === 'h2') {
                  return (
                    <h3 key={index}>
                      {item.text}
                    </h3>
                  )
                } else if (item.type === 'h3') {
                  return (
                    <h4 key={index}>
                      {item.text}
                    </h4>
                  )
                } else if (item.type === 'b') {
                  return (
                    <b key={index}>
                      {item.text}
                    </b>
                  )
                } else if (item.type === 'li') {
                  return (
                    <div key={index} className='article-list-item'>
                      - {item.text}
                    </div>
                  )
                } else {
                  return (
                    <p key={index}>
                      {item.text}
                    </p>
                  )
                }
              })}
              <div className='article-footer-flex'>
                <Link to={this.getBackArticle(articleID)[0]}>
                  <div className='article-footer-item'>
                    <KeyboardDoubleArrowLeftIcon className='article-footer-arrow' />
                    <div>
                      <div className='article-footer-header'>
                        View Previous
                      </div>
                      <div className='article-footer-item-text'>
                        {this.getBackArticle(articleID)[1]}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to={this.getNextArticle(articleID)[0]}>
                  <div className='article-footer-item'>
                    <div>
                      <div className='article-footer-header'>
                        View Next
                      </div>
                      <div className='article-footer-item-text'>
                        {this.getNextArticle(articleID)[1]}
                      </div>
                    </div>
                    <KeyboardDoubleArrowRightIcon className='article-footer-arrow'/>
                  </div>
                </Link>
              </div>
            </div>
          </Container>
          <Footer />
        </Container>
      );
    }
  }
}

export default ArticleScreen;
