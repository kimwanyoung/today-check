import styled from 'styled-components';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <NavWrapper>
      <Logo />
      <LoginWrapper>
        <LoginMove to="/login">
          <h1>LogIn</h1>
        </LoginMove>
      </LoginWrapper>
    </NavWrapper>
  );
};

export default Navigation;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 10vh;
  background-color: white;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const LoginWrapper = styled.div`
  margin-left: 30rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  :hover {
    font-weight: 900;
  }
`;

const LoginMove = styled(Link)`
  text-decoration: none;
  color: black;
`;
