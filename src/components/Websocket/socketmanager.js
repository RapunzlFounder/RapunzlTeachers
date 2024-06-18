import React from "react";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { WS_URL } from "../../constants";
import { updateIsVisible, updateWebsocketConnected } from "../../ActionTypes/gameSettingsActions";
import SymbolType from '../../graphql/enums/SymbolTypes';
import { websocketPortfolioUpdate} from "../../ActionTypes/portfolioActions";
import { websocketCompetitionUpdate } from "../../ActionTypes/competitionActions";
import { websocketQuizScoreUpdate } from "../../ActionTypes/classroomActions";
export const SocketContext = React.createContext({
  prices: {}
});

export const useWebsocket = () => React.useContext(SocketContext);

export class WrappedSocketManager extends React.Component {

  state = {
    students: {}
  }

  socket = null;

  // constructor (props) {
  //   super(props);

  //   //this.socket = io.connect(WS_URL,{transports: ['websocket'],
  //   //rejectUnauthorized: false,
  //   //secure: true});

   
  // }

  componentDidMount() {
    //console.log('Websocket component mounted'); 
    this.socket = io(WS_URL);

    // when the websocket connects subscribe to various pub/sub channels
    this.socket.on('connect', () => {
        //console.log(this.socket.id); 
        // subscribe to the pub/sub channels for the list of symbols that the user needs
        //this.subscibeToClassroomStudents();
        // update the redux state that the websocket is connected
        this.props.updateWebsocketConnected(true);
        // subscribe to the pub/sub channels for Classroom Student portfolio performance, competition and quiz scores updates which are sent to the webapp
        this.subscibeToStudentEvents();
        //}
      });
    this.socket.on("connect_error", () => {
      this.props.updateWebsocketConnected(true);
      //console.log('Websocket connect error.  Trying again....'); 
        setTimeout(() => {
          this.socket.connect();
        }, 1000);
    });
    this.socket.on("disconnect", (reason) => {
      this.props.updateWebsocketConnected(false);
      if (reason === "io server disconnect") {
        //console.log('Websocket disconnection was initiated by the server.  Trying again....')
        this.socket.connect();
      }
      else if (reason === "ping timeout") {
        //console.log('Websocket disconnected. The server did not send a PING within the pingInterval pingTimeout range. Trying again....')
      }
      else if (reason === "transport close") {
        //console.log('Websocket disconnected. The connection was closed. Trying again....')
      }
      else if (reason === "transport error") {
        //console.log('Websocket disconnected. The connection has encountered an error. Trying again....')
      }
      // else the socket will automatically try to reconnect
    });
      // this is for processing classroom student assessment quiz score updates
    this.socket.on('studentQuizScore', (res) => {
        //console.log('Websocket price update received')
        // eslint-disable-next-line
        const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
        // eslint-disable-next-line
        if (resjson != null) {
          // update the quiz score for the student
          this.props.updateStudentQuizScore(resjson.studentUserID, resjson.moduleID, resjson.moduleName, resjson.percentComplete, resjson.percentCorrect,
            resjson.quizQuestionId, resjson.moduleQuestionNumber, resjson.studentAnswer, resjson.answerCorrect, resjson.noAttempts, resjson.lastAttemptAt);
        }
      });
    // this is for processing classroom student portfolio updates for US Stocks 
    this.socket.on('stockPortPerf', (res) => {
      //console.log('Websocket Stock portfolio update received')
      // eslint-disable-next-line
      const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
      // eslint-disable-next-line
      if (resjson != null) {
        // var timestamp = resjson.Date + " " + resjson.Time;
        // update the portfolio state with the new portfolio performance information 
        this.props.updateStudentPortfolioPerformance(resjson.PortfolioId, resjson.Performance, SymbolType.US_Stock);
      }
    });
    // this is for processing classroom student portfolio updates for Crypto
    this.socket.on('cryptoPortPerf', (res) => {
      //console.log('Websocket Crypto portfolio update received')
      // eslint-disable-next-line
      const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
      // eslint-disable-next-line
      if (resjson != null) {
        // var timestamp = resjson.Date + " " + resjson.Time;
        // update the portfolio state with the new crypto portfolio performance information 
        this.props.updateStudentPortfolioPerformance(resjson.PortfolioId, resjson.CurrentValue, resjson.Performance, SymbolType.Crypto);
      }
    });
      // this is for processing student competition updates for US Stocks 
    this.socket.on('stockComp', (res) => {
        //console.log('Websocket US Stock Competition update received')
        // eslint-disable-next-line
        const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
        // eslint-disable-next-line
        if (resjson != null) {
          // update the competition state with the new competition participant information 
          this.props.updateStudentCompetitionRankInfo(resjson, SymbolType.US_Stock);
        }
    });
    this.socket.on('cryptoComp', (res) => {
        //console.log('Websocket Crypto Competition update received')
        // eslint-disable-next-line
        const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
        // eslint-disable-next-line
        if (resjson != null) {
          // update the competition state with the new crypto competition participant information 
          this.props.updateStudentCompetitionRankInfo(resjson, SymbolType.Crypto);
        }
    });
  }
  
  componentDidUpdate(prevProps) {
    // the WebApp visibility has changed
    if (this.props.visible !== prevProps.visible){
      // the WebApp is visible, but it was previously not visible 
      if (this.props.visible){
        // Update the Redux store that the page is visible.  This Redux state can be subscribed to by any page to determine if anything needs 
        // to be updated now that the WebApp is visible
        // Connects the Web Socket
        try {
          this.socket.connect();
        } catch (e) {
            //console.log("Websocket connect error when page made visible");
            //console.error(e);
        }
      }
     // the WebApp is not visible, but it was previousy visible 
     if (!this.props.visible){
        // Update the Redux store that the page is not visible.  This Redux state can be subscribed to by any page to determine if anything needs 
        // to be updated now that the WebApp is not visible
        // unsubscribe all symbols from the Web Socket
        try {
          this.socket.disconnect();
          this.props.updateWebsocketConnected(false);
        } catch (e) {
            //console.log("Websocket disconnect error");
            //console.error(e);
        }
      }
      // update the Redux store with the current WebApp visibility.  This visibility is passed into SocketManager as a prop fromPageVisibility in idex.js
      this.props.updateIsVisible(this.props.visible);
    }
  }

  componentWillUnmount () {
     // remove the event handler for when the browser tab that contains the Rapunzl Web App gets focus ie call the mini query if needed 
    // and connect the Web Socket
    if (!this.socket.connected){
      try {
        this.socket.disconnect();
        this.props.updateWebsocketConnected(false);
      } catch (e) {
        //console.log("Websocket disconnect error");
        //console.error(e);
      }
    }
  }

  // get the current Market Open status from the socket io server
  getMarketOpen = () => {
    var symArray = [`usstocks-cantrade`];
    this.socket.emit('get-marketopen', symArray);
  }

  subscribeToMarketOpen = () => {
    var symArray = [`usstocks-cantrade`];
    this.socket.emit('add-symbol', symArray);
  }


  //  Subscribe to Websocket Classroom Student Portfolio performance updates
  subscibeToStudentEvents = () => {
    var portArray = [];
    var compArray = [];
    var quizScoreArray = [];
    // first iterate through all of the classroom that the teacher has registered on the Teacher Portal
    for (const classId in this.props.classrooms){
      // next iterate through the studentList for the classroom
      for (const studentId in this.props.classrooms[classId].studentList){
        if (this.props.classrooms[classId].studentList[studentId].defaultStockPortfolioID > 0){
          portArray.push(`stock_port_perf/${this.props.classrooms[classId].studentList[studentId].defaultStockPortfolioID}`);
          compArray.push(`stock_comp/${this.props.classrooms[classId].studentList[studentId].defaultStockPortfolioID}`);
        }
        // subscribe to Crypto Portfolio updates if one exists
        if (this.props.classrooms[classId].studentList[studentId].defaultCryptoPortfolioID > 0){
          portArray.push(`crypto_port_perf/${this.props.classrooms[classId].studentList[studentId].defaultCryptoPortfolioID}`);
          compArray.push(`crypto_comp/${this.props.classrooms[classId].studentList[studentId].defaultCryptoPortfolioID}`);
        }

        // subscribe to the module quiz scores for the student
        quizScoreArray.push(`student_quiz_score/${studentId}`); 
        
    }
    }
    if (portArray.length > 0){
      this.socket.emit('add-symbol', portArray);
      // console.log("Websocket Student Portfolios subscription complete");
    }
    if (compArray.length > 0){
      this.socket.emit('add-symbol', compArray);
      // console.log("Websocket Student Competitions subscription complete");
    }
    if (quizScoreArray.length > 0){
      this.socket.emit('add-symbol', quizScoreArray);
      // console.log("Websocket Student QuizScores subscription complete");
    }
  }

  render () {
    return (
      <SocketContext.Provider value={{
        students: this.state.students
      }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      // Handles if markets are open or closed, updated with big & miniquery and the Websocket
      jwtToken: state.userDetails.jwtToken,
      classrooms: state.classroom.classrooms
    };
  };
  
// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        // update a student portfolio performance with the information received over the Websocket
        updateStudentPortfolioPerformance: (portfolioID, totalPercentChange, portfolioType) => dispatch(websocketPortfolioUpdate(portfolioID, totalPercentChange, portfolioType)),
        // update an open competition with the student participant information received over the Websocket
        updateStudentCompetitionRankInfo: (myParticipantInfo, portfolioType ) => dispatch(websocketCompetitionUpdate(myParticipantInfo, portfolioType)),
        // update a classroom Student Module Assessement quiz score and question answer
        updateStudentQuizScore: (studentUserID, moduleID, moduleName, percentComplete, percentCorrect, quizQuestionId, moduleQuestionNumber, 
          studentAnswer, answerCorrect, noAttempts, lastAttemptAt ) => dispatch(websocketQuizScoreUpdate(studentUserID, moduleID, moduleName, percentComplete, percentCorrect, quizQuestionId, moduleQuestionNumber, 
          studentAnswer, answerCorrect, noAttempts, lastAttemptAt)),
        // update the Redux store as to whether or not the WebApp is visible
        updateIsVisible: (appVisible) => dispatch(updateIsVisible(appVisible)),
        // update the Redux store as to whether or not the Websocket is connected
        updateWebsocketConnected: (websocketConnected) => dispatch(updateWebsocketConnected(websocketConnected)),
      };
  };

export const SocketManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSocketManager);

export default SocketManager;