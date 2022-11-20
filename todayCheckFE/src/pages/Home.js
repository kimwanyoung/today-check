import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

//components
import HomeBox from '../components/home/homeBox';

const Home = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios
      .get('/mission')
      .then(response => {
        setMissions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <RightContainer>
      <HomeBoxContainer>
        {missions.map(data => (
          <HomeBox
            key={data.id}
            postPicture={data.postPicture}
            adminName={data.admin.name}
            adminPicture={data.admin.avater}
            participants={data.participants?.length}
            postTitle={data.postTitle}
            postContent={data.postContent}
          />
        ))}
      </HomeBoxContainer>
    </RightContainer>
  );
};

export default Home;

const RightContainer = styled.div`
  float: right;
  height: 100vh;
  background-color: #eeeeff;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 1rem;
`;

const HomeBoxContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  flex-flow: row wrap;
  flex-grow: 2;
`;
