import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { getAccessKey } from '../../cookie/Cookie';
import { useEffect } from 'react';

const MissionDetail = () => {
  const [missionDetail, setMissionDetail] = useState([]);
  const userName = String(getAccessKey());
  const params = useParams();
  const paramsData = params.id;
  const location = useLocation();
  const postImg = location.state;
  const [startDate, setStartDate] = useState(
    missionDetail?.mission?.startDate.slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    missionDetail?.mission?.endDate.slice(0, 10)
  );
  const [join, setJoin] = useState();

  useEffect(() => {
    axios
      .get(`/mission/${paramsData}`, { id: paramsData })
      .then(response => {
        console.log(response);
        setMissionDetail(response.data[0]);
        setStartDate(response.data[0].mission.startDate.slice(0, 10));
        setEndDate(response.data[0].mission.endDate.slice(0, 10));
        const participantsList = missionDetail.participants?.map(
          props => props.name
        );
        const participantsInclude = participantsList?.includes(userName);
        setJoin(participantsInclude);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleJoin = async e => {
    e.preventDefault();
    try {
      await axios
        .post(`/participant/${paramsData}`, {
          id: paramsData,
        })
        .then(response => {
          setJoin(!join);
        })
        .catch(error => {
          console.log(error);
          alert('로그인 후 이용해주세요');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios
        .delete(`/participant/${paramsData}`, {
          id: paramsData,
        })
        .then(response => {
          setJoin(!join);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MissionWrapper>
      {missionDetail && (
        <MissionHeader>
          <MissionImage>
            <img src={postImg} alt="postPic" />
          </MissionImage>
          <MissionInfBox>
            <Participants />
            <MissionTitle>{missionDetail?.mission?.title}</MissionTitle>
            <MissionContent>{missionDetail?.mission?.content}</MissionContent>
            <MissionDate>
              기간: {startDate} ~ {endDate}
            </MissionDate>
            {join ? (
              <CompletionButton onClick={handleDelete}>
                참여취소
              </CompletionButton>
            ) : (
              <MissionButton onClick={handleJoin}>참여하기</MissionButton>
            )}
          </MissionInfBox>
        </MissionHeader>
      )}
    </MissionWrapper>
  );
};

export default MissionDetail;

const MissionHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 45%;
  border-radius: 10px;
  background-color: #eb6440;
`;

const MissionWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  overflow: scroll;
  padding-left: 15rem;
`;

const MissionImage = styled.div`
  margin-top: 0.2rem;
  img {
    width: 18rem;
    height: 16rem;
    border-radius: 5px;
  }
`;

const MissionInfBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 18rem;
  height: 16rem;
  margin-left: 0.8rem;
  background-color: #eff5f5;
  border-radius: 5px;
`;

const MissionTitle = styled.span`
  width: 100%;
  height: 48px;
  overflow: hidden;
  color: black;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-left: 2rem;
  font-weight: bold;
`;

const MissionContent = styled.span`
  margin-left: 2rem;
  color: black;
  margin-top: 0.5rem;
  width: 100%;
  height: 6rem;
  font-size: 1rem;
`;

const MissionDate = styled.div`
  color: black;
  margin: 0 auto;
  text-align: center;
  width: 250px;
`;

const MissionButton = styled.button`
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 250px;
  font-size: 1rem;
  height: 2.2rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  color: white;
  background-color: #497174;
`;

const CompletionButton = styled.button`
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 250px;
  font-size: 1rem;
  height: 2.2rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  background-color: #497174;
`;
