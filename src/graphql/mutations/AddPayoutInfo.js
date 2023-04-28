export const ADD_PAYOUT_INFO = (accountName, routingNumber, accountNumber, isChecking, isSaving, ssn, address1, address2, city, state, zip) => `mutation {
  addPayoutinfo(
    accName: "${accountName}",
    routingNo: "${routingNumber}",
    accNo: "${accountNumber}",
    isChecking: ${isChecking},
    isSavings: ${isSaving}
    ssn: "${ssn}",
    address1: "${address1}",
    address2: "${address2}",
    addressCity: "${city}",
    addressState: "${state}",
    addressZipCode: "${zip}"
  ){
    success
  }
}`;
