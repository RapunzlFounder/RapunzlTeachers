import { createSelector } from 'reselect';
import {  objectToArray } from '../helper_functions/utilities';

const notificationTypeArraySelector = (state) => objectToArray(state.notification.notificationTypes);
// this selector returns an array of the historical push notifications received ordered by id descending (ie most recent first), with inly the first 'returnNumber' being returned
const notificationHistoryArraySelector = (state) => objectToArray(state.notification.notifications);
// the number of received notification messages to return to a component for display
const selectDisplayNo = (state) => state.notification.displayNumber;
// selector to return an array of push notification types that the user wishes to receive
export const getNotificationTypesSelector = createSelector(
    [notificationTypeArraySelector],
    (notificationTypeArray) => {
    // before returning the notification types data array make sure that the notification data is not still loading and that there is actually a data array present.
    //  If not return an empty array.
      if (notificationTypeArray && notificationTypeArray.length > 0) {
        return notificationTypeArray;
      }
      return [];
    }
  )

/* selector to return an object of arrays of push notification messages that the user has received and of unread notfication id's
    The returned object has 2 properties as follows:
    notifications:  array of notification history objects.  The number of objects in the array is determined by the Redux notification state displayNumber property (default is 25 messages).
    unreadIDs: array of unread notification ids required to be provided to set the unread notifications to read.
*/
export const getNotificationHistorySelector = createSelector(
  [notificationHistoryArraySelector, selectDisplayNo],
  (notificationHistoryArray, displayNo) => {
    let returnobject = {notifications:[], unreadIDs: []};
  // before returning the notification message history data array make sure that the notification data is not still loading and that there is actually a data array present.
  //  If not return an empty array.
    if (notificationHistoryArray && notificationHistoryArray.length > 0) {
      // filter the notificationHistoryArray for any unread notifications
      for (var i = 0; i < notificationHistoryArray.length; i++) {
        // eslint-disable-next-line
        if (notificationHistoryArray[i].read == false) {
          returnobject.unreadIDs.push(notificationHistoryArray[i].id);
        }
      }
      // sort the array of received notifications by id descending.  This ensures that the most recent messages are first
      notificationHistoryArray.sort((a,b) =>  b.id - a.id );
      // if the array of notification objects is longer than the displayNo reduce it to this number of objects in the array
      if (notificationHistoryArray.length > displayNo){
        returnobject.notifications = notificationHistoryArray.slice(0, displayNo);
      }
      else{
        returnobject.notifications = notificationHistoryArray;
      }
    }
    
    return returnobject;
  }
)



