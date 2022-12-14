import { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Button, FilledInput } from '@mui/material';
import { getAccessToken, setAccessToken } from '../../../cookie/Cookie';
import axios from 'axios';

const PostingModal = ({ setOpenModal }) => {
  const [image, setImage] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  const handlDescription = e => {
    setDescription(e.target.value);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    const postInfo = new FormData();
    const json = {
      title: title,
      description: description,
    };
    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
    postInfo.append('request', blob);
    postInfo.append('image', image);

    const postConfig = {
      method: 'post',
      url: '/post/post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getAccessToken(),
      },
      data: postInfo,
    };

    axios(postConfig)
      .then(res => {
        alert('글 쓰기 완료!');
        setOpenModal(prev => !prev);
        if (res.data.code === '-5') {
          axios
            .get('/refreshToken')
            .then(res => {
              setAccessToken(res.data.message);
              axios(postConfig).then(res => {
                alert('글 쓰기 완료!');
                setOpenModal(prev => !prev);
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
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
            onChange={handleTitle}
          />
        </TitleBox>
        <ContentBoxWrapper>
          <InputLabel>본문</InputLabel>
          <ContentBox
            id="outlined-multiline-flexible"
            multiline
            rows={7}
            variant="filled"
            onChange={handlDescription}
          />
        </ContentBoxWrapper>
        <PostImageWrapper>
          <InputLabel>이미지</InputLabel>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={e => {
              setImage(e.target.files[0]);
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

const ModalBoxWrapper = styled.form`
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

const TitleBox = styled.div`
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
