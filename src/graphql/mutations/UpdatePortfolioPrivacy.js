export const UPDATE_PORTFOLIO_PRIVACY = (portfolioId, publicView, friendsView, portfolioType) => `mutation {
  updatePortfolioPrivacy(portfolioId: ${portfolioId}, friendsView: ${friendsView}, publicView: ${publicView}, portfolioType: ${portfolioType}) {
    success
  }
}
`;
