import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HomeBox from '../../components/home/homeBox';

const Home = () => {
  const [missions, setMissions] = useState();

  useEffect(() => {
    axios
      .get('/mission')
      .then(response => {
        console.log(response);
        setMissions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleTestMission = () => {};

  return (
    <RightContainer>
      {missions?.map(data => (
        <HomeBox
          key={data?.id}
          id={data?.id}
          postPicture={data?.postPicture}
          adminName={data?.admin?.name}
          adminPicture={data?.admin?.avater}
          participants={data?.participants?.length}
          postTitle={data?.postTitle}
          postContent={data?.postContent}
        />
      ))}
    </RightContainer>
  );
};

export default Home;

const RightContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  padding-left: 15rem;
  background-color: #efefef;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 1rem;
`;

const HomeBoxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
