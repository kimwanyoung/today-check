import styled from 'styled-components';
import LogoImg from '../icon/logo.png';

const Logo = () => {
  return (
    <LogoWrapper>
      <img src={LogoImg} alt="" />
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;

  img {
    width: 13rem;
    height: 4rem;
  }
`;
