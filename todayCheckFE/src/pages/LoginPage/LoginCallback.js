import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  setAccessToken,
  setRefreshToken,
  setAccessKey,
} from '../../cookie/Cookie';
import axios from 'axios';

const LoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const accessToken = location.hash.split('=')[1].split('&')[0];
      axios
        .get(
          'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' +
            accessToken,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(data => {
          console.log(data);
          axios
            .post(
              `/googlelogin?code=${
                data.config.headers.authorization.split(' ')[1]
              }`
            )
            .then(response => {
              console.log(response);
              setAccessToken(response.data.accessToken);
              setRefreshToken(response.data.accessToken);
              setAccessKey(response.data.key);
              navigate('/');
            })
            .catch(err => console.log(err));
        })
        .catch(e => console.log('oAuth token expired'));
    }
  }, []);
};

export default LoginCallback;
