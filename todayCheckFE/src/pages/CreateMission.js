import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { FilledInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../cookie/Cookie';

const CreateMission = () => {
  const navigate = useNavigate();
  const [missionInfo, setMissionInfo] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
  });
  const [image, setImage] = useState();

  const handleInputChange = e => {
    const { name, value } = e.target;
    const newObj = missionInfo;
    newObj[name] = value;
    setMissionInfo(newObj);
  };

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    const blob = new Blob(
      [
        JSON.stringify({
          title: missionInfo.title,
          content: missionInfo.title,
          startDate: missionInfo.startDate + 'T12:00:00',
          endDate: missionInfo.endDate + 'T12:00:00',
          thumbnailUrl: '',
        }),
      ],
      { type: 'application/json' }
    );

    formData.append('data', blob);
    formData.append('multipartFile', image);

    const postConfig = {
      method: 'post',
      url: '/mission',
      headers: {
        Authorization: getAccessToken(),
      },
      data: formData,
    };

    axios(postConfig)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <CreateWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <p>미션 생성하기</p>
        <CreateLabel>미션 제목</CreateLabel>
        <TextArea
          label="미션 제목"
          variant="outlined"
          name="title"
          onChange={handleInputChange}
        />
        <CreateLabel>미션 내용</CreateLabel>
        <TextArea
          label="미션 내용"
          variant="outlined"
          name="content"
          onChange={handleInputChange}
        />
        <CreateLabel>시작 일자</CreateLabel>
        <TextArea
          variant="outlined"
          type="date"
          name="startDate"
          onChange={handleInputChange}
        />
        <CreateLabel>종료 일자</CreateLabel>
        <TextArea
          variant="outlined"
          type="date"
          name="endDate"
          onChange={handleInputChange}
        />
        <CreateLabel>이미지 업로드</CreateLabel>
        <ImageInput
          type="file"
          accept="image/*"
          name="multipartFiles"
          onChange={handleImage}
        />
        <SubmitBtn type="submit">생성!</SubmitBtn>
      </FormWrapper>
    </CreateWrapper>
  );
};

export default CreateMission;

const CreateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 15rem;
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
`;

const FormWrapper = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 60%;
  padding-top: 1rem;
  padding-left: 7%;
  background-color: white;

  p {
    font-size: 1.7rem;
    color: #eb6440;
  }
`;

const CreateLabel = styled.label`
  font-size: 1.3rem;
  color: black;
  margin-top: 1rem;
`;

const TextArea = styled(TextField)`
  width: 80%;
  margin-top: 0.3rem !important;
`;

const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1rem;
  width: 80%;
  height: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #eb6440;
  font-size: 1.3rem;
  color: white;
`;

const ImageInput = styled(FilledInput)`
  width: 80%;
`;
