export const SET_READ_NOTIFICATIONS = (idArray) => `
  mutation {
    setReadnotifications(idList: [${idArray}]) {
      status{
        success
        xpEvents{
          id
          description
          xpAmount
        }
        userLevel{
          currentLevelNumber
          nextLevelXP
          xpPointsBalance
        }
      }
    }
  }
`;
