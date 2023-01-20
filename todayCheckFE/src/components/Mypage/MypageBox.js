import React, { useState } from 'react';
import styled from 'styled-components';
import MypageModal from '../../pages/Mypage/Modal/MypageModal';

const MypageBox = ({ title, startDate, id, endDate }) => {
  const MypageBoxStartDate = String(startDate).slice(0, 10);
  const MypageBoxEndDate = String(endDate).slice(0, 10);
  const [isClicked, setIsClicked] = useState(false);

  const handleErrorImg = e => {
    e.target.src = 'https://via.placeholder.com/150';
  };
  return (
    <>
      <MypageBoxContainer onClick={() => setIsClicked(prev => !prev)}>
        <MyPageImg src={`/mission/thumbnail/${id}`} onError={handleErrorImg} />
        <MypageBoxTitle>
          <span>{title}</span>
        </MypageBoxTitle>
        <MypageBoxDate>
          {MypageBoxStartDate} ~ {MypageBoxEndDate}
        </MypageBoxDate>
      </MypageBoxContainer>
      {isClicked && (
        <MypageModal
          missionClick={isClicked}
          setMissionClick={setIsClicked}
          postId={id}
        />
      )}
    </>
  );
};

export default MypageBox;

const MypageBoxContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-left: 1rem;
  margin-bottom: 1rem;
  width: 11.5rem;
  height: 10rem;
  border-radius: 0.5rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #eff5f5;

  :hover {
    cursor: pointer;
    transform: translate(0, -10px);
    transition: 0.5s;
  }
`;

const MyPageImg = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const MypageBoxTitle = styled.div`
  color: black;
  height: 3rem;
  margin-left: 1rem;
  font-size: 1rem;
`;

const MypageBoxDate = styled.div`
  font-size: 0.8rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;
