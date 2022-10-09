import axios from "axios";
import { SuccessAlert } from "../components/utils/Alerts";

export const GET_USER_TOKENS = "GET_USER_TOKENS";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

const ROOT_URL = "http://127.0.0.1:8000/api/";

// set tokens to local storage
const setToken = (token) => {
  localStorage.setItem("token", token);
};

// delete tokens from local storage
const deleteToken = () => {
  localStorage.removeItem("token");
};

// register a new user
export const signupUser = (credentials) => {
  return (dispatch) => {
    axios
      .post("http://127.0.0.1:8000/api/users/register/", credentials)
      .then((res) => {
        if (res.statusText === "Created")
          dispatch({
            type: NOT_AUTHENTICATED,
            currentUser: res.data.user,
            registered: true,
          });
      });
  };
};

export const loginUser = (credentials) => {
  return (dispatch) => {
    axios.post("http://127.0.0.1:8000/api/tokens/", credentials).then((res) => {
      if (res.statusText === "OK") {
        // console.log(res.data.access);
        dispatch({ type: AUTHENTICATED, currentuser: res });
        localStorage.setItem("token", res.data.access);
      } else {
        return dispatch({ type: NOT_AUTHENTICATED });
      }
    });
  };
};

// // log out a user
// export const logoutUser = () => {
//   return (dispatch) => {
//     return fetch("http://localhost:3000/logout", {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: getToken(),
//       },
//     }).then((res) => {
//       deleteToken();
//       if (res.ok) {
//         return res.json().then(() => dispatch({ type: NOT_AUTHENTICATED }));
//       } else {
//         return res.json().then((errors) => {
//           dispatch({ type: NOT_AUTHENTICATED });
//           return Promise.reject(errors);
//         });
//       }
//     });
//   };
// };

// // check authentication status of user
// export const checkAuth = () => {
//   return (dispatch) => {
//     return fetch("http://localhost:3000/current_user", {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: getToken(),
//       },
//     }).then((res) => {
//       if (res.ok) {
//         return res.json().then((user) => {
//           user.data
//             ? dispatch({ type: AUTHENTICATED, payload: user })
//             : dispatch({ type: NOT_AUTHENTICATED });
//         });
//       } else {
//         return Promise.reject(dispatch({ type: NOT_AUTHENTICATED }));
//       }
//     });
//   };
// };
