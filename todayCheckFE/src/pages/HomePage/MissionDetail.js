import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../../cookie/Cookie';
import { FaCrown } from 'react-icons/fa';
import { getAccessKey } from '../../cookie/Cookie';
import axios from 'axios';
import styled from 'styled-components';

const MissionDetail = () => {
  const params = useParams();
  const location = useLocation();
  const [participants, setParticipants] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [participantNameArr, setParticipantNameArr] = useState([]);
  const [missionCertification, setMissionCertification] = useState([]);
  const missionThumbnail = location?.state?.thumbnail;
  const adminProfile = location.state.adminPicture;
  const startDate = location.state.startDate.slice(0, 10);
  const endDate = location.state.endDate.slice(0, 10);

  useEffect(() => {
    axios
      .get(`/mission/${params.id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(res => {
        const parArr = res.data.map(props => {
          return props.participants.id;
        });
        setParticipants(res.data);
        setParticipantNameArr(parArr);
        setMissionCertification(res.data[0].missionCertification);
        console.log(res.data[0].missionCertification);
      })
      .catch(err => console.log(err));

    axios
      .get(`/profile/profile/${getAccessKey()}`)
      .then(res => setCurrentUser(res.data.id))
      .catch(err => console.log(err));
  }, []);

  const missionJoin = () => {
    axios
      .post(`/participant/${params.id}`, {
        id: params.id,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const missionOut = () => {
    axios
      .delete(`/participant/${params.id}`, {
        id: params.id,
      })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <MissionDetailWrapper>
      <DetailTop>
        <CardWrapper>
          <MissionImg src={missionThumbnail} />
          <MissionCard>
            <MissionTitle>{location.state.postTitle}</MissionTitle>
            <AdminBox>
              <AdminInfo>
                <img
                  src={`data:image/;base64,${adminProfile?.body}`}
                  alt="post admin"
                />
                <Crown />
                <AdminName>{location.state.adminName}</AdminName>
              </AdminInfo>
              <MissionDate>
                {startDate} ~ {endDate}
              </MissionDate>
            </AdminBox>
            <JoinMission>
              {participantNameArr?.includes(currentUser) ? (
                <JoinBtn onClick={missionOut}>미션탈퇴</JoinBtn>
              ) : (
                <JoinBtn onClick={missionJoin}>참여하기</JoinBtn>
              )}
            </JoinMission>
          </MissionCard>
        </CardWrapper>
      </DetailTop>
      <DetailBottom>
        <ParticipantInfo>
          <DetailTitle>참여자</DetailTitle>
          {participants?.map(props => (
            <ParticipantProfile key={props.keys}>
              <img
                src={`data:image/;base64,${props.profile.body}`}
                alt="user"
              />
              <AdminName>{props.participants.id}</AdminName>
            </ParticipantProfile>
          ))}
        </ParticipantInfo>
        <Attendance>
          <DetailTitle>출석 인증</DetailTitle>
          {missionCertification?.map(props => (
            <AttendanceMission key={props.keys}>
              <img
                src={`data:image/;base64,${props.image.body}`}
                alt="출석 인증 이미지"
              />
              <AttendanceInfo>
                <p>인증자 : {props.userName}</p>
                <p>인증날짜 : {props.date}</p>
              </AttendanceInfo>
            </AttendanceMission>
          ))}
        </Attendance>
      </DetailBottom>
    </MissionDetailWrapper>
  );
};
export default MissionDetail;

const MissionDetailWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const DetailTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 40vh;
  background-color: #eb6440;
  padding-left: 15rem;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 15rem;
`;

const MissionImg = styled.img`
  width: 50%;
  height: 100%;
`;

const MissionCard = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  padding-bottom: 3rem;
  width: 50%;
  height: 100%;
  background-color: #eff5f5;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const MissionTitle = styled.h3`
  margin-left: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const JoinMission = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  width: 100%;
  height: 3rem;
  border: 1px solid lightgray;
`;

const JoinBtn = styled.button`
  width: 6rem;
  height: 100%;
  background-color: #eb6440;
  color: white;
  font-size: 1rem;
  font-weight: 600;
`;

const AdminBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 2rem;
`;

const Crown = styled(FaCrown)`
  color: #eb6440;
  margin-left: 0.5rem;
`;

const MissionDate = styled.p`
  margin-top: 1rem;
`;

const DetailBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding-left: 15rem;
`;

const ParticipantInfo = styled.div`
  width: 40rem;
`;

const ParticipantProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 100%;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const DetailTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 1rem 0 0 0;
  background-color: rgba(235, 100, 64, 0.6);
  color: white;
`;

const Attendance = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 40rem;
`;

const AttendanceMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 12rem;
  height: 13rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 100%;
    height: 70%;
  }
`;

const AttendanceInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 3rem;

  p {
    font-size: 0.8rem;
    margin-left: 0.3rem;
  }
`;
