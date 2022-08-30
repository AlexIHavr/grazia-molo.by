import axios, { AxiosInstance } from 'axios';
import loginReducer from '../components/Wrapper/Windows/Login/loginReducer';
import preloaderReducer from '../components/Wrapper/Windows/Preloader/preloaderReducer';
import config from '../config/config';

const setAuthInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    preloaderReducer.enablePreloader();
    config.headers.Authorization = localStorage.getItem('accessToken');
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      preloaderReducer.disablePreloader();
      return config;
    },
    async (err) => {
      preloaderReducer.disablePreloader();
      const originalRequest = err.config;
      if (err.response.status === 401 && err.config && !err.config.isRetry) {
        originalRequest.isRetry = true;
        try {
          await loginReducer.refreshToken();
          return api.request(originalRequest);
        } catch (e) {
          console.log(e);
        }
      }
      throw err;
    }
  );
};

const setVisitorInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    preloaderReducer.enablePreloader();
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      preloaderReducer.disablePreloader();
      return config;
    },
    (err) => {
      preloaderReducer.disablePreloader();
      throw err;
    }
  );
};

export const visitorApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/visitor`,
});
setVisitorInterceptors(visitorApi);

export const userApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/user`,
});
setAuthInterceptors(userApi);

export const adminApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/admin`,
});
setAuthInterceptors(adminApi);
