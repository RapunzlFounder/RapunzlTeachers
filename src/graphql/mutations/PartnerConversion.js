export const PARTNER_CONVERSION = (amount, partnerID) => `mutation {
  partnerConversion(requestedAmount: ${amount}, partnerId: ${partnerID}) {
    success
  }
}
`;
