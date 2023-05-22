import axios from "axios";
import * as React from "react";

export const Logout = () => {
  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
};
