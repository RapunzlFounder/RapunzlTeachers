export const GET_PAYOUT_HISTORY = `
  query{
    getPayouts {
      amount
      requestDate
      completed
    }
  }
  `; 
