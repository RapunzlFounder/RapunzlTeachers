import { PURCHASE_PRODUCT } from '../graphql/mutations/PurchaseProduct';
import { PURCHASE_COINS } from '../graphql/mutations/PurchaseCoinPackage';

import { GIVE_USER_COINS } from '../graphql/mutations/GiveUserCoin';
import axios from 'axios';
import { GRAPHQL_URL } from "../constants";
import { updateUserDataState } from '../ActionTypes/userDataActions';
import { removeKey } from '../helper_functions/utilities';
export const SEND_PRODUCT_PURCHASE_BEGIN = 'SEND_PRODUCT_PURCHASE_BEGIN';
export const SEND_PRODUCT_PURCHASE_SUCCESS = 'SEND_PRODUCT_PURCHASE_SUCCESS';
export const SEND_PRODUCT_PURCHASE_FAILURE = 'SEND_PRODUCT_PURCHASE_FAILURE';
export const SEND_PRODUCT_PURCHASE_ERROR = 'SEND_PRODUCT_PURCHASE_ERROR';
export const PURCHASE_COIN_PACKAGE_BEGIN = 'PURCHASE_COIN_PACKAGE_BEGIN';
export const PURCHASE_COIN_PACKAGE_SUCCESS = 'PURCHASE_COIN_PACKAGE_SUCCESS';
export const PURCHASE_COIN_PACKAGE_FAILURE = 'PURCHASE_COIN_PACKAGE_FAILURE';
export const PURCHASE_COIN_PACKAGE_ERROR = 'PURCHASE_COIN_PACKAGE_ERROR';
export const FINALIZE_IAP = 'FINALIZE_IAP';
export const GIVE_USER_COINS_BEGIN = 'GIVE_USER_COINS_BEGIN';
export const GIVE_USER_COINS_SUCCESS = 'GIVE_USER_COINS_SUCCESS';
export const GIVE_USER_COINS_FAILURE = 'GIVE_USER_COINS_FAILURE';
export const GIVE_USER_COINS_ERROR = 'GIVE_USER_COINS_ERROR';
export const GET_ALL_PRODUCTS_BEGIN = 'GET_ALL_PRODUCTS_BEGIN';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';
export const GET_ALL_PRODUCTS_ERROR = 'GET_ALL_PRODUCTS_ERROR';
export const GET_COIN_PACKAGES_BEGIN = 'GET_COIN_PACKAGES_BEGIN';
export const GET_COIN_PACKAGES_SUCCESS = 'GET_COIN_PACKAGES_SUCCESS';
export const GET_COIN_PACKAGES_FAILURE = 'GET_COIN_PACKAGES_FAILURE';
export const GET_COIN_PACKAGES_ERROR = 'GET_COIN_PACKAGES_ERROR';
export const UPDATE_PRODUCTS_STATE = 'UPDATE_PRODUCTS_STATE';
export const UPDATE_COINS_STATE = 'UPDATE_COINS_STATE';
export const UPDATE_PRODUCT_PURCHASES_STATE = 'UPDATE_PRODUCT_PURCHASES_STATE';
export const UPDATE_COIN_PURCHASES_STATE = 'UPDATE_COIN_PURCHASES_STATE';
export const UPDATE_SUBSCRIPTION_STATUS = 'UPDATE_SUBSCRIPTION_STATUS';
export const RESET_PRODUCT_STATE = 'RESET_PRODUCT_STATE';
export const RESET_PRODUCT_ERRORS = 'RESET_PRODUCT_ERRORS';
export const ADD_IAP_PENDING_PURCHASE = 'ADD_IAP_PENDING_PURCHASE';
export const REMOVE_IAP_PENDING_PURCHASE = 'REMOVE_IAP_PENDING_PURCHASE';
export const IAP_ERROR = 'IAP_ERROR';
export const IAP_FAILURE = 'IAP_FAILURE';
export const IAP_SAVE_RECEIPT  = 'IAP_SAVE_RECEIPT';
export const IAP_GET_PRODUCTS_SUCCESS = 'IAP_GET_PRODUCTS_SUCCESS';
export const IAP_GET_SUBSCRIPTIONS_SUCCESS = 'IAP_GET_SUBSCRIPTIONS_SUCCESS';
export const IAP_CONNECTION_RESULT = 'IAP_CONNECTION_RESULT';
export const IAP_PURCHASE_ERROR = 'IAP_PURCHASE_ERROR';
export const IAP_INCREMENT_RETRY = 'IAP_INCREMENT_RETRY';
export const IAP_RESET_RETRY = 'IAP_RESET_RETRY';
export const LOGOUT_USER_PRODUCTS = 'LOGOUT_USER_PRODUCTS';

// update the subscription status of either an Apple Store or Google Play subscription
export const updateSubcriptionStatus = (subscription) => ({
  type: UPDATE_SUBSCRIPTION_STATUS,
  payload: { subscription },
});
// increment the number of IOS IAP receipt verification attempts by 1
export const incrementIOSReceiptVerifyRetries = () => ({
  type: IAP_INCREMENT_RETRY,
}); 
// reset the number of IOS IAP receipt verification attempts to 0
export const resetIOSReceiptVerifyRetries = () => ({
  type: IAP_RESET_RETRY,
}); 
// dispatch for adding a pending In App Purchase before a receipt is received
// The Pending IAP Purchase is just for purchasing a coin package..  
export const addPendingIAP = (coinCode, coinPackageQuantity, purchasePrice, isSubscription, isConsumable) => ({
  type: ADD_IAP_PENDING_PURCHASE,
  payload: { coinCode, coinPackageQuantity, purchasePrice, isSubscription, isConsumable },
});
// dispatch for removing a pending In App Purchase after a receipt or an error is received
export const removePendingIAP = () => ({
  type: REMOVE_IAP_PENDING_PURCHASE,
});
// dispAtch for the result of the Connection to either the IUOS or Google Play Store 
export const iapConnectionResult = (result) => ({
  type: IAP_CONNECTION_RESULT,
  payload: { result },
});
// dispatch for when a transaction receipt is received from the IOS or Google Play Stores, for which verification has failed but it is re-tryable
export const iapSaveReceipt = (receipt, platform) => ({
  type: IAP_SAVE_RECEIPT,
  payload: { receipt, platform },
});
// dispatch for when a list of products that can be purchased is received from the IOS or Google Play Stores
export const iapGetProductsSuccess = (products) => ({
  type: IAP_GET_PRODUCTS_SUCCESS,
  payload: { products },
});
// dispatch for when a list of subscriptions that can be purchased is received from the IOS or Google Play Stores
export const iapGetSubscriptionSuccess = (subscriptions) => ({
  type: IAP_GET_SUBSCRIPTIONS_SUCCESS,
  payload: { subscriptions },
});
// dispatch for when an In App Purchase Error is returned by the relevant listener 
export const iapPurchaseError = error => ({
  type: IAP_PURCHASE_ERROR,
  payload: { error },
});
// dispatch for when an In App Purchase Failure is received
export const iapFailure = error => ({
  type: IAP_FAILURE,
  payload: { error },
});
// dispatch for when an In App Error is received
export const iapError = error => ({
  type: IAP_ERROR,
  payload: { error },
});

// SEND PRODUCT PURCHASE
export const sendProductPurchaseBegin = () => ({
  type: SEND_PRODUCT_PURCHASE_BEGIN,
});
export const sendProductPurchaseSuccess = (purchasedProduct) => ({
  type: SEND_PRODUCT_PURCHASE_SUCCESS,
  payload: { purchasedProduct },
});
export const sendProductPurchaseFailure = error => ({
  type: SEND_PRODUCT_PURCHASE_FAILURE,
  payload: { error },
});
export const sendProductPurchaseError = error => ({
  type: SEND_PRODUCT_PURCHASE_ERROR,
  payload: { error },
});

// PURCHASE COIN PACKAGE
export const purchaseCoinPackageBegin = () => ({
  type: PURCHASE_COIN_PACKAGE_BEGIN,
});
export const purchaseCoinPackageSuccess = (purchasedCoinPackage) => ({
  type: PURCHASE_COIN_PACKAGE_SUCCESS,
  payload: { purchasedCoinPackage },
});
export const purchaseCoinPackageFailure = error => ({
  type: PURCHASE_COIN_PACKAGE_FAILURE,
  payload: { error },
});
export const purchaseCoinPackageError = error => ({
  type: PURCHASE_COIN_PACKAGE_ERROR,
  payload: { error },
});
export const finalizeIAP = () => ({
  type: FINALIZE_IAP,
});
// GIVE USER COINS
export const giveUserCoinsBegin = () => ({
  type: GIVE_USER_COINS_BEGIN,
});
export const giveUserCoinsSuccess = () => ({
  type: GIVE_USER_COINS_SUCCESS,
  payload: {  },
});
export const giveUserCoinsFailure = error => ({
  type: GIVE_USER_COINS_FAILURE,
  payload: { error },
});
export const giveUserCoinsError = error => ({
  type: GIVE_USER_COINS_ERROR,
  payload: { error },
});

// GET ALL PRODUCTS
export const getAllProductsBegin = () => ({
  type: GET_ALL_PRODUCTS_BEGIN,
});
export const getAllProductsSuccess = () => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: {  },
});
export const getAllProductsFailure = error => ({
  type: GET_ALL_PRODUCTS_FAILURE,
  payload: { error },
});
export const getAllProductsError = error => ({
  type: GET_ALL_PRODUCTS_ERROR,
  payload: { error },
});

// GET COIN PACKAGES
export const getCoinPackagesBegin = () => ({
  type: GET_COIN_PACKAGES_BEGIN,
});
export const getCoinPackagesSuccess = () => ({
  type: GET_COIN_PACKAGES_SUCCESS,
  payload: {  },
});
export const getCoinPackagesFailure = error => ({
  type: GET_COIN_PACKAGES_FAILURE,
  payload: { error },
});
export const getCoinPackagesError = error => ({
  type: GET_COIN_PACKAGES_ERROR,
  payload: { error },
});

// this updates the available products of the products state.  
export const updateAvailableProductsState = (products) => ({
  type: UPDATE_PRODUCTS_STATE,
  payload: { products },
});

// this updates the coin packages of the products state.  
export const updateCoinPackagesState = (coinPackages) => ({
  type: UPDATE_COINS_STATE,
  payload: { coinPackages },
});

// this updates the product purchases of the prducts state.  
export const updateProductPurchasesState = (products) => ({
  type: UPDATE_PRODUCT_PURCHASES_STATE,
  payload: { products },
});

// this updates the coin purchases of the products state.  
export const updateCoinPurchasesState = (coinPackages) => ({
  type: UPDATE_COIN_PURCHASES_STATE,
  payload: { coinPackages },
});

// ERRORS
// action to reset the instrument state to it's initial state
export const resetProductState = () => ({
  type: RESET_PRODUCT_STATE,
});
// action to reset any instrument errors so that the error message pop up will no longer be visible
export const resetProductErrors = () => ({
  type: RESET_PRODUCT_ERRORS,
});
export const logoutUserProducts = () => ({
  type: LOGOUT_USER_PRODUCTS,
});
/**  SEND PRODUCT PURCHASE - This mutation purchases a Rapunzl product that is NOT a monthly or annual subscription, ie it is a one-off purchase.  
The user must have an existing coin balance in order to purchase a product using this mutation. Returns a PrchasedProduct object with included the update coinBalance

The inputs are as follows: 
productID - the ID of the Rapunzl Product to be purchased, 
quantity - the quantity of the product that is to be purchased.  This is usually 1,
useOneOffProduct - 'true' = use the one off product as soon as it is purchased.  'false' = Do not use the product right away.

**/

export function SendProductPurchase(token, productID, quantity, useOneOffProduct) {
  return function(dispatch){
    dispatch(sendProductPurchaseBegin());
    return axios.post(GRAPHQL_URL, { query: PURCHASE_PRODUCT(productID, quantity, useOneOffProduct) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(sendProductPurchaseError(json.data.errors[0].message));
          return {errors: json.errors};
        }
        else{
          let purchasedProduct = json.data.data.purchaseProduct.purchasedProduct;
          const coinBalance = purchasedProduct.coinBalance;
          // update the user's coin balalnce
          dispatch(updateUserDataState('coinBalance', coinBalance));
          // remove the coinBalance key frm the product purchase object as it is not needed in the purchasedProducts object in the Redux Store
          purchasedProduct = removeKey (purchasedProduct, 'coinBalance');
          // add the purchased product to the Store
          dispatch(sendProductPurchaseSuccess(purchasedProduct));
          return { coinBalance: coinBalance };
        }
      })
      .catch((error) => {
        dispatch(sendProductPurchaseFailure(error.message));
        return { error: error.message };
      });
  };
}

/** 
This mutation sends the details of a coin package that has been purchased by the user at either the Apple IOS Store or the Google Play Store.

The inputs are as follows: 
coinCode - the code of the coin package that was purchased, 
quantity - the number of coin packages purchased (NOT the number of coins in the package).  This is usually 1,
purchasePrice - the price in local currency that the user paid for the quantity of coin packcages,
platform - 'IOS' or 'ANDROID'
iosReceipt - if the purchase was made from the Apple Store this is the base 64 string of the transaction receipt received from the Apple Store.  This is set to null if the purchase was from the Google Play Store.
androidPurchaseToken - if the purchase was made from the Google Play Store this is the purchase token received from the Apple Store.  This is set to null if the purchase was from the Apple Store.
**/
export function PurchaseCoinPackage(token, coinCode, quantity, transactionReceipt, platform, transactionID, noRetries) {
  return function(dispatch){
    // dispatch(purchaseCoinPackageBegin());
    // eslint-disable-next-line
    if (coinCode == null){
      coinCode = "NO_COIN_CODE"
    }
    const mutationString = PURCHASE_COINS(coinCode, quantity, transactionReceipt, platform, transactionID, global.useSandbox );
    return axios.post(GRAPHQL_URL, { query: mutationString }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(purchaseCoinPackageError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // check to see if the coin purchase succeeded or if it it failed and is retryable
          let purchasedCoinPackage = json.data.data.purchaseCoinpackage.purchasedCoinPackage;
          let isRetryable = false;
          let errorMessage = null;
          const isConsumable = purchasedCoinPackage.isConsumable;;
          const finishTransaction = purchasedCoinPackage.finishTransaction;
          // record the purchase in the Redux store as this was a new purchase
          if (purchasedCoinPackage.purchasedQuantity > 0 && purchasedCoinPackage.recordPurchase){
            // the coin purchase receipt verification succeeded
            const coinBalance = purchasedCoinPackage.coinBalance;
            const productCode = purchasedCoinPackage.productCode;
            const expirationDate = purchasedCoinPackage.expirationDate;
            // remove the coinBalance key from the coin package purchase object as it is not needed in the Redux Store
            purchasedCoinPackage = removeKey (purchasedCoinPackage, 'coinBalance');
            purchasedCoinPackage = removeKey (purchasedCoinPackage, 'productCode');
            // add the purchased coin package to the Store
            dispatch(purchaseCoinPackageSuccess(purchasedCoinPackage));
            // update the user's coin balalnce
            dispatch(updateUserDataState('coinBalance', coinBalance));
            if (purchasedCoinPackage.isSubscription){
              // update the user's producxt code
              dispatch(updateUserDataState('productCode', productCode));
              dispatch(updateUserDataState('expirationDate', expirationDate));
            }
            
          }
          // eslint-disable-next-line
          else if (purchasedCoinPackage.purchasedQuantity = 0 && purchasedCoinPackage.isRetryable && purchasedCoinPackage.recordPurchase == false && finishTransaction == false){
            // the coin purchase verification failed but the receipt verification is retryable
            isRetryable = purchasedCoinPackage.isRetryable;
            errorMessage = purchasedCoinPackage.errorMessage;
            // if the number of retries is greater than 0 but less than or equal to 3 in crement the numbdr of retries
            if (noRetries >= 0 && noRetries < 3){
              dispatch(incrementIOSReceiptVerifyRetries());
            }
            else if (noRetries >= 3){
              // reset the number of retries to 0 as there can be no more retries for this receipt verification
              dispatch(resetIOSReceiptVerifyRetries);
            }
          }
          // eslint-disable-next-line
          else if (purchasedCoinPackage.purchasedQuantity = 0 && purchasedCoinPackage.recordPurchase == false && finishTransaction){
            dispatch(finalizeIAP());
          }
          return { finishTransaction: finishTransaction, isRetryable: isRetryable, errorMessage: errorMessage, isConsumable: isConsumable};   
        }
      })
      .catch(error => dispatch(purchaseCoinPackageFailure(error.message)));
  };
}

// GIVE USER COINS - Mutation sent to give users an arbitrary number of coins for various actions, 
// using firstVisit to reward users for exploring the app.
export function GiveUserCoins(token, eventCode) {
  return function(dispatch){
    dispatch(giveUserCoinsBegin());
    return axios.post(GRAPHQL_URL, { query: GIVE_USER_COINS(eventCode) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
      .then((json) => {
        if ('errors' in json.data) {
          dispatch(giveUserCoinsError(json.data.errors[0].message));
          return {errors: json.data.errors};
        }
        else{
          // update the user's coin balalnce
          dispatch(updateUserDataState('coinBalance', json.data.data.giveUsercoin.coinGrant.coinBalance));
          dispatch(giveUserCoinsSuccess);
          return json.data.data.giveUsercoin.coinGrant;
        }
      })
      .catch(error => dispatch(giveUserCoinsFailure(error.message)));
  };
}
