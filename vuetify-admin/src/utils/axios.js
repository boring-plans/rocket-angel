import axios from 'axios';
import { notification } from '@/plugins/notify';
import router from '@/router';
import { updateAccessToken, removeAccessToken } from '@/utils/storage-util';

const basicResponseSuccessInterceptor = response => {
  // except for network status code, business status code is well needed too
  // for example, when fetch an access token (use password and username),
  // possible definitions of business status code are below:
  //  0 - totally successful, got a meaningful token as expected
  //  1 - wrong password
  //  2 - invalid username
  // ...
  //
  // what is more, when token is almost out of date (but we keep requesting moments before),
  // status 210 will be received, and then we need to update token cached
  if (response.status === 210) {
    updateAccessToken(response.data.token);
  }
  return Promise.resolve(response.data);
};

const basicResponseErrorInterceptor = async err => {
  notification.error(err);

  // especially, once token is invalid or out of date, status 401,
  // which will be treated as an unauthenticated status in this app, will occur,
  // and page will be redirected
  if (err.response.status === 401) {
    removeAccessToken();
    notification.warning('Invalid authentication state! Redirecting to sign-in page');
    await router.push('/');
  }

  return Promise.reject(err);
};

const basicRequestInterceptor = config => {
  const token = sessionStorage.getItem('va-access-token');
  token && (config.headers['x-access-token'] = token);
  return config;
};

export const jsonAxios = axios.create({
  baseURL: '/api',
  timeout: 12000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

jsonAxios.interceptors.request.use(basicRequestInterceptor);

jsonAxios.interceptors.response.use(basicResponseSuccessInterceptor, basicResponseErrorInterceptor);

export const formDataAxios = axios.create({
  baseURL: '/api',
  timeout: 12000,
  withCredentials: false,
  headers: { 'Content-Type': 'multipart/form-data' },
});

formDataAxios.interceptors.request.use(basicRequestInterceptor);
formDataAxios.interceptors.response.use(basicResponseSuccessInterceptor, basicResponseErrorInterceptor);

export default jsonAxios;
