import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {
  SEND_PRODUCT_PURCHASE_BEGIN,
  SEND_PRODUCT_PURCHASE_SUCCESS,
  SEND_PRODUCT_PURCHASE_FAILURE,
  SEND_PRODUCT_PURCHASE_ERROR,
  PURCHASE_COIN_PACKAGE_BEGIN,
  PURCHASE_COIN_PACKAGE_SUCCESS,
  PURCHASE_COIN_PACKAGE_FAILURE,
  PURCHASE_COIN_PACKAGE_ERROR,
  FINALIZE_IAP,
  GIVE_USER_COINS_BEGIN,
  GIVE_USER_COINS_SUCCESS,
  GIVE_USER_COINS_FAILURE,
  GIVE_USER_COINS_ERROR,
  GET_ALL_PRODUCTS_BEGIN,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_ERROR,
  GET_COIN_PACKAGES_BEGIN,
  GET_COIN_PACKAGES_SUCCESS,
  GET_COIN_PACKAGES_FAILURE,
  GET_COIN_PACKAGES_ERROR,
  RESET_PRODUCT_STATE,
  RESET_PRODUCT_ERRORS,
  UPDATE_PRODUCTS_STATE,
  UPDATE_COINS_STATE,
  UPDATE_PRODUCT_PURCHASES_STATE,
  UPDATE_COIN_PURCHASES_STATE,
  UPDATE_SUBSCRIPTION_STATUS,
  IAP_CONNECTION_RESULT,
  IAP_ERROR,
  IAP_FAILURE,
  ADD_IAP_PENDING_PURCHASE,
  REMOVE_IAP_PENDING_PURCHASE,
  IAP_GET_PRODUCTS_SUCCESS,
  IAP_GET_SUBSCRIPTIONS_SUCCESS,
  IAP_PURCHASE_ERROR,
  IAP_INCREMENT_RETRY,
  IAP_RESET_RETRY,
  IAP_SAVE_RECEIPT,
  LOGOUT_USER_PRODUCTS,
} from '../ActionTypes/productActions';

const initialState = {
  loading: false,
  error: null,
  graphqlError: null,
  errorTitle: null,
  coinPackages: {},
  availableProducts: {},
  purchasedProducts: {},
  purchasedCoinPackages: {},
  flushFailedPurchasesCachedAsPendingAndroid: null,
  iapStoreProducts: [],
  iapStoreSubscriptions: [],
  iapConnectionResult: null,
  iapPurchaseError: null,
  iosReceipt: null,
  androidPurchaseToken: null,
  pendingIAP: {
    coinCode: null,
    coinPackageQuantity: 0,
    purchasePrice: 0.00,
    isSubscription: false,
    isConsumable: false,
},
  numberRetries: 0,
  iapErrorCodes: {
    E_UNKNOWN: "An unknown error has occurred",
    E_SERVICE_ERROR: "A service error has occurred",
    E_USER_CANCELLED: "The purchase was cancelled by the user",
    E_USER_ERROR: "A user error has occurred",
    E_ITEM_UNAVAILABLE: "The item is unavailable",
    E_REMOTE_ERROR: "A remote error has occurred",
    E_NETWORK_ERROR: "A network error has occurred",
    E_RECEIPT_FAILED: "A receipt failure has occurred",
    E_RECEIPT_FINISHED_FAILED: "A receipt finalization error has occurred",
  },
  subscriptionStatus: {}
};

const productReducer = (state = initialState, action) => {
  switch(action.type) {
    // update the status of a premium subscription at either the Apple Store or the Google Play Store
    case UPDATE_SUBSCRIPTION_STATUS:
      return {
        ...state,
        loading: false,
        subscriptionStatus: action.payload.subscription,
      };
    // save a purchase receipt in the event that verification fails and it is re-tryable
    case IAP_SAVE_RECEIPT:
      let iosReceipt = null;
      let androidPurchaseToken = null;
      // eslint-disable-next-line
      if (action.payload.platform == 'IOS'){
        iosReceipt = action.payload.receipt;
      }
      // eslint-disable-next-line
      else if (action.payload.platform == 'ANDROID'){
        androidPurchaseToken = action.payload.receipt;
      }
      return {
        ...state,
        loading: false,
        iosReceipt: iosReceipt,
        androidPurchaseToken: androidPurchaseToken,
      };
    // A IOS or Google Play Store connection result is received
    case IAP_CONNECTION_RESULT:
      return {
        ...state,
        loading: false,
        iapConnectionResult: action.payload.result,
      };
    case IAP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'InApp Purchase Store Failure'
      };
    case IAP_PURCHASE_ERROR:
      return {
        ...state,
        loading: false,
        iapPurchaseError: action.payload.error,
      };

    case IAP_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'InApp Purchase Store Error'
      };
    // Add a pendnig product purchase for the IOS or Google Play Stores
    case ADD_IAP_PENDING_PURCHASE:
      const pendingPurchase = {
                               coinCode: action.payload.coinCode,
                               coinPackageQuantity: action.payload.coinPackageQuantity,
                               purchasePrice: action.payload.purchasePrice, 
                               isSubscription: action.payload.isSubscription,
                               isConsumable: action.payload.isConsumable,
                              }
      return {
        ...state,
          loading: false,  
          pendingIAP: pendingPurchase,
      };
    // remove a pendning IAP purchase after the receipt has been returned and validated by the backend servers
    case REMOVE_IAP_PENDING_PURCHASE:
      return {
        ...state,
        loading: false,
        pendingIAP: {
          coinCode: null,
          coinPackageQuantity: 0,
          purchasePrice: 0.00,
          isSubscription: false,
          isConsumable: false,
      },
      }
    // increment the IOS IAP receipt verification attempts by 1
    case IAP_INCREMENT_RETRY:
      let currentRetries = state.numberRetries;
      currentRetries += 1;
      return {
        ...state,
        loading: false,
        numberRetries: currentRetries,
      }
    // reset the IOS IAP receipt verification attempts to 0 and remove any receipt
    case IAP_RESET_RETRY:
      return {
        ...state,
        loading: false,
        numberRetries: 0,
        iosReceipt: null,
        androidPurchaseToken: null,
      }  
    // A list of products that can be purchased is received from the IOS or Google Play Stores
    case IAP_GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,  
        iapStoreProducts: action.payload.products
      };
    // A list of subscriptions that can be purchased is received from the IOS or Google Play Stores
    case IAP_GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,  
        iapStoreSubscriptions: action.payload.subscriptions
      };
    case UPDATE_PRODUCTS_STATE:
      // update the availableProducts property for the overall state
      return {
        ...state,
        availableProducts: action.payload.products,
      }    
      
    case UPDATE_COINS_STATE:
      // update the coinPackages property for the overall state
      return {
        ...state,
        coinPackages: action.payload.coinPackages,
      }  
    case UPDATE_PRODUCT_PURCHASES_STATE:
      // update the purchasedProducts property for the overall state
      return {
        ...state,
        purchasedProducts: action.payload.products,
      }    
      
    case UPDATE_COIN_PURCHASES_STATE:
      // update the purchasedCoinPackages property for the overall state
      return {
        ...state,
        purchasedCoinPackages: action.payload.coinPackages,
      } 

    // SEND PRODUCT PURCHASE
    case SEND_PRODUCT_PURCHASE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case SEND_PRODUCT_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,  
        purchasedProducts: {
          ...state.purchasedProducts,
          [action.payload.purchasedProduct.id]: action.payload.purchasedProduct
        }
      };
    case SEND_PRODUCT_PURCHASE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Product Purchase Failure'
      };
    case SEND_PRODUCT_PURCHASE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Product Purchase Error'
      };

    // PURCHASE COIN PACKAGE
    case PURCHASE_COIN_PACKAGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case PURCHASE_COIN_PACKAGE_SUCCESS:
      return {
        ...state,
        error: null,
        graphqlError: null,
        errorTitle: null,
        numberRetries: 0,
        purchasedCoinPackages: {
          ...state.purchasedCoinPackages,
          [action.payload.purchasedCoinPackage.id]: action.payload.purchasedCoinPackage
        }
      };
    // this is used to finalize any iap purchase or just a receipt verification which is possible 
    case FINALIZE_IAP:
      return {
        ...state,
        error: null,
        graphqlError: null,
        errorTitle: null,
        loading: false,
      };
    case PURCHASE_COIN_PACKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Purchase Coin Package Failure'
      };
    case PURCHASE_COIN_PACKAGE_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Purchase Coin Package Error'
      };

    // GIVE USER COINS
    case GIVE_USER_COINS_BEGIN:
      return {
        ...state,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GIVE_USER_COINS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GIVE_USER_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Give User Coins Failure'
      };
    case GIVE_USER_COINS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Give User Coins Error'
      };

    // GET ALL PRODUCTS
    case GET_ALL_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get All Products Failure'
      };
    case GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get All Products Error'
      };

    // GET COIN PACKAGES
    case GET_COIN_PACKAGES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        graphqlError: null,
        errorTitle: null,
      };
    case GET_COIN_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_COIN_PACKAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorTitle: 'Get Coin Packages Failure'
      };
    case GET_COIN_PACKAGES_ERROR:
      return {
        ...state,
        loading: false,
        graphqlError: action.payload.error,
        errorTitle: 'Get Coin Packages Error'
      };
    

    // This action resets any errors that were produced by a graphql query or mutation so that the user pop up message only displays once
    case RESET_PRODUCT_ERRORS:
      return{
        ...state,
        graphqlError: null,
        error: null,
        errorTitle: null,
      };
    // reset the instrument state to it's initial state
    case RESET_PRODUCT_STATE:
      // reset to it's initial state and remove the persisted data from disk
      storage.removeItem('persist:root.product');
      return initialState;

    // reset the competition state to it's initial state
    case LOGOUT_USER_PRODUCTS:
      // reset the product state to it's initial state except for a pending IAP
      return{
        ...state,
        loading: false,
        error: null,
        graphqlError: null,
        errorTitle: null,
        coinPackages: {},
        availableProducts: {},
        purchasedProducts: {},
        purchasedCoinPackages: {},
        flushFailedPurchasesCachedAsPendingAndroid: null,
        iapStoreProducts: [],
        iapStoreSubscriptions: [],
        iapConnectionResult: null,
        iapPurchaseError: null,
        iosReceipt: null,
        androidPurchaseToken: null,
        numberRetries: 0,
        iapErrorCodes: {
          E_UNKNOWN: "An unknown error has occurred",
          E_SERVICE_ERROR: "A service error has occurred",
          E_USER_CANCELLED: "The purchase was cancelled by the user",
          E_USER_ERROR: "A user error has occurred",
          E_ITEM_UNAVAILABLE: "The item is unavailable",
          E_REMOTE_ERROR: "A remote error has occurred",
          E_NETWORK_ERROR: "A network error has occurred",
          E_RECEIPT_FAILED: "A receipt failure has occurred",
          E_RECEIPT_FINISHED_FAILED: "A receipt finalization error has occurred",
      },
      subscriptionStatus: {}
    }

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

// the state keys below are blacklisted as we do not need to persist these to storage on the device.  All other state keys are persisted.
const persistConfig = {
  key: 'product',
  storage,
}

export default persistReducer(persistConfig, productReducer);