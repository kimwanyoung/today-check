import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  getAccessKey,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setRefreshToken,
} from '../../cookie/Cookie';
import MypageBox from '../../components/Mypage/MypageBox';
import TextField from '@mui/material/TextField';
import MypageModal from './Modal/MypageModal';
import userImage from '../../images/userImage.png';
import { BiSave } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';

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
  const [joinMission, setJoinMission] = useState([]);
  const [createMission, setCreateMissionData] = useState([]);
  const [missionClick, setMissionClick] = useState(false);
  const userId = String(getAccessKey());
  const accessToken = String(getAccessToken());
  console.log(accessToken);
  const [currnetId, setCurrentId] = useState(missionData?.id);
  const [fixId, setFixId] = useState(missionData?.id);
  const [password, setPassword] = useState(missionData?.password);
  const [phoneNumber, setPhoneNumber] = useState(missionData?.phoneNumber);
  const [address, setAddress] = useState(missionData?.address);
  const [imgPriviewFile, setImgPriviewFile] = useState();
  const [imgFile, setImgFile] = useState(missionData?.profileImages?.body);
  const [image, setImage] = useState();
  const imgRef = useRef();
  const location = useLocation();
  console.log(location.state);

  console.log(currnetId);
  console.log(fixId);
  console.log(password);
  console.log(phoneNumber);
  console.log(address);
  console.log(imgFile);
  console.log(missionData?.profileImages);

  useEffect(() => {
    axios
      .get(`/profile/profile/${userId}`, {
        headers: { Authorization: `${accessToken}` },
      })
      .then(response => {
        console.log(response);
        setMissionData(response.data);
        setJoinMission(response.data.joinMission);
        setCreateMissionData(response.data.createMission);
        setMissionData(response.data);
        setCurrentId(response.data.id);
        setFixId(response.data.id);
        setPassword(response.data.password);
        setPhoneNumber(response.data.phoneNumber);
        setAddress(response.data.address);
        setImgFile(response.data.profileImages.body);
        console.log(currnetId);
        console.log(fixId);
        console.log(password);
        console.log(phoneNumber);
        console.log(address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const submitButton = () => {
    const userInfo = new FormData();

    const userData = {
      userId: currnetId,
      id: fixId,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
    };

    const blob = new Blob([JSON.stringify(userData)], {
      type: 'application/json',
    });
    userInfo.append('image', image);
    console.log(image);
    userInfo.append('request', blob);

    // axios
    //   .patch(`/profile/profile/${userId}`, userInfo, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: getAccessToken(),
    //     },
    //   })
    //   .then(res => {
    //     console.log(res.data.code);
    //     console.log(res.data);
    //     alert('프로필 사진이 변경되었습니다');
    //     if (res.data.code === '1' && currnetId && password) {
    //       removeAccessToken();
    //       removeRefreshToken();
    //       axios
    //         .post('/login', { id: currnetId, password: password })
    //         .then(response => {
    //           if (response.data.code === '-1') {
    //             console.log(response);
    //             return alert('로그인 실패');
    //           }
    //           setRefreshToken(response.data.refreshToken);
    //           setAccessToken(response.data.accessToken);
    //           console.log(response.data.refreshToken);
    //           console.log(response.data.accessToken);
    //           alert('로그인 성공');
    //         })
    //         .catch(err => {
    //           return alert('로그인 실패');
    //         });
    //     }
    //   });
  };

  const imgPreview = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setImgPriviewFile(reader.result);
        resolve();
      };
    });
  };

  console.log(image);
  const userImgSubmit = e => {
    e.preventDefault();
    const userInfo = new FormData();

    const data = {
      userId: currnetId,
      id: fixId,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
    };

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    userInfo.append('image', image);
    userInfo.append('request', blob);

    for (let value of userInfo.values()) {
      console.log(value);
    }

    axios
      .patch(`/profile/profile/${userId}`, userInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getAccessToken(),
        },
      })
      .then(res => {
        console.log(res.data.code);
        console.log(res.data);
        alert('프로필 사진이 변경되었습니다');
        if (res.data.code === '1' && currnetId && password) {
          removeAccessToken();
          removeRefreshToken();
          axios
            .post('/login', { id: currnetId, password: password })
            .then(response => {
              if (response.data.code === '-1') {
                console.log(response);
                return alert('로그인 실패');
              }
              setRefreshToken(response.data.refreshToken);
              setAccessToken(response.data.accessToken);
              console.log(response.data.refreshToken);
              console.log(response.data.accessToken);
            })
            .catch(err => {
              return alert('로그인 실패');
            });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <MainContainer>
      <UserWrapper>
        <UserAvater>
          <form>
            <UserImage
              id="fileImageUpload"
              type="file"
              accept="image/*"
              onChange={e => {
                setImage(e.target.files[0]);
                imgPreview(e.target.files[0]);
              }}
              ref={imgRef}
            />
            <UserImageLabel htmlFor="fileImageUpload">
              {imgPriviewFile ? (
                <img src={imgPriviewFile} alt="userImage" />
              ) : (
                <img
                  src={imgFile ? `data:image/;base64, ${imgFile}` : userImage}
                  alt="userImage"
                />
              )}
            </UserImageLabel>
            <SaveButtonWrapper onClick={userImgSubmit}>
              <SaveButton />
            </SaveButtonWrapper>
          </form>
        </UserAvater>
        <UserInformations>
          <form>
            <UserInformationFixButton
              checkClick={fixButtonClick}
              onClick={() => setFixButtonClick(!fixButtonClick)}
            >
              {fixButtonClick ? <div onClick={submitButton}>완료</div> : '수정'}
            </UserInformationFixButton>
            {fixButtonClick ? (
              <>
                <UserBox>
                  <span>현재아이디: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={currnetId}
                    variant="standard"
                    onChange={e => setCurrentId(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>변경된아이디: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={fixId}
                    variant="standard"
                    onChange={e => setFixId(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>새 비밀번호: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue=""
                    variant="standard"
                    onChange={e => setPassword(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>전화번호: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={phoneNumber}
                    variant="standard"
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>주소: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={address}
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
          </form>
        </UserInformations>
      </UserWrapper>
      <JoinMissionWrapper>
        <JoinHeading>참여한 미션</JoinHeading>
        <JoinMissionlistWrapper>
          {joinMission?.map((data, index) => (
            <>
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
              {missionClick && (
                <MypageModal
                  postId={data.id}
                  setMissionClick={setMissionClick}
                  missionClick={missionClick}
                />
              )}
            </>
          ))}
        </JoinMissionlistWrapper>
      </JoinMissionWrapper>
      <CreateMissionWrapper>
        <CreateHeading>생성한 미션</CreateHeading>
        <CreateMissionlistWrapper>
          {createMission.map((data, index) => (
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 3rem;
  height: 3rem;
  margin-top: -13rem;
  left: 2rem;
`;

const UserImageLabel = styled.label`
  img {
    border: 6px solid black;
    width: 14rem;
    height: 14rem;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const UserImage = styled.input`
  visibility: hidden;
`;

const SaveButtonWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 100%;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 12rem;
  left: 11rem;
  cursor: pointer;

  :hover {
    background-color: #b0b0b0;
  }
`;

const SaveButton = styled(BiSave)`
  color: gray;
  font-size: 30px;
  :hover {
    color: #d1d1d1;
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
  top: 1.5rem;
  right: 1rem;
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
  width: 48vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  width: 48vw;
  flex-flow: row wrap;
  flex-grow: 2;
`;
