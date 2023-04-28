export const UPDATE_USER_LEVEL_INFO = 'UPDATE_USER_LEVEL_INFO';
export const UPDATE_COIN_BALANCE_INFO = 'UPDATE_COIN_BALANCE_INFO';
// this updates the state information regarding a user's current level.  userLevel is an object
export const updateUserLevelInfo = (userLevel) => ({
    type: UPDATE_USER_LEVEL_INFO,
    userLevel,
  });

// this updates the state information regarding a user's Coin Balance.
export const updateCoinBalanceInfo = (coinBalance) => ({
    type: UPDATE_COIN_BALANCE_INFO,
    coinBalance,
  });
  