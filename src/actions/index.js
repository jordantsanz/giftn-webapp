/* Actions for Dispatching and keeping redux state
*
*
*/

// action types
export const ActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};

// logs user into google authentication
export function logInUser(userProfileObj) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_IN, payload: userProfileObj });
  };
}

// logs user out of google authentication
export function logOutUser() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_OUT, payload: '' });
  };
}
