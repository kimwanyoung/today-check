import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Button, FilledInput } from '@mui/material';
import { getAccessToken } from '../../../cookie/Cookie';
import { useState } from 'react';
import axios from 'axios';

const PostingModal = () => {
  const [imageSrc, setImageSrc] = useState();
  const [postInfo, setPostInfo] = useState({
    title: '',
    description: '',
  });

  const encodeFileToBase64 = fileBlob => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = e => {
    let userForm = new FormData();
    userForm.append('img', imageSrc);

    axios
      .post(`/post/post`, {
        headers: {
          Authorization: getAccessToken(),
          'Content-type': 'application/json',
        },
        userForm,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handlePostInfo = e => {
    const { name, value } = e.target;
    setPostInfo(prev => {
      let newInfo = { ...prev };
      newInfo[name] = value;
      return newInfo;
    });
  };
  return (
    <ModalWrapper>
      <ModalBoxWrapper>
        <PostingTitle>글 쓰기</PostingTitle>
        <TitleBox>
          <InputLabel>글 제목</InputLabel>
          <TitleTextField
            id="outlined-input"
            label="Title"
            type="text"
            name="title"
            onChange={handlePostInfo}
          />
        </TitleBox>
        <ContentBoxWrapper>
          <InputLabel>본문</InputLabel>
          <ContentBox
            id="outlined-multiline-flexible"
            multiline
            rows={7}
            variant="filled"
            name="description"
            onChange={handlePostInfo}
          />
        </ContentBoxWrapper>
        <PostImageWrapper>
          <InputLabel>이미지</InputLabel>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={e => {
              setImageSrc(() => e.target.files[0]);
              encodeFileToBase64(e.target.files[0]);
            }}
          />
          {imageSrc && (
            <PostImage>
              <img src={imageSrc} alt="preview-images" />
            </PostImage>
          )}
        </PostImageWrapper>
        <SubmitWrapper>
          <SubmitBtn variant="outlined" color="success" onClick={handleSubmit}>
            Submit
          </SubmitBtn>
        </SubmitWrapper>
      </ModalBoxWrapper>
    </ModalWrapper>
  );
};

export default PostingModal;

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBoxWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 40rem;
  height: 45rem;
  border: 1px solid black;
  background-color: #fefefe;
  border-radius: 1rem;
  overflow-y: scroll;

  * {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleBox = styled.form`
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
  padding-left: 2rem;
`;

const PostingTitle = styled.h1`
  margin-left: 2rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: gray;
`;

const InputLabel = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TitleTextField = styled(TextField)`
  width: 90%;
  font-size: 1.2rem;
`;

const ContentBox = styled(TextField)`
  width: 90%;
  height: 30rem;
`;

const ContentBoxWrapper = styled.div`
  width: 100%;
  height: 15rem;
  margin-top: 4rem;
  padding-left: 2rem;
`;

const PostImageWrapper = styled.div`
  width: 100%;
  height: 20rem;
  margin-top: 1rem;
  padding-left: 2rem;
`;

const ImageInput = styled(FilledInput)`
  width: 90%;
`;

const PostImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70%;

  img {
    width: 10rem;
    height: 10rem;
  }
`;
const SubmitWrapper = styled.div`
  width: 100%;
  height: 5rem;
  padding-left: 2rem;
`;

const SubmitBtn = styled(Button)`
  width: 90%;
  height: 3rem;
`;
