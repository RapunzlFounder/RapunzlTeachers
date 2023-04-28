export const REMOVE_LIKED_VIDEO = (likedVideoID) => `mutation {
  removeLikedvideo(id: ${likedVideoID}) {
    success
  }
}
`;
