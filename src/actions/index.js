export const ActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};

export function logInUser(userProfileObj) {
  console.log(userProfileObj);
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_IN, payload: userProfileObj });
  };
}

export function logOutUser() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_OUT, payload: '' });
  };
}
