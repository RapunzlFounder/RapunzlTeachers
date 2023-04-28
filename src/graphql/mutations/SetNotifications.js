export const SET_NOTIFICATIONS = (notifToken = null, platform = null, notificationsArray = null, removeAll = false) => {
  // NotificationsArray can include any of the following: ['GENERAL', 'PORTFOLIO_UPDATES', 'COMPETITION UPDATES'] 
  // When a user first signs up for notifications, we will subscribe them to all notification types.
  let mutationText = '';
  if (removeAll){
    mutationText = `mutation {
      setNotifications(
        removeAll: ${removeAll}) {
          notifications {
            id
            type
          }
        }
      }
    `;
  }
  else if (notifToken != null && platform != null && notificationsArray != null){
    mutationText = `mutation {
      setNotifications(
        token: ${JSON.stringify(notifToken)},
        platform: ${platform},
        typeList: [GENERAL,PORTFOLIO_UPDATES, COMPETITION_UPDATES],
        removeAll: false) {
          notifications {
            id
            type
          }
        }
      }
    `;
    return mutationText;
  }
  else{
    return undefined;
  }
};
