import { message } from 'antd';

export interface IRoles {
  role_id?: string;
  role_name?: string;
}
export interface userInfo {
  aid: number;
  email: string;
  roles: IRoles;
  token: string;
}
//userinfo
export const getUserInfo = () => {
  if (localStorage.getItem('valluna-user-info')) {
    return JSON.parse(localStorage.getItem('valluna-user-info') as string);
  } else {
    return {};
  }
};
export const setUserInfo = (userinfo: userInfo) => {
  localStorage.setItem('valluna-user-info', JSON.stringify(userinfo));
  setUserToken(userinfo.token);
  setUserRoles(userinfo.roles);
};
export const removeUserInfo = () => {
  localStorage.removeItem('valluna-user-info');
  localStorage.removeItem('token');
  localStorage.removeItem('valluna-user-roles');
};

//token
export const getUserToken = (): string => {
  return localStorage.getItem('token') || '';
};
export const setUserToken = (token: string) => {
  localStorage.setItem('token', token);
};

//roles
export const getUserRoles = () => {
  return JSON.parse(localStorage.getItem('valluna-user-roles') || '');
};
export const setUserRoles = (roles: IRoles) => {
  localStorage.setItem('valluna-user-roles', JSON.stringify(roles));
};
export const removeUserRoles = () => {
  localStorage.removeItem('valluna-user-roles');
};
export const removeToken = () => {
  localStorage.removeItem('token');
};
export const getUserName = (): string => {
  return getUserInfo().email || '';
};

export const useUserAuth = (routeName: string): boolean => {
  let haveAuth = false;
  if (!getUserRoles() || !getUserRoles()[0]?.rights) {
    message.error('Identity expired, please log in again');
    haveAuth = false;
    return haveAuth;
  }
  const userRoles = getUserRoles()[0]?.rights;
  userRoles.map((item: any, index: number) => {
    if (item.name == routeName && item.level == 3) {
      haveAuth = true;
    }
  });
  return haveAuth;
};
export const expiredAuth = () => {
  message.warning('Identity expired');
};
//auth
