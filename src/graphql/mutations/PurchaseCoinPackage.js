/**

This mutation sends the details of a coin package that has been purchased by the user at either the Apple IOS Store or the Google Play Store.

The inputs are as follows: 
coinCode - the code of the coin package that was purchased, 
quantity - the number of coin packages purchased (NOT the number of coins in the package).  This is usually 1,
purchasePrice - the price in local currency that the user paid for the quantity of coin packcages,
platform - 'IOS' or 'ANDROID'
transactionReceipt - if the purchase was made from the Apple Store this is the base 64 string of the transaction receipt received from the Apple Store.  
if the purchase was made from the Google Play Store this is the purchase token received from the Google Play Store. 
isSubscription - true = the cpoin package being purchased is a subscription, false = the cin package is a one off consumable purchase and is not a subscription
The returned object includes the following properties:
id - this is the purchased coin package id not the coin package id, 
coinBalance -  the user's updated coin balance to reflect the coin package purchase,
**/

export const PURCHASE_COINS = (coinCode, quantity, transactionReceipt, platform, transactionID, useSandbox) => `mutation {
  purchaseCoinpackage(coinPackageInput:{coinCode: ${JSON.stringify(coinCode)}, quantity: ${quantity}, transactionReceipt: ${JSON.stringify(transactionReceipt)}, transactionID: ${JSON.stringify(transactionID)}, platform: ${platform}, useSandbox: ${useSandbox}}) {
    purchasedCoinPackage {
      receiptVerificationSucceeded
      id
      coinPackageId
      coinPackageName
      coinPackageCode
      discountPercentage
      purchasedQuantity
      bonusCoins
      baseCurrencyPrice
      purchaseCurrencyPrice
      purchasedAt
      transactionReceipt
      coinBalance
      productCode
      errorMessage
      isRetryable
      isConsumable
      expirationDate
      recordPurchase 
      finishTransaction 
    }
  }
}`;
