export const SEARCH_CRYPTOS = (searchSymbol, searchName, searchText) => `query{
    searchCryptos(searchSymbol:${searchSymbol}, searchName:${searchName}, searchText: ${JSON.stringify(searchText)}, limit:25){
     id
     symbol
     coinName
     quoteIncrement
         tradeIncrement
         logoURL
         messageBoardURL
         websiteURL
         redditURL
         techDocURL
         twitterURL
         isTradeable
         baseMinSize
         baseMaxSize
   }
 }`;
  