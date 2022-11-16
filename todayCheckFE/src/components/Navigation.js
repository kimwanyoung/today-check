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
  console.log(location.pathname);
  return (
    <HeaderContainer>
      {/* 로고 */}
      <LogoWrapper>
        <TodayCheckLogo src={logo} />
      </LogoWrapper>

      <NavWrapper>
        {/* 홈 버튼 */}
        <Link to="/home">
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
        <h1>LogIn</h1>
      </LoginMove>
    </HeaderContainer>
  );
};

export default Navigation;

const LoginMove = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 16vw;
  height: 100vh;
  flex-direction: column;
  border-right: 4.5px solid #f0f0f0;
  background-color: white;
`;

const TodayCheckLogo = styled.img`
  width: 139px;
  height: 24px;
  margin: 25px 15px;
`;

const LogoWrapper = styled.div`
  display: block;
`;

const NavWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 225px;
  height: 100vh;
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
  background-color: ${props => (props.pageName === '/home' ? '#BFBFFF' : '')};
  color: ${props => (props.pageName === '/home' ? '#5151FF' : '#828282')};
  opacity: ${props => (props.pageName === '/home' ? '0.8' : '')};
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
  }
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
