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

export function deletePerson(user, personId) {
  return (dispatch) => {
    axios.delete(`${BACKEND_API}/person/${user.id}`, { personId });
    const newuser = user;
    for (let i = 0; i < user.people.length; i++) {
      if (user.people[i].id == personId) {
        delete newuser.people[i];
      }
    }

    console.log('new after delete', newuser);
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function buyGift(user, gift) {
  return (dispatch) => {
    axios.put(`${BACKEND_API}/gift/${gift.id}`);
    const newuser = user;
    for (let i = 0; i < newuser.people.length; i++) {
      for (const [key] of newuser.people[i].giftInfo) {
        const id = key;
        if (id == gift.id) {
          newuser.people[i].giftInfo[id].bought = true;
        }
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}

export function wishlistGift(user, gift) {
  return (dispatch) => {
    axios.delete(`${BACKEND_API}/gift/${gift.id}`);
    const newuser = user;
    for (let i = 0; i < newuser.people.length; i++) {
      for (const [key] of newuser.people[i].giftInfo) {
        const id = key;
        if (id == gift.id) {
          newuser.people[i].giftInfo[id].bought = false;
        }
      }
    }
    dispatch({ type: ActionTypes.UPDATE_USER, payload: newuser });
  };
}
