import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Logo from '../../components/Logo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SlLogin } from 'react-icons/sl';
import { SiNaver } from 'react-icons/si';
import { FaGoogle } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAccessToken, setRefreshToken } from '../../cookie/Cookie';

const CLIENT_ID =
  '33798723249-7235eh6dkueqvlb5982qulnrv11tlqdj.apps.googleusercontent.com';

// const CLIENT_PW = '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';

const Login = () => {
  const { naver } = window;
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignUpClick, setIsSignUpClick] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  });
  const navigate = useNavigate();
  const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/login/callback&scope=https://www.googleapis.com/auth/userinfo.email`;

  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  };

  const onClickBtn = setterFunc => {
    setterFunc(prev => !prev);
  };

  const handleChangeId = e => {
    setUserInfo({
      ...userInfo,
      id: e.target.value,
    });
  };

  const handleChangePw = e => {
    setUserInfo({
      ...userInfo,
      password: e.target.value,
    });
  };

  const validationPw = e => {
    if (e.target.value === userInfo.password) {
      setIsValid(prev => !prev);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      alert('회원가입 완료');
      axios
        .post('/register', userInfo)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      setIsLoginClick(prev => !prev);
      setIsSignUpClick(prev => !prev);
    } else {
      alert('비밀번호가 같지 않습니다.');
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    if (userInfo.id && userInfo.password) {
      axios
        .post('/login', userInfo)
        .then(response => {
          if (response.data.code === '-1') {
            return alert('아이디 비밀번호를 확인해주세요!');
          }
          setRefreshToken(response.data.refreshToken);
          setAccessToken(response.data.accessToken);
          navigate('/');
        })
        .catch(err => {
          return alert('아이디 비밀번호를 확인해주세요!');
        });
    } else {
      alert('아이디 및 비밀번호를 확인해주세요!');
    }
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'Va8Dlfp7L1f0k4UXZXaw',
      callbackUrl: 'http://localhost:3000/login/navercallback',
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: {
        type: 1,
        height: 20,
      }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <LoginWrapper>
      <LoginBox>
        <Logo />
        {isLoginClick && (
          <InputBox
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-input"
              label="Id"
              type="text"
              onChange={handleChangeId}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChangePw}
            />
            <LoginBtn
              variant="outlined"
              color="info"
              size="large"
              type="submit"
              onClick={handleLogin}
            >
              로그인
            </LoginBtn>
          </InputBox>
        )}
        {isSignUpClick && (
          <InputBox
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-input"
              label="Id"
              type="text"
              autoComplete="current-password"
              onChange={handleChangeId}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={handleChangePw}
            />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              onChange={validationPw}
            />
            <LoginBtn
              variant="outlined"
              color="info"
              size="large"
              type="submit"
              onClick={handleSubmit}
            >
              회원가입
            </LoginBtn>
          </InputBox>
        )}
        <BtnWrapper spacing={2} direction="column">
          {!isLoginClick && !isSignUpClick && (
            <>
              <Button
                variant="contained"
                size="large"
                onClick={() => onClickBtn(setIsLoginClick)}
              >
                <div>
                  <SlLogin />
                  로그인
                </div>
              </Button>
              <Button
                variant="contained"
                size="large"
                color="info"
                onClick={() => onClickBtn(setIsSignUpClick)}
              >
                <div>
                  <IoPersonAdd />
                  회원가입
                </div>
              </Button>

              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={oAuthHandler}
              >
                <div>
                  <FaGoogle />
                  <p>구글로 시작하기</p>
                </div>
              </Button>
              <Button variant="contained" size="large" color="success">
                <div id="naverIdLogin" />
                <SiNaver />
                <p>네이버로 시작하기</p>
              </Button>
            </>
          )}
        </BtnWrapper>
      </LoginBox>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
  height: 25rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border: 1px solid rgba(38, 82, 255, 0.8);
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const InputBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
`;

const BtnWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  #naverIdLogin {
    position: absolute;
    width: 90%;
  }
  Button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
    width: 90%;
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      width: 40%;
      margin-left: 1.5rem;
    }
    svg {
      margin-right: 1rem;
    }
  }
`;

const LoginBtn = styled(Button)`
  width: 16rem;
  height: 3rem;
`;
