import React from 'react';
import Container from '@mui/material/Container';
import { connect } from 'react-redux';
import { getPossibleSchools } from '../../ActionTypes/userDataActions';
import { updateUser } from '../../ActionTypes/updateUserDataActions';
import School from '../../assets/images/Home/School.png';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import '../../styles/SignIn/SelectSchoolContainer.css';
import Colors from '../../constants/Colors';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '../Admin/Alert';

class SelectSchoolContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Stores School Options After Dispatch With User's Email Address
      schoolOptions: [],
      // Handles Loading Schools
      loading: true,
      // Error State Is Displayed If There Is An Issue Fetching School Options
      error: false,
      // Handles If Native Alert Is Visible With Issue Saving School Selection
      alertVisible: false,
      alertTitle: '',
      alertMessage: '',
      // School Search Value From Search Bar
      searchValue: '',
      // School Selected By User
      selectedSchool: null,
      // Handles Secondary Loading State As We Save School Choice To User Details
      saving: false,
    };
  }

  componentDidMount() {
    this.props.getPossibleSchools(this.props.jwtToken, this.props.email).then((res) => {
      // Handles Error With Dispatch & Displays Error State To User
      if (!(res && !('errors' in res))) {
        this.setState({
          error: true,
          loading: false,
        })
      } else {
        this.setState({
          schoolOptions: res.getSchoolList,
          loading: false
        });
      }
    })
  }

  selectSchool(schoolName) {
    if (this.state.selectedSchool === schoolName) {
      this.setState({ selectedSchool: null });
    } else {
      this.setState({ selectedSchool: schoolName });
    }
  }

  // This Handles The Dispatch To Update User Details & Save a Student Users School
  saveSchool() {
    this.setState({ saving: true });
    let updateName = [];
    let updateValue = [];
    updateName.push('school');
    updateValue.push(this.state.selectedSchool);
    const returnName = updateName;
    this.props.updateUser(this.props.jwtToken, updateName, updateValue, returnName).then((res) => {
      // Handles If There Is An Error Saving The School To User Details & Displays Alert To User
      if (!(res && !('errors' in res))) {
        this.setState({
          success: false,
          saving: false,
          alertVisible: true,
          alertMessage: 'Sorry for the issue, but it seems like we had some trouble trying to save your school to your account. Please try again and if the problem continues, contact support at hello@rapunzlinvestments.com.',
          alertTitle: 'Something Went Wrong...' 
        });

      }
      // Sets Success State To True Which Handles Navigation
      else {
        this.setState({ success: true, saving: false });
      }
    });
  }

  search(value) {
    this.setState({ searchValue: value });
  }

  getSearchData() {
    if (!!this.state.schoolOptions && this.state.schoolOptions.length !== 0) {
      let filteredArray = this.state.schoolOptions.filter((school) => school.schoolName.toLowerCase().includes(this.state.searchValue.toLowerCase()));
      return filteredArray.sort((a, b) => a.schoolName.localeCompare(b.schoolName));
    } else {
      return [];
    }
  }

  // Toggles Visibility Of Alert Dialog
  toggleAlert = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
  }

  render() {
    // Handles Error State
    if (this.state.error) {
      return (
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={false}
          className='route-container'
          style={{ paddingTop: '25px' }}
        >
          <SyncProblemOutlinedIcon className='school-error-icon' />
          <div className='select-school-title'>
            There Seems To Be An Issue...
          </div>
          <div className='select-school-text'>
            Your email address is being recognized by our servers as a student email, however, we cannot locate the associated school. This usually occurs when there is a bad internet connection, or a misidentified email address with our system.
            <br /><br />
            Please try refreshing the browser and if that doesn't work, contact support to resolve the issue at hello@rapunzlinvestments.com
          </div>
        </Container>
      )
    }    
    // Handles Initial State With List of Schools To Choose From
    else {
      return (
        <Container
          disableGutters={true}
          fixed={false}
          maxWidth={false}
          className='route-container'
          style={{ paddingTop: '25px' }}
        >
          <Alert
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            visible={this.state.alertVisible}
            dismiss={this.toggleAlert}
          />
          <Container
            disableGutters={true}
            fixed={false}
            maxWidth={'md'}
            style={{ backgroundColor: '#002b21', padding: '20px', borderRadius: '5px' }}
          >
            <img className='select-school-graphic' src={School} alt='' />
            <div className='select-school-title'>
              Time To Select Your School
            </div>
            <div className='select-school-text'>
              Your email address shows that you are eligible for scholarship prizes. Please select your school below so that you can gain access to exclusive and private competitions with scholarship opportunities!
            </div>
            <div className='search-bar-container' style={{ width: '85%', margin: 'auto', marginBottom: '25px'}}>
              <SearchIcon />
              <Input
                autoComplete="false"
                autoFocus={true}
                className='search-input-text'
                type="text"
                error={false}
                fullWidth={true}
                multiline={false}
                onChange={(event) => this.search(event.target.value)}
                value={this.state.searchValue}
                placeholder={"Search For Your School"}
                sx={{
                  color: 'white',
                }}
              />
            </div>
            {!this.state.loading && !this.state.saving && !!this.state.schoolOptions && this.getSearchData().length !== 0 && (
              <div className='school-search-container' style={{ marginBottom: this.state.selectedSchool !== null ? '0px' : '60px' }}>
                {this.getSearchData().map((school) => {
                  return (
                    <div key={school.id} onClick={() => this.selectSchool(school.schoolName)} className='school-search-result'>
                      <div className='school-search-name' style={{ color: this.state.selectedSchool === null ? Colors.nightColors.white : this.state.selectedSchool === school.schoolName ? Colors.nightColors.accent : Colors.nightColors.lightGrey }}>
                        {school.schoolName}
                      </div>
                      {this.state.selectedSchool !== school.schoolName ? (
                        <RadioButtonUncheckedOutlinedIcon
                          style={{ fill: this.state.selectedSchool === null ? Colors.nightColors.white : Colors.nightColors.lightGrey }}
                        />
                      ) : (
                        <RadioButtonCheckedOutlinedIcon
                          style={{ fill: Colors.nightColors.accent }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            {!this.state.loading && !this.state.saving && !!this.state.schoolOptions && this.getSearchData().length === 0 && (
              <div className='school-search-loading-container'>
                <SchoolOutlinedIcon className='empty-search-icon'/>
                <div className='general-loading-text'>
                  No Schools To Display
                </div>
              </div>
            )}
            {(this.state.loading || this.state.saving) && (
              <div className='school-search-loading-container'>
                <CircularProgress />
                <div className='general-loading-text'>
                  {this.state.loading ? 'Loading School Options...' : 'Updating User Profile...'}
                </div>
              </div>
            )}
            {this.state.selectedSchool !== null && (
              <div onClick={() => this.saveSchool()} className='select-school-button'>
                Select School
              </div>
            )}
          </Container>
        </Container>
      );
    }
  }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  // Redux Store --> Component
  return {
    // Both Token And Email Are Used In Get Possible Schools Query in Component Did Mount
    jwtToken: state.userDetails.jwtToken,
    email: state.userDetails.email,
  };
};

// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Handles fetching possible schools if user does not have school and match is 1-1
    getPossibleSchools: (token, email) => dispatch(getPossibleSchools(token, email)),
    // Dynamically saves updated user details
    updateUser: (token, updateName, updateValue, returnName) => dispatch(updateUser(token, updateName, updateValue, returnName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSchoolContainer);
