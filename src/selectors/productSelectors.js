import { createSelector } from 'reselect';
import { objectToArray } from '../helper_functions/utilities';

// selector to get the list of avilable products that the ussr can purchase
const availableProductsArraySelector = (state) => objectToArray(state.product.availableProducts);
// selector to get the list of avilable coin packages that the ussr can purchase
const coinPackageArraySelector = (state) => objectToArray(state.product.coinPackages);
// selector to get the list of products that the ussr has purchased
const purchasedProductsArraySelector = (state) => objectToArray(state.product.purchasedProducts);
// selector to get the list of avilable coin packages that the ussr can purchase
const purchasedCoinPackageArraySelector = (state) => objectToArray(state.product.purchasedCoinPackages);
// selector to get the list of features that the user has in their current package, either the base free tier, or a subscription product
const currentFeaturesArraySelector = (state) => objectToArray(state.userDetails.productFeatures);

// Reselector to provide an array of available products that the user can purchase
export const getAvailableProducts = createSelector(
    [availableProductsArraySelector],
    (productArray) => {
      if (productArray && productArray.length > 0) {
        return productArray;
      }
      return [];
    }
  )

// Reselector to provide an array of coin packages that the ussr can purchase
export const getCoinPackages = createSelector(
  [coinPackageArraySelector],
  (coinPackageArray) => {
    if (coinPackageArray && coinPackageArray.length > 0) {
      return coinPackageArray;
    }
    return [];
  }
)

// Reselector to provide an array of products that the ussr has purchased
export const getPurchasedProducts = createSelector(
  [purchasedProductsArraySelector],
  (purchasedProductArray) => {
    if (purchasedProductArray && purchasedProductArray.length > 0) {
      return purchasedProductArray;
    }
    return [];
  }
)

// Reselector to provide an array of coin packages that the ussr has purchased
export const getPurchasedCoinPackages = createSelector(
  [purchasedCoinPackageArraySelector],
  (purchasedCoinPackageArray) => {
    if (purchasedCoinPackageArray && purchasedCoinPackageArray.length > 0) {
      return purchasedCoinPackageArray;
    }
    return [];
  }
)

// Reselector to provide an array of features that the user has in their current package, either the base free tier, or a subscription product
export const getCurrentProductFeatures = createSelector(
  [currentFeaturesArraySelector],
  (featuresArray) => {
    if (featuresArray && featuresArray.length > 0) {
      return featuresArray;
    }
    return [];
  }
)

// Reselector to provide an array of product skus that are send to the IOS and Google Play stores to retrieve the full product details- NOT FOR SUBSCRIPTIONS
export const getProductSkus = createSelector(
  [coinPackageArraySelector],
  (coinPackageArray) => {
    let productSkus = []
    if (coinPackageArray && coinPackageArray.length > 0) {
      for (var i = 0; i < coinPackageArray.length; i++) {
        if (coinPackageArray[i].purchaseType == 'ONE_OFF_PURCHASE') {
          productSkus.push(coinPackageArray[i].coinCode);
        }
      }
    }
    return productSkus;
  }
)

// Reselector to provide an array of subscription skus that are send to the IOS and Google Play stores to retrieve the full subscription details - NOT FOR SUBSCRIPTIONS
export const getSubscriptionSkus = createSelector(
  [coinPackageArraySelector],
  (coinPackageArray) => {
    let productSkus = []
    if (coinPackageArray && coinPackageArray.length > 0) {
      for (var i = 0; i < coinPackageArray.length; i++) {
        if (coinPackageArray[i].purchaseType == 'MONTHLY_SUBSCRIPTION') {
          productSkus.push(coinPackageArray[i].coinCode);
        }
      }
    }
    return productSkus;
  }
)