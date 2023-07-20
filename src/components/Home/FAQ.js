import React from 'react';
import { connect } from 'react-redux';
import { setMenuTab } from '../../ActionTypes/dashboardActions';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import '../../styles/Home/Support.css';
import SupportText from '../../constants/FAQ';

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandedPanel: false,
      expandedSubPanel: false,
      message: '',
      alertVisible: false,
      alertTitle: '',
      alertMessage: ''
    }
  }

  // Resets Component State When Visibility Is Toggled To Reset FAQ Titles Expanded
  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        expandedPanel: false,
        expandedSubPanel: false,
        message: '',
        alertVisible: false,
        alertTitle: '',
        alertMessage: ''
      });
    }
  }

  // Updates Expanded Panel and Handles Closing Existing If Clicked Twice
  // Conditional In Render Handles Keeping Only One Panel Open
  handleChange = (newPanel) => {
    // eslint-disable-next-line
    if (newPanel == this.state.expandedPanel) {
      this.setState({ expandedPanel: false, expandedSubPanel: false });
    } else {
      this.setState({ expandedPanel: newPanel, expandedSubPanel: false });
    }
  };

  handleSubChange = (newPanel) => {
    // eslint-disable-next-line
    if (newPanel == this.state.expandedSubPanel) {
      this.setState({ expandedSubPanel: false });
    } else {
      this.setState({ expandedSubPanel: newPanel});
    }
  };

  changeMessage(message) {
    this.setState({ message });
  }

  handleText(text) {
    return text;
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    if (this.props.visible) {
      return (
        // Each Section From FAQ Constants Has A Title. We Then Map All Questions & Answers Into Accordion Components
        // To Minimize The Amount Of Code Required To Display This FAQ. All FAQ Content Can Be Found In Constants/FAQ.js
        // And Is Maintained On A Google Doc Owned By The System Admin. Before Making Any Changes To The FAQ, Please Contact
        // The System Administrator To Ensure That Content Is Correctly Maintained Outside Of The Codebase As Well.
        <div>
          <div className='tile' style={{ padding: 20, paddingTop: 31, paddingBottom: 31 }}>
            <div className='card-flex-header'>
              <QuizOutlinedIcon />
              <h2 className='card-header'>
                FAQ & Support
              </h2>
            </div>
            <p className='card-subtext' style={{ paddingBottom: 20 }}>
              Check out resources we put together to help you get started & answer any questions you may have.
            </p>
            <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Getting Started'} onChange={() => this.handleChange('Getting Started')} style={{
              border: `5px solid rgb(1 55 41)`,
              '&:not(:lastChild)': { borderBottom: 0 },
              '&:before': { display: 'none' },
              backgroundColor: '#033a2c',
            }}>
              <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
                '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
              }}>
                <div className='menu-header'>
                  Common Student Questions
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
                {SupportText.gettingStarted.map((item) => {
                  return (
                    <Accordion elevation={0} disableGutters expanded={this.state.expandedSubPanel === item.title} onChange={() => this.handleSubChange(item.title)} style={{ backgroundColor: 'transparent' }}>
                      <AccordionSummary style={{ padding: '0px', margin: '0px' }}>
                        <div className='menu-text'>
                          {item.title}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: '13px 0px 0px' }}>
                        <div className='menu-answer'>
                          {item.content1}
                        </div>
                        {item.content2.length !== 0 && (
                          <div className='menu-answer'>
                            {item.content2}
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Account'} onChange={() => this.handleChange('Account')} style={{
              border: `5px solid rgb(1 55 41)`,
              '&:not(:lastChild)': { borderBottom: 0 },
              '&:before': { display: 'none' },
              backgroundColor: '#033a2c',
            }}>
              <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
                '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
              }}>
                <div className='menu-header'>
                  Account Specific Issues
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
                {SupportText.account.map((item) => {
                  return (
                    <Accordion elevation={0} disableGutters expanded={this.state.expandedSubPanel === item.title} onChange={() => this.handleSubChange(item.title)} style={{ backgroundColor: 'transparent' }}>
                      <AccordionSummary style={{ padding: '0px', margin: '0px' }}>
                        <div className='menu-text'>
                          {item.title}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: '13px 0px 0px' }}>
                        <div className='menu-answer'>
                          {item.content1}
                        </div>
                        {item.content2.length !== 0 && (
                          <div className='menu-answer'>
                            {item.content2}
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Competitions'} onChange={() => this.handleChange('Competitions')} style={{
              border: `5px solid rgb(1 55 41)`,
              '&:not(:lastChild)': { borderBottom: 0 },
              '&:before': { display: 'none' },
              backgroundColor: '#033a2c',
            }}>
              <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
                '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
              }}>
                <div className='menu-header'>
                  Competition Questions
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
                {SupportText.competitions.map((item) => {
                  return (
                    <Accordion elevation={0} disableGutters expanded={this.state.expandedSubPanel === item.title} onChange={() => this.handleSubChange(item.title)} style={{ backgroundColor: 'transparent' }}>
                      <AccordionSummary style={{ padding: '0px', margin: '0px' }}>
                        <div className='menu-text'>
                          {item.title}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: '13px 0px 0px' }}>
                        <div className='menu-answer'>
                          {item.content1}
                        </div>
                        {item.content2.length !== 0 && (
                          <div className='menu-answer'>
                            {item.content2}
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Trade'} onChange={() => this.handleChange('Trade')} style={{
              border: `5px solid rgb(1 55 41)`,
              '&:not(:lastChild)': { borderBottom: 0 },
              '&:before': { display: 'none' },
              backgroundColor: '#033a2c',
            }}>
              <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
                '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
              }}>
                <div className='menu-header'>
                  App & Trade Issues
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
                {SupportText.appTradeIssues.map((item) => {
                  return (
                    <Accordion elevation={0} disableGutters expanded={this.state.expandedSubPanel === item.title} onChange={() => this.handleSubChange(item.title)} style={{ backgroundColor: 'transparent' }}>
                      <AccordionSummary style={{ padding: '0px', margin: '0px' }}>
                        <div className='menu-text'>
                          {item.title}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails style={{ padding: '13px 0px 0px' }}>
                        <div className='menu-answer'>
                          {item.content1}
                        </div>
                        {item.content2.length !== 0 && (
                          <div className='menu-answer'>
                            {item.content2}
                          </div>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Rules'} onChange={() => this.handleChange('Rules')} style={{
              border: `5px solid rgb(1 55 41)`,
              '&:not(:lastChild)': { borderBottom: 0 },
              '&:before': { display: 'none' },
              backgroundColor: '#033a2c',
            }}>
              <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
                backgroundColor: 'rgba(255, 255, 255, .05)',
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
                '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
              }}>
                <div className='menu-header'>
                  Rapunzl's Community Rules
                </div>
              </AccordionSummary>
              <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
                <div style={{ height: '15px' }} />
                {SupportText.rules.map((item) => {
                  return (
                    <div className='menu-answer'>
                      {item}
                    </div>
                  )
                })}
              </AccordionDetails>
            </Accordion>  
          </div>
          <div className='tile classroom-wrong' style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 40 }}>
            <div className='classroom-header-flex' style={{ paddingTop: 25, paddingLeft: 12 }}>
              <div className='classroom-title' style={{ paddingLeft: 0 }}>
                Get In Touch With Us
              </div>
            </div>
            <div className='classroom-upload-instructions' style={{ paddingLeft: '10px' }}>
              If you're having trouble uploading your class, don't stress! Check out our support or contact us directly and share the file with us so we can upload your class manually.
              <br/><br/>
              It typically takes us 2-3 days to upload a classroom and is much easier for us to deal with if you're having issues with the template.
            </div>
            <div onClick={() => this.props.setMenuTab(7)} className='button contact-button'>
              Contact Us
            </div>
          </div>
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
    jwtToken: state.userDetails.jwtToken,
    loading: state.support.loading,
    firstName: state.userDetails.firstName,
    lastName: state.userDetails.lastName,
    email: state.userDetails.email,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Handles sending message to Database to email to support email address
      setMenuTab: (tab) => dispatch(setMenuTab(tab)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
