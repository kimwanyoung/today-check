import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { getAccessKey, getAccessToken } from '../../cookie/Cookie';
import MypageBox from '../../components/Mypage/MypageBox';
import TextField from '@mui/material/TextField';
import MypageModal from './Modal/MypageModal';

const UserData = {
  address: '춘천',
  id: 'yejin',
  password: '1234',
  phoneNumber: '010-0000-0000',
  userId: 'yejin',
};

const MypageData = [
  {
    id: 1,
    startDate: '2022-12-07T06:45:44.177Z',
    endDate: '2022-12-07T06:45:44.177Z',
    title: '코딩테스트 공부하실 분 구합니다.',
    content: '코딩테스트 매일 하나씩 풀 예정입니다. 함께 하실 분 모집합니다.',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-e2ZUrT6vhmG2nph1wWS3jpr1OdoYrfOTPQ&usqp=CAU',
  },
  {
    id: 1,
    startDate: '2022-12-07T06:45:44.177Z',
    endDate: '2022-12-07T06:45:44.177Z',
    title: '영어 스터디 모집합니다',
    content: '코딩테스트 매일 하나씩 풀 예정입니다. 함께 하실 분 모집합니다.',
    thumbnail: 'https://via.placeholder.com/350x200',
  },
  {
    id: 1,
    startDate: '2022-12-07T06:45:44.177Z',
    endDate: '2022-12-07T06:45:44.177Z',
    title: '코딩테스트 공부하실 분',
    content: '코딩테스트 매일 하나씩 풀 예정입니다. 함께 하실 분 모집합니다.',
    thumbnail: 'https://via.placeholder.com/350x200',
  },
];

const Mypage = () => {
  const [fixButtonClick, setFixButtonClick] = useState(false);
  const [missionData, setMissionData] = useState();
  const [missionClick, setMissionClick] = useState(false);
  console.log(fixButtonClick);
  const userId = String(getAccessKey());
  const accessToken = String(getAccessToken());
  console.log(userId);
  const [currnetId, setCurrentId] = useState(UserData.id);
  const [fixId, setFixId] = useState(UserData.id);
  const [password, setPassword] = useState(UserData.password);
  const [phoneNumber, setPhoneNumber] = useState(UserData.phoneNumber);
  const [address, setAddress] = useState(UserData.address);

  console.log(currnetId);
  // axios
  //   .get(`/profile/profile/${userId}`, {
  //     headers: { Authorization: `${accessToken}` },
  //   })
  //   .then(response => {
  //     console.log(response);
  //     setMissionData(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   }, []);

  return (
    <MainContainer>
      <UserWrapper>
        <UserAvater>
          <img src="https://via.placeholder.com/350x200" />
        </UserAvater>
        <UserInformations>
          <UserInformationFixButton
            checkClick={fixButtonClick}
            onClick={() => setFixButtonClick(!fixButtonClick)}
          >
            {fixButtonClick ? '완료' : '수정'}
          </UserInformationFixButton>
          {fixButtonClick ? (
            <>
              <UserBox>
                <span>현재아이디: </span>
                <TextField
                  id="standard-helperText"
                  defaultValue={UserData.id}
                  variant="standard"
                  onChange={e => setCurrentId(e.target.value)}
                />
              </UserBox>
              <UserBox>
                <span>변경된아이디: </span>
                <TextField
                  id="standard-helperText"
                  defaultValue={UserData.id}
                  variant="standard"
                  onChange={e => setFixId(e.target.value)}
                />
              </UserBox>
              <UserBox>
                <span>비밀번호: </span>
                <TextField
                  id="standard-helperText"
                  defaultValue={UserData.password}
                  variant="standard"
                  onChange={e => setPassword(e.target.value)}
                />
              </UserBox>
              <UserBox>
                <span>전화번호: </span>
                <TextField
                  id="standard-helperText"
                  defaultValue={UserData.phoneNumber}
                  variant="standard"
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </UserBox>
              <UserBox>
                <span>주소: </span>
                <TextField
                  id="standard-helperText"
                  defaultValue={UserData.address}
                  variant="standard"
                  onChange={e => setAddress(e.target.value)}
                />
              </UserBox>
            </>
          ) : (
            <>
              <UserGreetings>안녕하세요</UserGreetings>
              <UserName>
                <span>{UserData.id}</span>님
              </UserName>
              <UserSpan>
                <span>'오늘의 미션도 응원합니다'</span>
              </UserSpan>
            </>
          )}
        </UserInformations>
      </UserWrapper>
      {missionClick && (
        <MypageModal
          setMissionClick={setMissionClick}
          missionClick={missionClick}
        />
      )}
      <JoinMissionWrapper>
        <JoinHeading>참여한 미션</JoinHeading>
        <JoinMissionlistWrapper>
          {MypageData.map((data, index) => (
            <MypageBox
              key={index}
              id={data.id}
              title={data.title}
              content={data.content}
              startDate={data.startDate}
              endDate={data.endDate}
              thumbnail={data.thumbnail}
              setMissionClick={setMissionClick}
              missionClick={missionClick}
            />
          ))}
        </JoinMissionlistWrapper>
      </JoinMissionWrapper>
      <CreateMissionWrapper>
        <CreateHeading>생성한 미션</CreateHeading>
        <CreateMissionlistWrapper>
          {MypageData.map((data, index) => (
            <MypageBox
              key={index}
              id={data.id}
              title={data.title}
              content={data.content}
              startDate={data.startDate}
              endDate={data.endDate}
              thumbnail={data.thumbnail}
              setMissionClick={setMissionClick}
              missionClick={missionClick}
            />
          ))}
        </CreateMissionlistWrapper>
      </CreateMissionWrapper>
    </MainContainer>
  );
};

export default Mypage;

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eeeeff;
  overflow: scroll;
`;

const UserWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  position: relative;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 45%;
  border-radius: 10px;
  background-color: white;
`;

const UserAvater = styled.div`
  position: absolute;
  left: 20px;
  img {
    width: 230px;
    height: 230px;
    border-radius: 100%;
  }
`;

const UserInformations = styled.div`
  position: absolute;
  right: 0px;
  width: 400px;
  height: 300px;
`;

const UserInformationFixButton = styled.div`
  background-color: #9292ff;
  box-shadow: 0px 0px 2px 2px rgb(120, 120, 255);
  color: white;
  margin-top: 10px;
  position: absolute;
  right: 10px;
  width: 45px;
  text-align: center;
  border-radius: 15px;
  padding: 6px 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.5s;

  :hover {
    background-color: #6e6eff;
  }
`;

// 수정 버튼 눌렀을 때
const UserBox = styled.div`
  font-size: 1.3rem;
  padding: 13px 0;
  display: flex;
  justify-content: start;
  align-items: center;

  span {
    margin-right: 10px;
  }
`;

// 수정 버튼 누르기 전
const UserGreetings = styled.div`
  margin-top: 70px;
  font-size: 2.9rem;
`;

const UserName = styled.div`
  margin-left: 200px;
  font-size: 2.5rem;

  span {
    font-size: 3.4rem;
  }
`;

const UserSpan = styled.div`
  margin-top: 36px;
  margin-left: 34px;
  font-size: 1.6rem;
`;

const JoinMissionWrapper = styled.div`
  margin-top: 1rem;
  height: auto;
`;

const JoinHeading = styled.h1`
  padding-left: 2.5rem;
  font-size: 1.3rem;
`;

const JoinMissionlistWrapper = styled.div`
  padding-left: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-flow: row wrap;
  flex-grow: 2;
`;

const CreateMissionWrapper = styled.div`
  margin-top: 1rem;
  height: auto;
`;

const CreateHeading = styled.h1`
  padding-left: 2.5rem;
  font-size: 1.3rem;
`;

const CreateMissionlistWrapper = styled.div`
  padding-left: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-flow: row wrap;
  flex-grow: 2;
`;
