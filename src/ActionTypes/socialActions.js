// import the GraphQL query text for user details & interactions
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
import { OTHER_USER_DETAILS } from '../graphql/queries/OtherUserDetails';
import { GET_CLOSED_POSITIONS } from '../graphql/queries/GetClosedPositions'
import { arrayToObjectID } from '../helper_functions/utilities';

export const OTHER_USER_DETAILS_BEGIN = 'OTHER_USER_DETAILS_BEGIN';
export const OTHER_USER_DETAILS_SUCCESS = 'OTHER_USER_DETAILS_SUCCESS';
export const OTHER_USER_DETAILS_FAILURE = 'OTHER_USER_DETAILS_FAILURE';
export const OTHER_USER_DETAILS_ERROR = 'OTHER_USER_DETAILS_ERROR';
export const OTHER_USER_CLSPOSNS_BEGIN = 'OTHER_USER_CLSPOSNS_BEGIN';
export const OTHER_USER_CLSPOSNS_SUCCESS = 'OTHER_USER_CLSPOSNS_SUCCESS';
export const OTHER_USER_CLSPOSNS_FAILURE = 'OTHER_USER_CLSPOSNS_FAILURE';
export const OTHER_USER_CLSPOSNS_ERROR = 'OTHER_USER_CLSPOSNS_ERROR';
export const RESET_SOCIAL_STATE = 'RESET_SOCIAL_STATE';
export const RESET_SOCIAL_ERRORS = 'RESET_SOCIAL_ERRORS';
export const LOGOUT_USER_SOCIAL = 'LOGOUT_USER_SOCIAL';

export const fetchOtherUserDetailsBegin = () => ({
  type: OTHER_USER_DETAILS_BEGIN,
});

export const fetchOtherUserDetailsSuccess = () => ({
  type: OTHER_USER_DETAILS_SUCCESS,
});

export const fetchOtherUserDetailsFailure = error => ({
  type: OTHER_USER_DETAILS_FAILURE,
  payload: { error },
});

export const fetchOtherUserDetailsError = error => ({
  type: OTHER_USER_DETAILS_ERROR,
  payload: { error },
});

export const fetchOtherUserClsPosnsBegin = () => ({
  type: OTHER_USER_CLSPOSNS_BEGIN,
});

export const fetchOtherUserClsPosnSuccess = () => ({
  type: OTHER_USER_CLSPOSNS_SUCCESS,
  payload: { },
});

export const fetchOtherUserClsPosnFailure = error => ({
  type: OTHER_USER_CLSPOSNS_FAILURE,
  payload: { error },
});

export const fetchOtherUserClsPosnError = error => ({
  type: OTHER_USER_CLSPOSNS_ERROR,
  payload: { error },
});
// action to reset any social errors so that the error message pop up will no longer be visible
export const resetSocialErrors = () => ({
  type: RESET_SOCIAL_ERRORS,
});
export const logoutUserSocial = () => ({
  type: LOGOUT_USER_SOCIAL,
});

// function to dispatch redux actions to get response from graphql query Get Last Price
export function FetchOtherUserDetails(token, userName) {
  return function(dispatch){
    dispatch(fetchOtherUserDetailsBegin());
    return axios.post(GRAPHQL_URL, { query: OTHER_USER_DETAILS(userName) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(fetchOtherUserDetailsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          var mainReturnedObj = json.data.data;
          // Transform arrays in the UserDetails object to objects that further contain objects.
          // This ensures that the when state is updated in the Redux store there is no need to iterate over the arrays.
          // when we convert portfolios we need to convert the main US Stock portfolio array objects first
          // and then convert positions, open positions, transactions, closed orders and open orders
          const stockPortfoliosObject = arrayToObjectID(mainReturnedObj.otheruserDetails.stockPortfolios);
          mainReturnedObj.otheruserDetails.stockPortfolios = stockPortfoliosObject;
          const cryptoPortfoliosObject = arrayToObjectID(mainReturnedObj.otheruserDetails.cryptoPortfolios);
          mainReturnedObj.otheruserDetails.cryptoPortfolios = cryptoPortfoliosObject;
          // iterate over each object in the US Stock portfolio object
          let defaultStockPortfolioID = null;
          // eslint-disable-next-line
          for (var property in mainReturnedObj.otheruserDetails.stockPortfolios){
            // eslint-disable-next-line
            if (mainReturnedObj.otheruserDetails.stockPortfolios[property].name == "Default"){
              defaultStockPortfolioID = property
            }
            // convert the array of open position objects into an object of open position objects
            let stockPositionsObject = arrayToObjectID(mainReturnedObj.otheruserDetails.stockPortfolios[property].positions);
            mainReturnedObj.otheruserDetails.stockPortfolios[property].positions = stockPositionsObject;
            // create the lastClosedPositionID for the US Stock portfolio
            mainReturnedObj.otheruserDetails.stockPortfolios[property].lastClosedPositionID = 0;
            //if (mainReturnedObj.otheruserDetails.stockPortfolios[property].closedPositions.length > 0){
            //  mainReturnedObj.otheruserDetails.stockPortfolios[property].lastClosedPositionID = mainReturnedObj.otheruserDetails.stockPortfolios[property].closedPositions[0].closedAtInt;
            //}
            //let stockClosedpositionsObject = arrayToObjectClosedAt(mainReturnedObj.otheruserDetails.stockPortfolios[property].closedPositions);
            //mainReturnedObj.otheruserDetails.stockPortfolios[property].closedPositions = stockClosedpositionsObject;
            mainReturnedObj.otheruserDetails.stockPortfolios[property].closedPositions = {};
          }
           // iterate over each object in the Crypto portfolio object
          let defaultCryptoPortfolioID = null;
          // eslint-disable-next-line
          for (var property in mainReturnedObj.otheruserDetails.cryptoPortfolios){
            // eslint-disable-next-line
            if (mainReturnedObj.otheruserDetails.cryptoPortfolios[property].name == "Default Crypto"){
              defaultCryptoPortfolioID = property
            }
            // convert the array of open position objects into an object of open position objects
            let cryptoPositionsObject = arrayToObjectID(mainReturnedObj.otheruserDetails.cryptoPortfolios[property].positions);
            mainReturnedObj.otheruserDetails.cryptoPortfolios[property].positions = cryptoPositionsObject;
            // create the lastClosedPositionID for the Crypto portfolio
            mainReturnedObj.otheruserDetails.cryptoPortfolios[property].lastClosedPositionID = 0;
            //if (mainReturnedObj.otheruserDetails.cryptoPortfolios[property].closedPositions.length > 0){
            //  mainReturnedObj.otheruserDetails.cryptoPortfolios[property].lastClosedPositionID = mainReturnedObj.otheruserDetails.cryptoPortfolios[property].closedPositions[0].closedAtInt;
            //}
            //let cryptoClosedpositionsObject = arrayToObjectClosedAt(mainReturnedObj.otheruserDetails.cryptoPortfolios[property].closedPositions);
            //mainReturnedObj.otheruserDetails.cryptoPortfolios[property].closedPositions = cryptoClosedpositionsObject;
            mainReturnedObj.otheruserDetails.cryptoPortfolios[property].closedPositions = {};
          }
          dispatch(fetchOtherUserDetailsSuccess());
          return mainReturnedObj.otheruserDetails;
        }
      })
      .catch(error => dispatch(fetchOtherUserDetailsFailure(error.message)));
  };
}

// function to dispatch redux actions to get response from the graphql query getConfirmedFriends
// the input is the other user's portfolio id that you wish to retrieve the closed positions for
export function FetchOtherUserClosedPositions(token, portfolioID, portfolioType, skip, first) {
  return function(dispatch){
    dispatch(fetchOtherUserClsPosnsBegin());
    return axios.post(GRAPHQL_URL, { query: GET_CLOSED_POSITIONS(portfolioID, portfolioType, skip, first) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(fetchOtherUserClsPosnError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          dispatch(fetchOtherUserClsPosnSuccess(portfolioType));
          return json.data.data.getClosedPositions;
        }
      })
      .catch(error => dispatch(fetchOtherUserClsPosnFailure(error.message)));
  };
}
