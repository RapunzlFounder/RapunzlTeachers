export const ADD_LIKED_VIDEO = (videoID) => `mutation {
  addLikedvideo(videoId: ${videoID}){
    success
  }
}`;
