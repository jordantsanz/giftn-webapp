/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* Actions for Dispatching and keeping redux state
*
*
*/
import axios from 'axios';

// action types
export const ActionTypes = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  UPDATE_USER: 'UPDATE_USER',
};

const UPS_URL = 'https://wwwcie.ups.com/track/v1/details';
// const FEDEX_URL = 'https://wsbeta.fedex.com:443/web-services';
const BACKEND_API = 'http://localhost:9090/api';

// // logs user into google authentication
// export function logInUser(userProfileObj) {
//   return (dispatch) => {
//     dispatch({ type: ActionTypes.LOG_IN, payload: userProfileObj });
//   };
// }

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

// Make new user, if there already isn't one
export function addUser(username, name) {
  return (dispatch) => {
    axios.get(`${BACKEND_API}/check/${username}`).then((response) => {
      console.log('check', response);

      // if no user, make new one
      if (!response.data) {
        axios.post(`${BACKEND_API}/user/${username}`, { username, name }).then((res) => {
          res.data.id = username;
          dispatch({ type: ActionTypes.LOG_IN, payload: res.data });

          // error catch
        }).catch((error) => {
          console.log(error);
        });

        // else get user
      } else {
        axios.get(`${BACKEND_API}/user/${username}`).then((res) => {
          console.log(res.data);
          res.data.id = username;
          dispatch({ type: ActionTypes.LOG_IN, payload: res.data });
        })

        // error catch
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
}

// function to update a user's budget
export function updateBudget(user, budget) {
  console.log('user', user);
  console.log('budget', budget);
  return (dispatch) => {
    axios.put(`${BACKEND_API}/budget/${user.id}`, { username: user.id, budget });
    const newuser = user;
    newuser.budget = budget;
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function addGiftToPerson(user, personId, gift) {
  console.log('id', user.id);
  console.log('gift', gift);
  return (dispatch) => {
    // update database
    axios.post(`${BACKEND_API}/personGift/${personId}`, { gift });

    // now update redux
    const newuser = user;
    console.log(personId);
    for (let i = 0; i < newuser.people.length; i++) {
      if (newuser.people[i].id == personId) {
        console.log('added gift in frontend');
        const { id } = gift;
        newuser.people[i].giftInfo[id] = gift;
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function deleteGiftFromPerson(user, personID, gift) {
  console.log('user', user);
  console.log('personID', personID);
  console.log('gift', gift);

  return (dispatch) => {
    const giftID = gift.id;
    axios.put(`${BACKEND_API}/personGift/${personID}`, { giftID });

    // now update redux
    const newuser = user;
    console.log(personID);
    for (let i = 0; i < newuser.people.length; i++) {
      if (newuser.people[i].id == personID) {
        for (const [key] of Object.entries(newuser.people[i].giftInfo)) {
          if (key == gift.id) {
            delete newuser.people[i].giftInfo[key];
            console.log('delete');
          }
        }
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function addPerson(user, person) {
  console.log('user', user.id);
  console.log('person', person);

  return (dispatch) => {
    axios.post(`${BACKEND_API}/person/${user.id}`, {
      headers: {
        'Content-Type': 'JSON',
      },
      person,
    }).then((response) => {
      console.log('add response', response);
    });
    user.people.push(person);
    console.log(user);
    dispatch({ type: ActionTypes.UPDATE_USER, payload: user });
  };
}

export function deletePerson(user, personID) {
  console.log(user);
  console.log(personID);
  return (dispatch) => {
    axios.put(`${BACKEND_API}/person/${user.id}`, {
      headers: {
        'Content-Type': 'JSON',
      },
      personID,
    });
    const newuser = user;
    for (let i = 0; i < user.people.length; i++) {
      if (user.people[i].id == personID) {
        delete newuser.people[i];
      }
    }

    console.log('new after delete', newuser);
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function buyGift(user, personID, gift) {
  console.log('buy gift user: ', user);
  console.log('buy gift gift', gift);
  return (dispatch) => {
    axios.put(`${BACKEND_API}/gift/${gift.id}`, { personID });
    const newuser = user;

    for (let i = 0; i < newuser.people.length; i++) {
      if (newuser.people[i].id == personID) {
        for (const [key] of Object.entries(newuser.people[i].giftInfo)) {
          const id = key;
          if (id == gift.id) {
            newuser.people[i].giftInfo[id].bought = true;
          }
        }
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function wishlistGift(user, personID, gift) {
  return (dispatch) => {
    axios.put(`${BACKEND_API}/wishlist/${gift.id}`, { personID });
    const newuser = user;
    for (let i = 0; i < newuser.people.length; i++) {
      if (newuser.people[i].id == personID) {
        for (const [key] of Object.entries(newuser.people[i].giftInfo)) {
          const id = key;
          if (id == gift.id) {
            newuser.people[i].giftInfo[id].bought = false;
          }
        }
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function addTrackingNumber(user, trackingNumberObject) {
  console.log('user', user);
  console.log('obj', trackingNumberObject);

  return (dispatch) => {
    axios.post(`${BACKEND_API}/tracking/${user.id}`, { trackingNumberObject });
    const newuser = user;
    console.log(newuser.trackingNumbers);
    newuser.trackingNumbers[trackingNumberObject.trackingNumber] = trackingNumberObject;
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function deleteTrackingNumber(user, trackingNumber) {
  console.log('user', user);
  console.log('obj', trackingNumber);

  return (dispatch) => {
    axios.put(`${BACKEND_API}/tracking/${user.id}`, { trackingNumber });
    const newuser = user;
    // delete and send to redux
    for (const [key] of Object.entries(newuser.trackingNumbers)) {
      const num = key;
      if (num == trackingNumber) {
        delete newuser.trackingNumbers[key];
      }
    }

    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}
