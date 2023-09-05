export const WEBSOCKET_PORTFOLIO_UPDATE = 'WEBSOCKET_PORTFOLIO_UPDATE';

// action to update portfolio info when a websocket update occurs
export const websocketPortfolioUpdate = (portfolioID, totalPercentChange, portfolioType) => ({
    type: WEBSOCKET_PORTFOLIO_UPDATE,
    portfolioID,
    totalPercentChange,
    portfolioType
  });