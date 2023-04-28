export const REQUEST_PAYOUT = (amount) => `mutation {
  requestPayout(requestedAmount: ${amount}) {
    accountBalance
  }
}`;
