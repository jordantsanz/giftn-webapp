/* Actions for Dispatching and keeping redux state
*
*
*/
import axios from 'axios';

// action types
export const ActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};

const UPS_URL = 'https://wwwcie.ups.com/track/v1/details';
// const FEDEX_URL = 'https://wsbeta.fedex.com:443/web-services';

// logs user into google authentication
export function logInUser(userProfileObj) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_IN, payload: userProfileObj });
  };
}

export function callUPS(trackingNumber) {
  const config = {
    headers: {
      Username: 'jordantsanz',
      Password: 'Jord@nTs19',
      AccessLicenseNumber: '9D8FDD7B8B50C912',
    },
    crossdomain: true,
  };
  return (dispatch) => {
    axios.get(`${UPS_URL}/${trackingNumber}`, { config }).then((response) => {
      dispatch({ type: ActionTypes.UPS_TRACK, payload: response.data });
    })

      .catch((error) => {
        return error;
      });
  };
}

// logs user out of google authentication
export function logOutUser() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOG_OUT, payload: '' });
  };
}
