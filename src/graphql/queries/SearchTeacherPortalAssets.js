export const SEARCH_PORTAL_ASSETS = (searchKeyword, searchStandard, searchText) => `query{
  searchPortalAssets(searchKeyword:${searchKeyword}, searchStandard:${searchStandard}, searchText: ${JSON.stringify(searchText)}, limit:100){
    assetId
		assetType
		moduleId
		assetName
		assetDescription
		assetImageUrl
		documentUrl
  }
}`;
