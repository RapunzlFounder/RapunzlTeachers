export const GET_VIDEOS = (lastID) => `
  query{
    getVideos(lastID: ${lastID}){
      id
      title
      previewText
      base64Image
      imageURL 
      videoURL
      keywords 
      levelRequired 
      subscriptionRequired 
      coinPrice
      datePublished
    }
  }
`;

