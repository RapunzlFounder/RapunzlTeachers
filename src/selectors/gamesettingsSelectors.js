import { createSelector } from 'reselect';

const levelSelector = (state) => state.gamesettings.levels;
const xpEventSelector = (state) => state.gamesettings.xpEvents;

// reselect selector to return an array of Rapunzl App gamification levels
export const getAllLevelsSelector = createSelector(
    [levelSelector],
    (levels) => {
    // before returning the levels data array make sure that the data is not still loading and that there is actually a data array present.
    //  If not return an empty array.
      if (levels && levels.length > 0) {
        return levels;
      }
      return [];
    }
  )

// reselect selector to return an array of Rapunzl App gamification XP events
export const getAllXPEventsSelector = createSelector(
  [xpEventSelector],
  (xpevents) => {
  // before returning the XP Events data array make sure that the data is not still loading and that there is actually a data array present.
  //  If not return an empty array.
    if (xpevents && xpevents.length > 0) {
      return xpevents;
    }
    return [];
  }
)

