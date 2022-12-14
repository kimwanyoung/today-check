import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = refreshToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 5);

  return cookies.set('refreshToken', refreshToken, {
    expires: new Date(expireDate),
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });
};

export const setAccessToken = accessToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 5);

  return cookies.set('accessToken', accessToken, {
    expires: new Date(expireDate),
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });
};

export const setAccessKey = accessKey => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 5);

  return cookies.set('accessKey', accessKey, {
    expires: new Date(expireDate),
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });
};

export const setAccessId = accessId => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 5);

  return cookies.set('accessId', accessId, {
    expires: new Date(expireDate),
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  });
};

export const getAccessToken = () => {
  return cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return cookies.get('refreshToken');
};

export const getAccessKey = () => {
  return cookies.get('accessKey');
};

export const getAccessId = () => {
  return cookies.get('accessId');
};

export const removeRefreshToken = () => {
  return cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
};

export const removeAccessToken = () => {
  return cookies.remove('accessToken', { sameSite: 'strict', path: '/' });
};
