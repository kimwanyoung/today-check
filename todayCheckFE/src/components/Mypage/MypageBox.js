import React from 'react';
import styled from 'styled-components';

const MypageBox = ({
  title,
  content,
  startDate,
  id,
  endDate,
  thumbnail,
  missionClick,
  setMissionClick,
}) => {
  const MypageBoxStartDate = String(startDate).slice(0, 10);
  const MypageBoxEndDate = String(endDate).slice(0, 10);

  const handleErrorImg = e => {
    e.target.src = 'https://via.placeholder.com/150';
  };
  console.log(id);

  return (
    <MypageBoxContainer onClick={() => setMissionClick(!missionClick)}>
      <MyPageImg src={`/mission/thumbnail/${id}`} onError={handleErrorImg} />
      <MypageBoxTitle>
        <span>{title}</span>
      </MypageBoxTitle>
      <MypageBoxDate>
        {MypageBoxStartDate} ~ {MypageBoxEndDate}
      </MypageBoxDate>
    </MypageBoxContainer>
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
