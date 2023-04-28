export const REMOVE_LIKED_ARTICLE = (likedArticleID) => `mutation {
  removeLikedarticle(id: ${JSON.stringify(likedArticleID)}) {
    success
  }
}
`;