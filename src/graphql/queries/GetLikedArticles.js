export const GET_LIKED_ARTICLES = `query{
  getLikedArticles(lastLikedID: 0){
    id
    likedId
  }
}
`;
