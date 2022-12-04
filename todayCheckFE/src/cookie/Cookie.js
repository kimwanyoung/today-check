import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = refreshToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 30);

  return cookies.set('RefreshToken', refreshToken, {
    expires: new Date(expireDate),
    sameSite: 'strict',
    path: '/',
  });
};

export const setAccessToken = accessToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 5);

  return cookies.set('AccessToken', accessToken, {
    expires: new Date(expireDate),
    sameSite: 'strict',
    path: '/',
  });
};

export const getAccessToken = () => {
  return cookies.get('AccessToken');
};

export const getRefreshToken = () => {
  return cookies.get('RefreshToken');
};

export const removeRefreshToken = () => {
  return cookies.remove('RefreshToken', { sameSite: 'strict', path: '/' });
};

export const removeAccessToken = () => {
  return cookies.remove('AccessToken', { sameSite: 'strict', path: '/' });
};
