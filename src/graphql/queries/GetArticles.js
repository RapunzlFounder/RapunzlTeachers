export const GET_ARTICLES = (lastArticleID) => `
  query{
    getArticles(lastID: ${lastArticleID}){
      id
      title
      type
      base64Image
      imageURL 
      articleURL
      keywords 
      levelRequired 
      subscriptionRequired 
      coinPrice
      datePublished
    }
  }
`;

