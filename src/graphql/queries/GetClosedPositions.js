// the input parameter 'skip' allows you to skip the first number of specified records in the returned list of closed positions. 
// Set this input paramter to 0 to not skip any records.
// the input parameter 'first' allows you to return only the first number of specified records in the returned list of closed positions.
// Set this input paramter to 0 to return all records that have not been skipped.
export const GET_CLOSED_POSITIONS = (portfolioID, portfolioType, skip, first) => `
  query{
    getClosedPositions(portfolioID: "${portfolioID}", portfolioType: ${portfolioType}, skip: ${skip}, first: ${first}) {
      id
      isOpen
      symbol
      symbolName
      symbolType
      exchange
      quantity
      aveEntryPrice
      aveExitPrice
      side
      costBasis
      publicView
      friendsView
      openedAt
      closedAt
      closedAtInt
      commission
      fees
      profitLoss
    }
  }
`;