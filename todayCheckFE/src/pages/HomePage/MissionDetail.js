import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccessToken } from '../../cookie/Cookie';
import axios from 'axios';
import styled from 'styled-components';

const MissionDetail = () => {
  const params = useParams();
  const location = useLocation();
  const missionThumbnail = location?.state?.thumbnail;
  const adminProfile = location.state.adminPicture;
  console.log(location.state);

  useEffect(() => {
    axios
      .get(`/mission/${params.id}`, {
        headers: {
          Authorization: getAccessToken(),
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });

  return (
    <MissionDetailWrapper>
      <DetailTop>
        <CardWrapper>
          <MissionImg src={missionThumbnail} />
          <MissionCard>
            <MissionTitle>{location.state.postTitle}</MissionTitle>
            <AdminInfo>
              <img
                src={`data:image/;base64,${adminProfile?.body}`}
                alt="post admin"
              />
              <AdminName>{location.state.adminName}</AdminName>
            </AdminInfo>
          </MissionCard>
        </CardWrapper>
      </DetailTop>
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
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
  margin-left: 1rem;
`;

const MissionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
`;
