
export const UPDATE_FIRSTVISIT_STATE = 'UPDATE_FIRSTVISIT_STATE';
export const RESET_FIRSTVISIT = 'RESET_FIRSTVISIT';

// this updates an individual property of the firstvisit state. eg to change the state property of an individual screen 
export const updateFirstVisitState = (name, status) => ({
  type: UPDATE_FIRSTVISIT_STATE,
  name,
  status
});

// action to reset the firstvisit state to it's initial state
export const resetFirstVisitState = () => ({
  type: RESET_FIRSTVISIT,
});

