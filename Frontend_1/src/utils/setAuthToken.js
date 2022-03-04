import api from "./api";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (accessToken) => {
  if (accessToken) {
    api.defaults.headers.common["Bearer"] = accessToken;
    localStorage.setItem("accessToken", accessToken);
  } else {
    delete api.defaults.headers.common["Bearer"];
    localStorage.removeItem("accessToken");
  }
};

export default setAuthToken;