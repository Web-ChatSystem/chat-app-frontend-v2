import axios, { AxiosInstance } from "axios";
import { notifications } from "@mantine/notifications";

const CORE_API = import.meta.env.VITE_PUBLIC_API_BASE_URL;
export const CORE_WEB_SOCKET = import.meta.env.VITE_PUBLIC_WEB_SOCKET;

axios.defaults.headers.common["Accept"] = "application/json";

const addInterceptor = (instant: AxiosInstance) => {
  instant.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers.Authorization = "";
        }
      }
      return config;
    },
    (err) => Promise.reject(err),
  );

  instant.interceptors.response.use(
    async (response) => {
      const { code } = response.data;
      if (
        code === 401 ||
        (code === 500 && !response.config.headers.Authorization)
      ) {
        localStorage.clear();
        notifications.show({
          title: "Phiên đăng nhập hết hạn",
          message: "Vui lòng đăng nhập lại",
        });
      }
      return response;
    },
    (err) => {
      if (err.response?.status === 401) {
        localStorage.clear();
        notifications.show({
          title: "Phiên đăng nhập hết hạn",
          message: "Vui lòng đăng nhập lại",
        });
        window.location.href = "/sign-in";
      }
      return Promise.reject(err);
    },
  );

  return instant;
};

const createInstance = (api: string) => {
  const instant = axios.create({
    baseURL: api,
  });

  addInterceptor(instant);

  return instant;
};

export const instanceCoreApi = createInstance(CORE_API);

export default function setupAxiosDefault() {
  axios.defaults.baseURL = CORE_API;
  addInterceptor(axios);
}
