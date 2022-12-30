import React from 'react';
import styled from 'styled-components';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const HomeBox = ({
  id,
  thumbnail,
  adminName,
  adminPicture,
  participants,
  postTitle,
  postContent,
}) => {
  const adminPic = require(`/Users/kwy/Desktop/today-check/todayCheckFE/src/images/${adminPicture}`);
  const handleErrorImg = e => {
    e.target.src = 'https://via.placeholder.com/150';
  };

  useEffect(() => {
    axios
      .get(thumbnail)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <HomeBoxContainer>
      {/* admin user 정보  */}
      <HomeBoxHead>
        {/* src={adminPicture} */}
        <img src={adminPic} alt="postPicture" onError={handleErrorImg} />
        <span>{adminName}</span>
      </HomeBoxHead>

      {/*  main picture */}
      <HomeBoxPicture>
        {/* src={postPicture} */}
        <img
          src="https://via.placeholder.com/150"
          alt="post"
          onError={handleErrorImg}
        />
      </HomeBoxPicture>

      {/* title, content */}
      <HomeBoxTopic>
        <HomeBoxTitle>{postTitle}</HomeBoxTitle>
        <HomeBoxContent>{postContent}</HomeBoxContent>
      </HomeBoxTopic>

      {/* 하단 참여수 및 참여하기 버튼 */}
      <HomeBoxBottom>
        <HomeBoxParticipants>
          <HiUserGroup className="HomeBoxUserIcon" />
          {participants} 참여중
        </HomeBoxParticipants>
        <Link to={`/missionDetail/${id}`}>
          <HomeBoxButton>참여하기</HomeBoxButton>
        </Link>
      </HomeBoxBottom>
    </HomeBoxContainer>
  );
};

export default HomeBox;

const HomeBoxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 23rem;
  height: 20rem;
  border-radius: 5px;
  background-color: white;
  margin-top: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const HomeBoxHead = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 3px 0;
  padding-left: 5px;
  width: 100%;
  height: 2rem;
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 5px;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
  }
`;

const HomeBoxPicture = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 170px;
  }
`;

const HomeBoxTopic = styled.div`
  width: 100%;
  height: 60px;
`;

const HomeBoxTitle = styled.div`
  margin-left: 1rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const HomeBoxContent = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const HomeBoxBottom = styled.div`
  display: flex;
  width: 100%;
  height: 33px;
  align-items: center;
  border-top: solid 2px #dbd9d9;
`;

const HomeBoxParticipants = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  color: #a5a5a5;
  font-size: 14px;

  .HomeBoxUserIcon {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 18px;
  }
`;

const HomeBoxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 34px;
  border-radius: 0 0 5px 0;
  background-color: #eb6440;
  color: white;
  &:active,
  &:hover {
    background-color: #eb6440;
  }
`;
