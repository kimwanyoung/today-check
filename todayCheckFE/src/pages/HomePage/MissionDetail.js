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
          <MissionCard />
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
  width: 50%;
  height: 100%;
  background-color: #eff5f5;
`;
