import { ApiConfigGlobally } from '@/ApiConfig';
import { getAccessToken, isLoggined, logOut, refreshAccessToken } from '@/app/Auth/methods/authorizationMethod';
import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import toast from 'react-hot-toast';
export const apiMethod = axios.create({
  baseURL: ApiConfigGlobally,
  headers: { 'Content-Type': 'application/json' },
});

apiMethod.interceptors.request.use(
  async (req: any) => {
    const AccessToken = await getAccessToken();
    if (AccessToken)
      req.headers = {
        Authorization: `Bearer ${AccessToken}`,
      };
    else {
      req.headers = {
        Authorization: ``,
      };
    }
    return req;
  },
  async function (error) {
    // toast.error(error);
    // const originalRequest = error.config;
    // if (error.response.status === 401) {
    //   if (isLoggined()) {
    //     originalRequest._retry = true;
    //     const access_token = await refreshAccessToken();
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    //     return apiMethod(originalRequest);
    //   } else {
    //     logOut();
    //   }
    // }
    return null;
  }
);

apiMethod.interceptors.response.use(
  async response => {
    // return response;
    const originalRequest = response.config;

    if (response.data.status === 401) {
      const newToken = await refreshAccessToken(originalRequest);
      // return apiMethod(originalRequest);
      if (newToken) {
        return apiMethod(originalRequest);
      } else {
        logOut();
        return response;
      }
    } else {
      return response;
    }
    // return Promise.reject(response);
  },
  async function (error) {
    // toast.error(error);
    // const originalRequest = error.config;
    // if (error.response.status === 401) {
    //   if (isLoggined()) {
    //     originalRequest._retry = true;
    //     const access_token = await refreshAccessToken();
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    //     return apiMethod(originalRequest);
    //   } else {
    //     logOut();
    //   }
    // }
    return null;
  }
);
// axios.interceptors.response.use(
//   response => {
//     console.log('REESSSSSS', response);

//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;

//     // if (error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token') {
//     //   router.push('/login');
//     //   return Promise.reject(error);
//     // }

//     // if (error.response.status === 401 && !originalRequest._retry) {
//     //   originalRequest._retry = true;
//     //   const refreshToken = localStorageService.getRefreshToken();
//     //   return axios
//     //     .post('/auth/token', {
//     //       refresh_token: refreshToken,
//     //     })
//     //     .then(res => {
//     //       if (res.status === 201) {
//     //         localStorageService.setToken(res.data);
//     //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//     //         return axios(originalRequest);
//     //       }
//     //     });
//     // }
//     return Promise.reject(error);
//   }
// );
