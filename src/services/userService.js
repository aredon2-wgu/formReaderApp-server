import http from "./httpService";
import { apiURL, httpConfig } from "../config.json";

const apiEndpoint = apiURL + "/users";

export function register(user) {
  const userObj = {
    email: user.email,
    password: user.password,
    name: user.name,
  };
  return http.post(apiEndpoint, userObj, httpConfig);
}
