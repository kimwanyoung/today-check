import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getAccessKey } from '../../cookie/Cookie';
import { useEffect } from 'react';

const MissionDetail = () => {
  const [missionDetail, setMissionDetail] = useState([]);
  const userName = String(getAccessKey());
  const params = useParams();
  const paramsData = params.id;
  // const startDate = missionDetail?.mission?.startDate.slice(0, 10);
  // const endDate = missionDetail?.mission?.endDate.slice(0, 10);
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
        <>
          <MissionHeader>
            <MissionImage>
              <img src={missionDetail?.postPicture} alt="postPic" />
            </MissionImage>
            <MissionInfBox>
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

          <ParticipantWrapper>
            {missionDetail.participants?.map(props => (
              <ParticipantBox key={props.id}>
                <ParticipantInfo>
                  <ParticipantImage>
                    <img src={props.avater} />
                  </ParticipantImage>
                  <ParticipantName>{props.name}</ParticipantName>
                </ParticipantInfo>
                <Picture>
                  <img src={props.image} />
                </Picture>
              </ParticipantBox>
            ))}
          </ParticipantWrapper>
        </>
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
  img {
    width: 350px;
    height: 230px;
  }
`;

const MissionInfBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
  text-align: center;
  color: black;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  font-weight: bold;
`;

const MissionContent = styled.span`
  margin: 0 auto;
  color: black;
  margin-top: 0.5rem;
  text-align: center;
  width: 250px;
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

const ParticipantWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  flex-flow: row wrap;
  flex-grow: 2;
  width: 100%;
  padding: 0 2rem;
`;

const ParticipantBox = styled.div`
  margin-top: 3rem;
  display: block;
  width: 230px;
  height: 300px;
  border-top: 5px solid gray;
  padding-top: 1rem;
`;

const ParticipantInfo = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ParticipantImage = styled.div`
  display: inline;
  margin-left: 2px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
`;

const ParticipantName = styled.span`
  margin-left: 5px;
`;

const Picture = styled.div`
  margin-top: 2rem;
  img {
    width: 100%;
    height: 200px;
  }
`;
