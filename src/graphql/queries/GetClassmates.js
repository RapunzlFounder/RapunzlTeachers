export const GET_CLASSMATES = (schoolID) => ` query {
    getClassmates(schoolID: ${schoolID}) {
      id
      username
      firstName
      lastName
      prevStockPortClsVal
      noStockTransactions
      prevCryptoPortClsVal
      noCryptoTransactions
    }
  }
`;
