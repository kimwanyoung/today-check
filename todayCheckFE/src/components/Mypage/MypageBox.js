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
      <MypageBoxThumbnail>
        <img src={thumbnail} />
      </MypageBoxThumbnail>
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
  margin-left: 1rem;
  margin-bottom: 1rem;
  width: 13rem;
  height: 10rem;
  background-color: #9292ff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

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
  color: white;
  width: 90%;
  height: 60%;
  position: absolute;
  top: 34px;
  right: 7px;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 1.2rem;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const MypageBoxDate = styled.div`
  position: absolute;
  bottom: 3px;
  right: 7px;
  font-size: 0.8rem;
`;
