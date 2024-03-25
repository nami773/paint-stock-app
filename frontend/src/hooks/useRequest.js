import useAxios from "axios-hooks";
import axios from "axios";

import { API_HOST } from "../lib/constants";
import { getUser } from "../lib/auth";

axios.interceptors.request.use(
  async (config) => {
    const user = getUser();
    if (user) {
      const { username, password } = user;
      const basicAuth = btoa(`${username}:${password}`);
      config.headers = {
        Authorization: `Basic ${basicAuth}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useGetQuery = (route, opts) => {
  const prefix = API_HOST;

  const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
    prefix + route,
    {
      ...opts,
    }
  );
  return { data, isLoading, isError, execute };
};

export const usePatchQuery = (route) => {
  const prefix = API_HOST;

  const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
    {
      url: prefix + route,
      method: "PATCH",
    },
    { manual: true }
  );
  return { data, isLoading, isError, execute };
};
