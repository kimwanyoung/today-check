import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { getAccessKey } from '../../cookie/Cookie';
import { useEffect } from 'react';

const MissionDetail = () => {
  const userName = String(getAccessKey());
  const params = useParams();
  const paramsData = params.id;
  const location = useLocation();
  const postImg = location.state;
  const [missionDetail, setMissionDetail] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [imgBody, setImgBody] = useState();
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState(
    missionDetail?.mission?.startDate.slice(0, 10)
  );
  const [adminProfile, setAdminProfile] = useState();
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
        setAttendance(response.data[1].missionCertification);
        setParticipants(response.data[1].participants);
        const participantsList = missionDetail.participants?.map(
          props => props.name
        );
        const participantsInclude = participantsList?.includes(userName);
        setJoin(participantsInclude);

        axios
          .get(`/profile/profile/${response.data[0].mission.admin.id}`)
          .then(res => setAdminProfile(res.data.profileImages.body))
          .catch(err => console.log(err));

        axios
          .get(`/profile/profile/${response.data[1].participants.id}`)
          .then(res => {
            setImgBody(res.data.profileImages.body);
          })
          .catch(err => {
            console.log(err);
          });
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
  console.log();

  return (
    <MissionWrapper>
      {missionDetail && (
        <MissionHeader>
          <MissionImage>
            <img src={postImg} alt="postPic" />
          </MissionImage>
          <MissionInfBox>
            <MissionTitle>{missionDetail?.mission?.title}</MissionTitle>
            <MissionContent>{missionDetail?.mission?.content}</MissionContent>
            <MissionCreator>
              <img src={`data:image/;base64,${adminProfile}`} alt="admin pic" />
              <AdminName>
                <p>생성자</p>
                <h3>{missionDetail?.mission?.admin?.id}</h3>
              </AdminName>
            </MissionCreator>
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
      <ParticipantWrapper>
        <p>참여자</p>
        <Participant>
          <img src={`data:image/;base64,${imgBody}`} alt="participants pic" />
          <p>{participants.id}</p>
        </Participant>
      </ParticipantWrapper>
      <Attendance>
        <p>출석부</p>
        {attendance?.map((prop, idx) => (
          <CertificatedUser key={idx}>
            <p>{prop?.userName} 출석!</p>
            <p>{prop?.date}</p>
            <img
              src={`data:image/;base64,${prop?.image.body}`}
              alt="미션 인증 이미지"
            />
          </CertificatedUser>
        ))}
      </Attendance>
    </MissionWrapper>
  );
};

export default MissionDetail;

const MissionHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
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
  justify-content: space-around;
  flex-direction: column;
  width: 18rem;
  height: 16rem;
  margin-left: 0.8rem;
  background-color: #eff5f5;
  border-radius: 5px;
`;

const MissionTitle = styled.span`
  width: 100%;
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
  font-size: 1rem;
`;

const MissionDate = styled.div`
  color: black;
  margin: 0 auto;
  text-align: center;
  width: 100%;
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

const MissionCreator = styled.div`
  display: flex;
  width: 100%;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-left: 2rem;
  }
`;

const AdminName = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 500;

  h3 {
    font-size: 1.2rem;
    color: #eb6440;
  }
`;

const ParticipantWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;

  p {
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const Attendance = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 2rem;

  p {
    margin-top: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const CertificatedUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  width: 10rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.3rem;
  background-color: #eff5f5;

  p {
    font-size: 0.8rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
