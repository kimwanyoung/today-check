import styled from 'styled-components';
import Navigation from '../components/Navigation';

const Posting = () => {
  return (
    <MainContainer>
      <RightSection></RightSection>
    </MainContainer>
  );
};

export default Posting;

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const RightSection = styled.div`
  position: fixed;
  top: 0;
  left: 230px;
  width: 100%;
  height: 100%;
  background-color: #eeeeff;
`;
