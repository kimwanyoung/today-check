import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setAccessToken, setRefreshToken } from '../../cookie/Cookie';
import axios from 'axios';

const NaverLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const token = location.hash.split('=')[1].split('&')[0];
      console.log(token);
      axios
        .post(`/naverlogin?code=${token}`)
        .then(response => {
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.accessToken);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
          alert('로그인 실패!');
        });
    } else {
      return;
    }
  }, []);
};

export default NaverLoginCallback;
