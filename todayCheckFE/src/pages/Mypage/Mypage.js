import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  getAccessKey,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  removeRefreshToken,
  removeAccessKey,
  setRefreshToken,
  setAccessKey,
} from '../../cookie/Cookie';
import MypageBox from '../../components/Mypage/MypageBox';
import TextField from '@mui/material/TextField';
import MypageModal from './Modal/MypageModal';
import { BiSave } from 'react-icons/bi';

const Mypage = () => {
  const [fixButtonClick, setFixButtonClick] = useState(false);
  const [missionData, setMissionData] = useState();
  const [joinMission, setJoinMission] = useState([]);
  const [createMission, setCreateMissionData] = useState([]);
  const [missionClick, setMissionClick] = useState(false);
  const [userId, setUserId] = useState(String(getAccessKey()));
  const accessToken = String(getAccessToken());

  // 사용자 프로필 정보
  const [currnetId, setCurrentId] = useState(userId);
  const [fixId, setFixId] = useState('');
  const [password, setPassword] = useState(missionData?.password);
  const [phoneNumber, setPhoneNumber] = useState(missionData?.phoneNumber);
  const [address, setAddress] = useState(missionData?.address);

  // 이미지
  const [imgPriviewFile, setImgPriviewFile] = useState();
  const [imgFile, setImgFile] = useState(missionData?.profileImages?.body);
  const [image, setImage] = useState();
  const imgRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`/profile/profile/${userId}`, {
        headers: { Authorization: `${accessToken}` },
      })
      .then(response => {
        console.log(response);
        setMissionData(response.data);
        setJoinMission(response.data.joinMission);
        setCreateMissionData(response.data.createMission);
        setCurrentId(response.data.id);
        setFixId(response.data.id);
        setPassword(response.data.password);
        setPhoneNumber(response.data.phoneNumber);
        setAddress(response.data.address);
        setImgFile(response.data.profileImages.body);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleErrorImg = e => {
    e.target.src = 'https://via.placeholder.com/150';
  };

  const submitButton = async () => {
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
    userInfo.append('request', blob);

    await axios
      .patch(`/profile/profile/${userId}`, userInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getAccessToken(),
        },
      })
      .then(res => {
        removeAccessKey();
        setAccessKey(fixId);
        setUserId(fixId);
        alert('프로필이 수정되었습니다');
        if (res.data.code === '1' && currnetId && fixId && password) {
          removeAccessToken();
          removeRefreshToken();
          axios
            .post('/login', { id: fixId, password: password })
            .then(response => {
              if (response.data.code === '-1') {
                console.log(response);
                return alert('로그인에 실패했습니다');
              }
              setRefreshToken(response.data.refreshToken);
              setAccessToken(response.data.accessToken);
            })
            .catch(err => {
              return alert('이미 존재하는 아이디입니다.');
            });
        }
      })
      .catch(err => alert('프로필 수정 실패'));
  };

  // 프로필 이미지 미리보기 기능
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

  // 프로필 이미지 저장 기능
  const userImgSubmit = e => {
    e.preventDefault();
    const userInfo = new FormData();
    userInfo.append('image', image);
    axios
      .patch(`/profile/profile/${userId}`, userInfo, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getAccessToken(),
        },
      })
      .then(res => {
        alert('프로필 사진이 변경되었습니다');
        if (res.data.code === '1' && currnetId && password) {
          removeAccessToken();
          removeRefreshToken();
          axios
            .post('/login', { id: currnetId, password: password })
            .then(response => {
              if (response.data.code === '-1') {
                return alert('로그인 실패');
              }
              setRefreshToken(response.data.refreshToken);
              setAccessToken(response.data.accessToken);
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
                <img
                  src={imgPriviewFile}
                  alt="userImage"
                  onError={handleErrorImg}
                />
              ) : (
                <img
                  src={`data:image/;base64, ${imgFile}`}
                  alt="userImage"
                  onError={handleErrorImg}
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
              {fixButtonClick ? (
                <div onClick={submitButton}>완료</div>
              ) : (
                <div onClick={getData}>수정</div>
              )}
            </UserInformationFixButton>
            {fixButtonClick ? (
              <UserBoxWrapper>
                <UserBox>
                  <span>현재아이디: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={fixId}
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
                    inputProps={{
                      maxLength: 10,
                    }}
                    onChange={e => setFixId(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>새 비밀번호: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue=""
                    variant="standard"
                    inputProps={{
                      maxLength: 15,
                    }}
                    onChange={e => setPassword(e.target.value)}
                  />
                </UserBox>
                <UserBox>
                  <span>전화번호: </span>
                  <TextField
                    id="standard-helperText"
                    defaultValue={phoneNumber}
                    variant="standard"
                    inputProps={{
                      maxLength: 11,
                    }}
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
              </UserBoxWrapper>
            ) : (
              <>
                <UserGreetings>
                  <UserName>
                    안녕하세요! <span>{fixId}</span>님
                  </UserName>
                </UserGreetings>

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
          {joinMission &&
            joinMission?.map((data, index) => (
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
          {createMission &&
            createMission?.map((data, index) => (
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-left: 15rem;
  background-color: #efefef;
  overflow: scroll;
`;

const UserWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 15rem;
  border-radius: 10px;
  background-color: #eff5f5;
  padding: 5rem;
  overflow: hidden;
`;

const UserAvater = styled.div`
  position: absolute;
  top: 13rem;
  width: 25%;
  margin-top: -13rem;
  left: 2rem;
`;

const UserImageLabel = styled.label`
  img {
    object-fit: cover;
    border: 1px solid rgba(149, 157, 165, 0.2);
    width: 13rem;
    height: 13rem;
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
  background-color: #eb6440;
  color: white;
  margin-top: 10px;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  width: 5rem;
  text-align: center;
  border-radius: 15px;
  padding: 6px 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.5s;

  :hover {
    background-color: #eb6440;
    opacity: 0.8;
  }
`;

// 수정 버튼 눌렀을 때
const UserBox = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    margin-right: 10px;
  }
`;

// 수정 버튼 누르기 전
const UserGreetings = styled.div`
  position: absolute;
  top: 40%;
  font-size: 2.9rem;
`;

const UserName = styled.p`
  font-size: 2.4rem;

  span {
    font-size: 3.4rem;
    color: #eb6440;
  }
`;

const UserSpan = styled.div`
  position: absolute;
  top: 60%;
  margin-left: 1.5rem;
  font-size: 1.6rem;
`;

const JoinMissionWrapper = styled.div`
  margin-top: 1rem;
`;

const JoinHeading = styled.h1`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: rgba(235, 100, 64, 0.6);
  color: white;
  padding-left: 2.5rem;
  font-size: 1.3rem;
  border-radius: 0.5rem 0 0 0;
`;

const JoinMissionlistWrapper = styled.div`
  margin-top: 1rem;
  width: 50rem;
  height: 10rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CreateMissionWrapper = styled.div`
  width: 50rem;
`;

const CreateHeading = styled.h1`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  background-color: rgba(235, 100, 64, 0.6);
  color: white;
  padding-left: 2.5rem;
  font-size: 1.3rem;
  border-radius: 0.5rem 0 0 0;
`;

const CreateMissionlistWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
  flex-wrap: wrap;
`;

const UserBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 30rem;
  margin-top: 3rem;
`;
