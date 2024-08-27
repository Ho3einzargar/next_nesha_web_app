import { ApiConfigGlobally, ApiConfigGloballyAccount } from '@/ApiConfig';
import { apiMethod } from '@/app/helper/Api/apiMethod';
import { roadMapApi } from '@/app/helper/Api/roadMapApi/roadMapApi';
export type registerModel = {
  username: any;
  password: any;
  email: any;
};

export type loginModel = {
  username: any;
  password: any;
};
type authorizationModel = {
  access: string;
  refresh: string;
};

export type refreshModel = {
  refreshtoken: any;
};
export const registerUser = (body: registerModel) => apiMethod.post(`${ApiConfigGloballyAccount}/${roadMapApi.Auth.register}`, body);
export const loginUser = (body: loginModel) => apiMethod.post<authorizationModel | any>(`${ApiConfigGloballyAccount}/${roadMapApi.Auth.login}`, body);
export const refreshUser = (body: refreshModel) => apiMethod.post(`${ApiConfigGlobally}/${roadMapApi.Auth.refresh}`, body);
