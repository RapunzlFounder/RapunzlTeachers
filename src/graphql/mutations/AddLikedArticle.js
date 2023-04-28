export const ADD_LIKED_ARTICLE = (articleID) => `mutation {
  addLikedarticle(articleId: ${articleID}){
    success
  }
}`;
