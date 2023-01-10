import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/TodayCheck.png';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { getAccessToken, removeAccessToken } from '../cookie/Cookie';

// icons
import { BiHomeAlt } from 'react-icons/bi';
import { MdCreate } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [myArrow, setMyArrow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (getAccessToken()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  const handleLogout = () => {
    removeAccessToken();
  };

  const handleMyPageArrowClick = () => {
    setMyArrow(true);
  };

  return (
    <HeaderContainer>
      {/* 로고 */}
      <div>
        <TodayCheckLogo src={logo} />
      </div>

      <NavWrapper>
        {/* 홈 버튼 */}
        <Link to="/">
          <HomeNavButton pageName={location.pathname}>
            <BiHomeAlt className="Home" /> Home
          </HomeNavButton>
        </Link>

        {/* 미션 버튼 */}
        <Link to="/posting">
          <PostingNavButton pageName={location.pathname}>
            <MdCreate className="Posting" /> Posting
          </PostingNavButton>
        </Link>

        {/* 마이페이지 버튼 */}
        <Link to="/mypage">
          <MypageNavButton pageName={location.pathname}>
            <FaUser className="Mypage" />
            Mypage
          </MypageNavButton>
        </Link>
      </NavWrapper>
      {isLogin ? (
        <LoginMove onClick={handleLogout}>
          <Login>Log Out</Login>
        </LoginMove>
      ) : (
        <LoginMove to="/login">
          <Login>Log In</Login>
        </LoginMove>
      )}
    </HeaderContainer>
  );
};

export default Navigation;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 15rem;
  height: 100vh;
  background-color: #eff5f5;
  padding-top: 2rem;
  box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.2);
`;

const TodayCheckLogo = styled.img`
  width: 100%;
  height: 100%;
`;

const NavWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 10rem;
`;

const HomeNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 13rem;
  height: 3rem;
  margin-left: 1rem;
  margin-top: 2rem;
  margin-bottom: 1.3rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 900;
  background-color: ${props => (props.pageName === '/' ? '#497174' : '')};
  color: ${props => (props.pageName === '/' ? '#FEFEFE' : '#828282')};
  opacity: ${props => (props.pageName === '/' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Home {
    font-size: 24px;
    margin-left: 10px;
    margin-right: 15px;
  }
`;

const PostingNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 13rem;
  height: 3rem;
  margin-left: 1rem;
  margin-bottom: 1.3rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 900;
  background-color: ${props =>
    props.pageName === '/posting' ? '#497174' : ''};
  color: ${props => (props.pageName === '/posting' ? '#FEFEFE' : '#828282')};
  opacity: ${props => (props.pageName === '/posting' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Posting {
    font-size: 24px;
    margin-left: 10px;
    margin-right: 16px;
  }
`;

const MypageNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 13rem;
  height: 3rem;
  margin-left: 1rem;
  margin-bottom: 1.3rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 900;
  background-color: ${props => (props.pageName === '/mypage' ? '#497174' : '')};
  color: ${props => (props.pageName === '/mypage' ? '#FEFEFE' : '#828282')};
  opacity: ${props => (props.pageName === '/mypage' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Mypage {
    font-size: 19px;
    margin-left: 12px;
    margin-right: 17px;
  }
`;

const Login = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 43px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 900;
  background-color: #eb6440;
  color: white;
  opacity: 0.8;
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  :hover {
    background-color: #eb6440;
    opacity: 1;
    color: white;
  }
`;

const LoginMove = styled(Link)`
  display: block;
  position: absolute;
  bottom: 5px;
  left: 4px;
  text-decoration: none;
  color: #eb6440;
`;
