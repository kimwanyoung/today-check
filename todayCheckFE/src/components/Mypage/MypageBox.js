import React from 'react';
import styled from 'styled-components';

const MypageBox = ({
  title,
  content,
  startDate,
  endDate,
  thumbnail,
  missionClick,
  setMissionClick,
}) => {
  const MypageBoxStartDate = String(startDate).slice(0, 10);
  const MypageBoxEndDate = String(endDate).slice(0, 10);

  return (
    <MypageBoxContainer onClick={() => setMissionClick(!missionClick)}>
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 1rem;
  margin-bottom: 1rem;
  width: 11.5rem;
  height: 10rem;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: #eff5f5;

  :hover {
    cursor: pointer;
    transform: translate(0, -10px);
    transition: 0.5s;
  }
`;

const MypageBoxThumbnail = styled.div`
  img {
    margin-left: 0.7rem;
    margin-top: 0.5rem;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const MypageBoxTitle = styled.div`
  color: black;
  height: 3rem;
  font-size: 1.3rem;
`;

const MypageBoxDate = styled.div`
  font-size: 0.8rem;
`;
