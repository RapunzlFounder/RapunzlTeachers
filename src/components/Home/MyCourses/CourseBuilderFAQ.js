import React from 'react';
import { connect } from 'react-redux';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import '../../../styles/Home/Support.css';
import SupportText from '../../../constants/FAQ';

class CourseBuilderFAQ extends React.PureComponent {
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

  render() {
      return (
        <div className='tile' style={{ padding: 20, paddingTop: 31, paddingBottom: 31 }}>
          <Accordion disableGutters elevation={0} square expanded={this.state.expandedPanel === 'Getting Started'} onChange={() => this.handleChange('Getting Started')} style={{
            '&:not(:lastChild)': { borderBottom: 0 },
            '&:before': { display: 'none' },
            backgroundColor: '#012b22',
          }}>
            <AccordionSummary aria-controls="panel1d-content" expandIcon={<ArrowForwardIosSharpIcon  />} style={{
              '& .MuiAccordionSummaryExpandIconWrapper.MuiExpanded': { transform: 'rotate(90deg)' },
              '& .MuiAccordionSummaryContent': { marginLeft: '10px' },
            }}>
              <div className='menu-header' style={{ fontSize: '17px', fontWeight: '600' }}>
                Common Questions While Building A Course
              </div>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '12px', borderTop: '1px solid rgba(0, 0, 0, .125)' }}>
              {SupportText.buildingCourse.map((item, index) => {
                return (
                  <Accordion key={index} elevation={0} disableGutters expanded={this.state.expandedSubPanel === item.title} onChange={() => this.handleSubChange(item.title)} style={{ backgroundColor: 'transparent' }}>
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
        </div>
      );
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

export default connect(mapStateToProps)(CourseBuilderFAQ);
