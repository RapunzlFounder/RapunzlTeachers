export const SEARCH_COMPANIES = (searchSymbol, searchName, searchText) => `query{
  searchCompanies(searchSymbol:${searchSymbol}, searchName:${searchName}, searchText: ${JSON.stringify(searchText)}, limit:25){
    id
    symbol
    companyName
    currency
		exchange
  }
}`;
