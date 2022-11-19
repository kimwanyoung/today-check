import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/todayCheckLogo.png';

// icons
import { BiHomeAlt } from 'react-icons/bi';
import { MdCreate } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  return (
    <HeaderContainer>
      {/* 로고 */}
      <LogoWrapper>
        <TodayCheckLogo src={logo} />
      </LogoWrapper>

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
      <LoginMove to="/login">
        <Login>LogIn</Login>
      </LoginMove>
    </HeaderContainer>
  );
};

export default Navigation;

const HeaderContainer = styled.div`
  width: 240px;
  height: 100vh;
  float: left;
  border-right: 4.5px solid #f0f0f0;
  background-color: white;
`;

const LogoWrapper = styled.div`
  display: block;
`;

const TodayCheckLogo = styled.img`
  width: 139px;
  height: 24px;
  margin: 25px 15px;
`;

const NavWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 225px;
`;

const HomeNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 200px;
  height: 43px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 900;
  background-color: ${props => (props.pageName === '/' ? '#BFBFFF' : '')};
  color: ${props => (props.pageName === '/' ? '#5151FF' : '#828282')};
  opacity: ${props => (props.pageName === '/' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Home {
    font-size: 24px;
    margin-left: 10px;
    margin-right: 15px;
  }

  &{HomeNavButton}:hover {
    background-color: #BFBFFF;
    color: #5151FF;
    opacity: 0.8;
  };
`;

const PostingNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 200px;
  height: 43px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 900;
  background-color: ${props =>
    props.pageName === '/posting' ? '#BFBFFF' : ''};
  color: ${props => (props.pageName === '/posting' ? '#5151FF' : '#828282')};
  opacity: ${props => (props.pageName === '/posting' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Posting {
    font-size: 24px;
    margin-left: 10px;
    margin-right: 16px;
  }

  &{PostingNavButton}:hover {
    background-color: #BFBFFF;
    color: #5151FF;
    opacity: 0.8;
  }
`;

const MypageNavButton = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 200px;
  height: 43px;
  margin-left: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 900;
  background-color: ${props => (props.pageName === '/mypage' ? '#BFBFFF' : '')};
  color: ${props => (props.pageName === '/mypage' ? '#5151FF' : '#828282')};
  opacity: ${props => (props.pageName === '/mypage' ? '0.8' : '')};
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  .Mypage {
    font-size: 19px;
    margin-left: 12px;
    margin-right: 17px;
  }

  &{MypageNavButton}:hover {
    background-color: #BFBFFF;
    color: #5151FF;
    opacity: 0.8;
    font-family: 'HallymGothic-Regular';
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
  background-color: #bfbfff;
  color: #5151ff;
  opacity: 0.8;
  font-family: 'HallymGothic-Regular';
  transition-property: background-color;
  transition-duration: 0.5s;

  &:hover {
    background-color: #6565ff;
    color: white;
  }
`;

const LoginMove = styled(Link)`
  display: block;
  position: absolute;
  bottom: 5px;
  left: 4px;
  text-decoration: none;
  color: #5151ff;
`;
