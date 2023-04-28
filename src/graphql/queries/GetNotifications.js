export const GET_NOTIFICATIONS = (number, lastnotifID) => `
query{
  getNotifications(number: ${number}, lastnotifID: ${lastnotifID}) {
    id
    message
    type
    timestamp
    read
    symbol
    portfolioID
  }
}
`;
