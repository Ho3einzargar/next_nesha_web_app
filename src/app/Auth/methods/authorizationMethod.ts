import { getLocalSTG, removeLocalSTG, setLocalSTG } from '@/app/helper/localRepository/localStorage';
import { refreshUser } from '@/app/Components/Modals/Auth/api/authApi';
import toast from 'react-hot-toast';

const ACCESS = 'access';
type authorizationModel = {
  access: string;
  refresh: string;
};
export const addAuthorization = (res: authorizationModel | any, username: string) => {
  setLocalSTG(ACCESS, res.token);
  setLocalSTG('expiry', res.expiry);
  setLocalSTG('username', username);
};

export const logOut = () => {
  removeLocalSTG(ACCESS);
  removeLocalSTG('refresh');
  removeLocalSTG('username');
  toast.success('logOut successfully');
};

export const isLoggined = () => {
  return getLocalSTG(ACCESS) != null ? true : false;
};

export const getAccessToken = () => {
  return getLocalSTG(ACCESS);
};

export async function refreshAccessToken(orgReq: any) {
  if (isLoggined()) {
    await refreshUser({ refreshtoken: getLocalSTG('refresh') }).then((res: any) => {
      if (res.data) {
        setLocalSTG(ACCESS, res.data.access);
        setLocalSTG('refresh', res.data.refresh);
        // apiMethod(orgReq);
        return res.data.access;
      } else {
        return null;
      }
    });
  } else {
    logOut();
    return null;
  }
}
