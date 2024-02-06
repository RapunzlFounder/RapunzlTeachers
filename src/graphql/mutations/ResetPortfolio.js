export const RESET_PORTFOLIO = (portfolioId, portfolioType) => `mutation {
	resetPortfolio(portfolioId: ${portfolioId}, portfolioType: ${portfolioType}) {
		portfolio {
		  id
		  name
		  description
		  isActive
		  tradingAcctID
		  isSavedPortfolio
		  startValue
		  cashValue
		  currentValue
		  publicView
		  friendsView
		  longOnlyPositions
		  dateCreated
		  wasRest
		  dateReset
		  positions{
			symbol
		  }
		}
	  }
}`;