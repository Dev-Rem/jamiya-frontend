import axios from "axios";

export const GET_USER_TOKENS = "GET_USER_TOKENS";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

const ROOT_URL = "http://127.0.0.1:8000/api/";

// set tokens to local storage
const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

// get tokens from local storage
export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const timeAllowed = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < timeAllowed) {
    return localStorage.getItem("token");
  }
};

// delete tokens from local storage
const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("lastLoginTime");
};

// register a new user
export const signupUser = (credentials) => {
  return (dispatch) => {
    return axios
      .post("http://127.0.0.1:8000/api/users/register/", credentials)
      .then((res) => {
        if (res.ok) {
          setToken(res.headers.get("Authorization"));
          return res
            .json()
            .then((userJson) =>
              dispatch({ type: AUTHENTICATED, payload: userJson })
            );
        } else {
          return res.json().then((errors) => {
            dispatch({ type: NOT_AUTHENTICATED, payload: errors });
            // return Promise.reject(errors);
          });
        }
      });
  };
};

export const loginUser = (credentials) => {
  return (dispatch) => {
    return fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials }),
    }).then((res) => {
      if (res.ok) {
        setToken(res.headers.get("Authorization"));
        return res
          .json()
          .then((userJson) =>
            dispatch({ type: AUTHENTICATED, payload: userJson })
          );
      } else {
        return res.json().then((errors) => {
          dispatch({ type: NOT_AUTHENTICATED });
          return Promise.reject(errors);
        });
      }
    });
  };
};

// log out a user
export const logoutUser = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }).then((res) => {
      deleteToken();
      if (res.ok) {
        return res.json().then(() => dispatch({ type: NOT_AUTHENTICATED }));
      } else {
        return res.json().then((errors) => {
          dispatch({ type: NOT_AUTHENTICATED });
          return Promise.reject(errors);
        });
      }
    });
  };
};

// check authentication status of user
export const checkAuth = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/current_user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((user) => {
          user.data
            ? dispatch({ type: AUTHENTICATED, payload: user })
            : dispatch({ type: NOT_AUTHENTICATED });
        });
      } else {
        return Promise.reject(dispatch({ type: NOT_AUTHENTICATED }));
      }
    });
  };
};
