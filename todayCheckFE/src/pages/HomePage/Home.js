import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HomeBox from '../../components/home/homeBox';

const Home = () => {
  const [missions, setMissions] = useState([]);
  const iconv = require('iconv-lite');

  useEffect(() => {
    axios({
      url: '/mission',
      method: 'get',
      // responseType: 'arraybuffer',
    })
      .then(response => {
        // const decoded = iconv.decode(response, 'EUC-KR');
        // console.log(decoded);
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
            id={data.id}
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
  height: 100vh;
  width: 100vw;
  background-color: #eeeeff;
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
