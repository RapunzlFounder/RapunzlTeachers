import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTeacherCourse } from '../../../ActionTypes/coursemoduleActions';
import { toggleCourseBuilder } from '../../../ActionTypes/dashboardActions';
import HardwareIcon from '@mui/icons-material/Hardware';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import EmptyIcon from '../../../assets/images/Education/EmptyCourse.png';
import EditIcon from '@mui/icons-material/Edit';
import '../../../styles/Home/Courses.css';
import SectionBuilderDialog from './SectionBuilderDialog';
import Alert from '../../Admin/Alert';
import { CircularProgress } from '@mui/material';

class CourseBuilder extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseNameError: false,
      courseLength: 0,
      courseSections: [],
      courseSectionsError: false,
      selectedSection: 0,
      sectionBuilderVisible: false,
      // Handles Native Alert Modal
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      loading: false,
    }
  }

  // Gets Course
  getCourse() {

  }

  // Updates Course Name For User
  changeCourseName(value) {
    this.setState({ courseName: value.toString(), courseNameError: false });
  }

  // Allows User To Adjust Length Of Their Desired Course
  changeCourseLength(value) {
    // Resets courseSections In State If User Selects No Course Length
    if (value === 0) {
      this.setState({ courseLength: value, courseSections: [] });
    }
    // Create Course Sections Array Depending Upon Length Selected By The User
    else {
      const updatedArray = [];
      for (var i=0; i < value; i++) {
        const sectionObject = {
          id: i + 1,
          module: null,
        };
        updatedArray.push(sectionObject);
      }
      this.setState({ courseLength: value, courseSections: updatedArray });
    }
  }

  // Creates Array Of Module IDs To Create Course
  _handleModuleArray(sections) {
    let newArray = [];
    for (var i in sections) {
      if (sections[i].module !== null) {
        newArray.push(parseInt(sections[i].module));
      } else {
        newArray.push(null);
      }
    }
    return newArray;
  }

  // Handles Validating & Submitting Course Which User Has Created To GraphQL
  createCourse() {
    // Sets Loading State To True To Show User We Are Attempting To Create Course
    this.setState({ loading: true });
    // Checks That There Is A Course Name That Is 2 Characters Or Greater
    if (this.state.courseName.length > 1) {
      const modulesArray = this._handleModuleArray(this.state.courseSections);
      let error = false;
      // Checks If Any Of The Modules In The Array Are Null And Displays Error To The User
      for (var i in modulesArray) {
        if (modulesArray[i] === null) {
          error = true;
        }
      }
      // If There Is No Error, Proceed With Creating Teacher Course
      if (!error) {
        // TODO: PRODUCTS - Check that the user is allowed to use this feature createCourse
        this.props.createTeacherCourse(this.props.jwtToken, this.state.courseName.toString(), true, modulesArray).then((res) => {
          // Handles Error With Creating Teacher Course By Displaying Alert Error To Use
          if (!(res && !('errors' in res))) {
            this.setState({
              loading: false,
              alertVisible: true,
              alertTitle: 'Unable To Create Course',
              alertMessage: res.errors[0].message,
            });
          }
          // Handles Successful Dispatch By Updating State To Display Success & Prompt User To Navigate Back To Main Course Tab
          else {
            this.setState({ loading: false });
            this.props.toggleCourseBuilder();
          }
        });
      }
      // Handles If There Is An Error And Any Of The Sections Are Not Assigned And Have A Null Value
      else {
        this.setState({ loading: false, courseSectionsError: true });
      }
    }
    // Handles If The Name Of The Course Is Less Than 2 Characters
    else {
      this.setState({ courseNameError: true, loading: false });
    }
  }

  // Makes SectionBuilderDialog Visible And Updates Selected Section To Save Correctly When User Is Finished
  showSectionBuilder(section) {
    this.setState({ sectionBuilderVisible: true, selectedSection: section, courseSectionsError: false });
  }

  // Pass Through Arrow Function Which Toggles sectionBuilderVisible State
  toggleSectionBuilder = () => {
    this.setState({ sectionBuilderVisible: !this.state.sectionBuilderVisible });
  }

  // Pass Through Arrow Function To SectionBuilderDialog Updates State With Section Preferences
  saveSection = (module, name) => {
    let newArray = this.state.courseSections;
    newArray[this.state.selectedSection].module = module;
    newArray[this.state.selectedSection].name = name;
    this.setState({
      courseSections: newArray,
      sectionBuilderVisible: false,
      selectedSection: 0
    });
  }

  // Pass through arrow function to toggle visibility of native alert dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    return (
      <div className='tile course-progress'>
        <Alert
          visible={this.state.alertVisible}
          dismiss={this.toggleAlert}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
        />
        <SectionBuilderDialog
          visible={this.state.sectionBuilderVisible}
          selectedSection={this.state.selectedSection}
          dismiss={this.toggleSectionBuilder}
          saveSection={this.saveSection}
          saveCourse={null}
          selectedCourse={null}
          courseSections={this.state.courseSections}
        />
        <div onClick={() => this.props.toggleCourseBuilder()} className='support-go-back'>
          Go Back
        </div>
        <div className='home-header-flex'>
          <HardwareIcon />
          <div className='home-header'>
            Course Builder
          </div>
        </div>
        <div className='classroom-upload-instructions'>
          Fill out the information below to customize a course for your classroom. Adjusting the course length will erase progress with specific sections.
        </div>
        <div className='course-input-flex'>
          <TextField
            id="Course Name"
            label="Course Name"
            type="text"
            variant="filled"
            error={this.state.courseNameError}
            value={this.state.courseName}
            onChange={(event) => this.changeCourseName(event.target.value)}
            sx={{ backgroundColor: '#2e7361', borderRadius: '4px', width: '47%' }}
          />
          <Select
            id="Course Length"
            error={false}
            value={this.state.courseLength}
            onChange={(event) => this.changeCourseLength(event.target.value)}
            sx={{ backgroundColor: '#2e7361', borderRadius: '7px', width: '47%' }}
          >
            <MenuItem value={0}>Select Length</MenuItem>
            <MenuItem value={3}>3 Modules</MenuItem>
            <MenuItem value={4}>4 Modules</MenuItem>
            <MenuItem value={5}>5 Modules</MenuItem>
            <MenuItem value={6}>6 Modules</MenuItem>
            <MenuItem value={7}>7 Modules</MenuItem>
            <MenuItem value={8}>8 Modules</MenuItem>
            <MenuItem value={9}>9 Modules</MenuItem>
            <MenuItem value={10}>10 Modules</MenuItem>
            <MenuItem value={11}>11 Modules</MenuItem>
            <MenuItem value={12}>12 Modules</MenuItem>
          </Select>
        </div>
        <div className='course-sections-header'>
          <div className='course-sections-line' />
          <div className='course-sections-title'>
            Modules
          </div>
          <div className='course-sections-line' />
        </div>
        {this.state.courseSections.length !== 0 && (
          <div className='course-section-container'>
            {this.state.courseSections.map((section) => {
              if (section.module === null) {
                return (
                  <div key={section.id} title="Add A New Module For This Course" onClick={() => this.showSectionBuilder(section.id - 1)} className='empty-course-section-item'>
                    <div className='empty-course-section-title' style={{ color: this.state.courseSectionsError ? '#ed2121' : '#ffffff' }}>
                      New Module
                    </div>
                    <AddCircleIcon fontSize='small' className='empty-course-icon' />
                  </div>
                )
              } else {
                return (
                  <div key={section.id} className='empty-course-section-item'>
                    <div>
                      <div className='empty-course-section-title' style={{ fontSize: '14px', fontWeight: '700', paddingBottom: '5px' }}>
                        Module {section.module}
                      </div>
                      <div className='empty-course-section-title' style={{ fontSize: '18px', fontWeight: '300' }}>
                        {section.name}
                      </div>
                    </div>
                    <EditIcon title="Edit The Selected Module" onClick={() => this.showSectionBuilder(section.id)} fontSize='small' className='empty-course-icon' />
                  </div>
                )
              }
            })}
          </div>
        )}
        {this.state.courseSections.length === 0&& (
          <div className='course-section-container'> 
            <img src={EmptyIcon} alt='' className='empty-course-sections-icon' />
            <div className='empty-course-title'>
              Select A Course Length<br/>To Start Building!
            </div>
          </div>
        )}
        {!this.state.loading && (
          <div onClick={() => this.createCourse()} className='create-course-button create-course-enabled'>
            Create Course
          </div>
        )}
        {this.state.loading && (
          <div className='create-course-loading-flex'>
            <CircularProgress className='create-course-loading-icon' />
            <div className='create-course-loading-text'>
              Creating Course...
            </div>
          </div>
        )}
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
    // Handles Authentication When Dispatching createTeacherCourse through Redux to GraphQL
    jwtToken: state.userDetails.jwtToken,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
    return {
      // Creates A Course For The Teacher With List Of Modules Associated With It
      createTeacherCourse: (token, courseName, isPrivate, modulesList) => dispatch(createTeacherCourse(token, courseName, isPrivate, modulesList)),
      toggleCourseBuilder: () => dispatch(toggleCourseBuilder())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseBuilder);
