export const GIVE_USER_COINS = (code) => `mutation {
  giveUsercoin(code: ${JSON.stringify(code)}) {
  coinGrant {
    id
    description
    coinAmount
    createdAt
    coinBalance
  }
}
}`;
