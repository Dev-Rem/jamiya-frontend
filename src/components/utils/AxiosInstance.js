import axios from "axios";

export const axiosInstance = axios.create(
  {
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  },
  { withCredentials: true }
);

let refresh = false;
axiosInstance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log("using this guy");
    if (error.response.status === 401 && !refresh) {
      window.location.href = "/";

      // refresh = true;
      // const response = await axios.post(
      //   "http://localhost:8000/api/tokens/refresh/",
      //   { refresh: localStorage.getItem("refresh_token") },
      //   { headers: { "Content-Type": "application/json" } },
      //   { withCredentials: true }
      // );
      // if (response.status === 200) {
      //   localStorage.setItem("access_token", response.data.access);
      //   localStorage.setItem("refresh_token", response.data.refresh);
      return axios(error.config);
      // }
    }
    refresh = false;
    return error;
  }
);
