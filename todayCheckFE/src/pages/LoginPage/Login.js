import styled from 'styled-components';
import { useState } from 'react';
import Logo from '../../components/Logo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { SlLogin } from 'react-icons/sl';
import { IoPersonAdd } from 'react-icons/io5';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [isLoginClick, setIsLoginClick] = useState(false);
  const [isSignUpClick, setIsSignUpClick] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userInfo, setUserInfo] = useState({
    Id: '',
    Pw: '',
  });
  const navigate = useNavigate();

  const onClickBtn = setterFunc => {
    setterFunc(prev => !prev);
  };

  const handleChangeId = e => {
    setUserInfo({
      ...userInfo,
      Id: e.target.value,
    });
  };

  const handleChangePw = e => {
    setUserInfo({
      ...userInfo,
      Pw: e.target.value,
    });
  };

  const validationPw = e => {
    if (e.target.value === userInfo.Pw) {
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
        .catch(function (error) {
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
    if (userInfo.Id && userInfo.Pw) {
      axios
        .post('/login', userInfo)
        .then(res => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        })
        .catch(err => {
          return err;
        });
      navigate('/');
    } else {
      alert('아이디 및 비밀번호를 확인해주세요!');
    }
  };

  axios
    .get('../../../public/mock/test.js')
    .then(res => console.log(res))
    .catch(err => console.log(err));

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

              <Button variant="contained" size="large" color="error">
                <div>
                  <FcGoogle />
                  구글로 시작하기
                </div>
              </Button>
              <Button variant="contained" size="large" color="success">
                <div>
                  <SiNaver />
                  <p>네이버로 시작하기</p>
                </div>
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
  Button {
    display: flex;
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
