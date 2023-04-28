/** 

This mutation purchases a Rapunzl product that is NOT a monthly or annual subscription, ie it is a one-off purchase.  The user must have an existing coin balance in order to purchase a product using this mutation. 

The inputs are as follows: 
productID - the ID of the Rapunzl Product to be purchased, 
quantity - the quantity of the product that is to be purchased.  This is usually 1,
useOneOffProduct - 'true' = use the one off product as soon as it is purchased.  'false' = Do not use the product right away.

The returned object includes the following properties:
id - this is the purchased product id not the product id, 
coinBalance -  the user's updated coin balance to reflect the product purchase,
active -indicates if the purchased product is still active (true) or not (false)

**/
export const PURCHASE_PRODUCT = (productID, quantity, useOneOffProduct) => `mutation {
  purchaseProduct(productId: ${productID}, quantity: ${quantity}, useOneOffProduct: ${useOneOffProduct}) {
    purchasedProduct {
      id
      productId
      productName
      productCode
      purchasedQuantity
      baseCoinPrice
      purchaseCoinPrice
      purchasedAt
      expirationDate
      active
      coinBalance
    }
  }
}`;
