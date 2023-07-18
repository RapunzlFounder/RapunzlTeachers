import React from "react";
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { WS_URL } from "../../constants";
import { updateIsVisible, updateWebsocketConnected } from "../../ActionTypes/gameSettingsActions";

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
      // this is for processing classroom student assessment score updates
    this.socket.on('message', (res) => {
        //console.log('Websocket price update received')
        // eslint-disable-next-line
        const resjson = typeof (res) == 'object' ? res : JSON.parse(res);
        // eslint-disable-next-line
        if (resjson != null) {
          // update the stocksSymDict in the instrument state with the new price object fpr the symbol
          this.props.getLastPriceSuccess(resjson, resjson.I, true);
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
        if (!this.socket.connected){
          try {
            this.socket.connect();
          } catch (e) {
            //console.log("Websocket connect error when page made visible");
            //console.error(e);
          }
        }
      }
     // the WebApp is not visible, but it was previousy visible 
     if (!this.props.visible){
        // Update the Redux store that the page is not visible.  This Redux state can be subscribed to by any page to determine if anything needs 
        // to be updated now that the WebApp is not visible
        // unsubscribe all symbols from the Web Socket
        if (this.socket.connected){
          try {
            this.socket.disconnect();
            this.unsubscibeAllStudents();
            this.props.updateWebsocketConnected(false);
          } catch (e) {
            //console.log("Websocket disconnect error");
            //console.error(e);
          }
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
        this.unsubscibeAllStudents();
        this.props.updateWebsocketConnected(false);
      } catch (e) {
        // console.log("Websocket disconnect error");
        //console.error(e);
      }
    }
  }


  // get the last prices for the symbols in the symdict from the socket io server
  getSymbolPrices = () => {
    var symArray = [];
    // get the last prices for the US Stock Indices and the US Stock symbols in the stock symArray
    for (let i = 0; i < this.props.stocksSymArray.length; i++) {
      symArray.push(`nasdaq_last/${this.props.stocksSymArray[i]}`);
    }
    // get the last prices for the Crypto symbols in the Crypto symArray if any exist
    for (let i = 0; i < this.props.cryptoSymArray.length; i++) {
      symArray.push(`crypto_last/${this.props.cryptoSymArray[i]}`);
    }
    if (symArray.length > 0) {
      this.socket.emit('get-lasttrade', symArray);
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

  subscribeToFriendRequestsReceived = () => {
    var friendArray = [`friend_request_received/${this.props.userId}`];
    this.socket.emit('add-symbol', friendArray);
  }

  subscribeToFriendRequestsAccepted = () => {
    var friendArray = [`friend_request_accepted/${this.props.userId}`];
    this.socket.emit('add-symbol', friendArray);
  }

  subscibeToInitialSymbols = () => {
    var symArray = [];
    // subscribe to the price updates for the US Stock symbols in the stock symArray if any exist
    for (let i = 0; i < this.props.stocksSymArray.length; i++) {
      symArray.push(`nasdaq_last/${this.props.stocksSymArray[i]}`);
    }
    // subscribe to the price updates for the Crypto symbols in the Crypto symArray if any exist
    for (let i = 0; i < this.props.cryptoSymArray.length; i++) {
      symArray.push(`crypto_last/${this.props.cryptoSymArray[i]}`);
    }
    if (symArray.length > 0){
      //console.log(symArray);
      this.socket.emit('add-symbol', symArray);
      //console.log("Websocket initial symbol subscription complete");
    }
    else{
      //console.log("No initial symbols were subscribed to as the SymArray is empty");
    }
  }

  //  Subscribe to Websocket Portfolio performance updates
  subscibeToPortfolios = () => {
    var portArray = [];
    // subscribe to US Stock Portfolio updates if one exists
    if (this.props.defaultStockPortfolioID > 0){
      portArray.push(`stock_port_perf/${this.props.defaultStockPortfolioID}`);
    }
    // subscribe to Crypto Portfolio updates if one exists
    if (this.props.defaultCryptoPortfolioID > 0){
      portArray.push(`crypto_port_perf/${this.props.defaultCryptoPortfolioID}`);
    }
    if (portArray.length > 0){
      this.socket.emit('add-symbol', portArray);
      //console.log("Websocket initial US Stock Portfolio subscription complete");
    }
    else{
      //console.log("No US Stock Portfolios were subscribed to as the default portfolio was not found");
    }
  }

  //  Subscribe to Websocket Competition performance and rank updates
  subscibeToCompetitions = () => {
    var compArray = [];
    // subscribe to US Stock Competition updates if a US Stock Portfolio exists
    if (this.props.defaultStockPortfolioID > 0){
      compArray.push(`stock_comp/${this.props.defaultStockPortfolioID}`);
    }
    // subscribe to Crypto Competition updates if a Crypto portfolio exists
    if (this.props.defaultCryptoPortfolioID > 0){
      compArray.push(`crypto_comp/${this.props.defaultCryptoPortfolioID}`);
    }
    if (compArray.length > 0){
      this.socket.emit('add-symbol', compArray);
    }
  }

  //  Subscribe to Websocket New Available Competitions
  subscibeToNewCompetitions = () => {
    var compArray = [];
    // subscribe to new US Stock Competitions if a US Stock Portfolio exists
    if (this.props.defaultStockPortfolioID > 0){
      compArray.push(`stock_comp_start`);
    }
    // subscribe to new Crypto Competitions if a Crypto portfolio exists
    if (this.props.defaultCryptoPortfolioID > 0){
      compArray.push(`crypto_comp_start`);
    }
    if (compArray.length > 0){
      this.socket.emit('add-symbol', compArray);
    }
  }

  //  Subscribe to Websocket Ended Competitions that the user has entered
  subscibeToCompetitionEnds = () => {
    var compArray = [];
    // subscribe to new US Stock Competitions if a US Stock Portfolio exists
    if (this.props.defaultStockPortfolioID > 0){
      let stock_id_array = this.props.stocksEnteredLiveIdArray;
      for (let i = 0; i < stock_id_array.length; i++) {
        compArray.push(`stock_comp_end/${stock_id_array[i]}`);
      }
    }
    // subscribe to new Crypto Competitions if a Crypto portfolio exists
    if (this.props.defaultCryptoPortfolioID > 0){
      let crypto_id_array = this.props.cryptoEnteredLiveIdArray;
      for (let i = 0; i < crypto_id_array.length; i++) {
        compArray.push(`crypto_comp_end/${crypto_id_array[i]}`);
      }
    }
    if (compArray.length > 0){
      this.socket.emit('add-symbol', compArray);
    }
  }

  //  Subscribe to Websocket Portfolio fills
  subscibeToFills = () => {
    var fillArray = [];
    // subscribe to US Stock Portfolio fills if one exists
    if (this.props.defaultStockPortfolioID > 0){
      fillArray.push(`fills/${this.props.defaultStockPortfolioID}`);
    }
    if (fillArray.length > 0){
      this.socket.emit('add-symbol', fillArray);
    }
  }

  subscibeToNewSymbols(symbolType) {
    var symArray = [];
    // eslint-disable-next-line
    if (symbolType == SymbolType.US_Stock){
      // if this is the US Stocks screen then add the symbol to the stocks sym array
      for (let i = 0; i < this.props.stocksSymToAddArray.length; i++) {
        symArray.push(`nasdaq_last/${this.props.stocksSymToAddArray[i]}`);
      }
    }
    // eslint-disable-next-line
    else if (symbolType == SymbolType.Crypto){
      for (let i = 0; i < this.props.cryptoSymToAddArray.length; i++) {
        symArray.push(`crypto_last/${this.props.cryptoSymToAddArray[i]}`);
      }
    }
    if (symArray.length > 0){
      this.socket.emit('add-symbol', symArray);
    }
    // clear the SymToAddArray array in the redux store instrument state for either stocks or crypto
    this.props.clearSymAdd(symbolType);
  }

  unsubscibeStudents() {
    var studentArray = [];
  
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
    };
  };
  
// Map Dispatch To Props (Dispatch Actions to Reducers. Reducers then modify the redux store state.
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
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