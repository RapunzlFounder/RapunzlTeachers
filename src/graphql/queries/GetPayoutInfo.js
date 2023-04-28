export const GET_PAYOUT_INFO = `
  query{
    getPayoutInfo {
      accName
      routingNo
      accNo
      isChecking
      isSavings
    }
  }
  `; 
