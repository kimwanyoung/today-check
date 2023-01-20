import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios';
import { setAccessToken, getAccessToken } from '../../../cookie/Cookie';

const MypageModal = ({ missionClick, setMissionClick, postId }) => {
  const imgFile = useRef();
  const [imageFile, setImageFile] = useState('');
  const [img, setImg] = useState('');

  const saveImgFile = () => {
    const file = imgFile.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(resolve => {
      reader.onload = () => {
        setImageFile(reader.result);
        resolve();
      };
    });
  };

  const handleClickUpload = () => {
    imgFile.current.click();
  };

  const handleSubmit = () => {
    const postInfo = new FormData();
    postInfo.append('image', imgFile.current.files[0]);
    const postConfig = {
      method: 'post',
      url: `/participant/certification/${postId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getAccessToken(),
      },
      data: postInfo,
    };

    axios(postConfig)
      .then(res => {
        alert('인증 이미지 업로드 완료!');
        if (res.data.code === '-5') {
          axios
            .get('/refreshToken')
            .then(res => {
              setAccessToken(res.data.message);
              axios(postConfig).then(res => {
                alert('인증 이미지 업로드 완료!');
              });
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <MypageModalWrapper>
      <ModalBox>
        <CloseButton onClick={() => setMissionClick(!missionClick)} />
        <ModalTitle>미션 인증 이미지</ModalTitle>
        <form>
          <ModalImage
            id="fileUpload"
            type="file"
            accept="image/*"
            ref={imgFile}
            onChange={e => {
              saveImgFile();
              setImg(e.target.files[0]);
            }}
          />
          <ImageLabel onClick={handleClickUpload}>
            {img ? (
              <img src={imageFile} alt="이미지 업로드" />
            ) : (
              <div>이미지 업로드</div>
            )}
          </ImageLabel>
          <UploadButton onClick={handleSubmit}>제출하기</UploadButton>
        </form>
      </ModalBox>
    </MypageModalWrapper>
  );
};

export default MypageModal;

const MypageModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalBox = styled.div`
  position: absolute;
  right: 90px;
  top: 210px;
  z-index: 1;
  width: 300px;
  height: 320px;
  border-radius: 5%;
  background-color: white;
`;

const ModalTitle = styled.div`
  margin-top: 1.2rem;
  margin-left: 1.2rem;
  font-size: 1rem;
`;

const ModalImage = styled.input`
  visibility: hidden;
`;

const ImageLabel = styled.label`
  cursor: pointer;
  width: 15rem;
  height: 13rem;

  img {
    display: block;
    width: 15rem;
    height: 13rem;
    margin: 0 auto;
    border-radius: 5%;
  }

  div {
    border: 1px dashed black;
    margin: 0 auto;
    width: 15rem;
    height: 13rem;
    border-radius: 5%;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      background-color: #b2b2b2;
      border: none;
      color: white;
    }
  }
`;

const CloseButton = styled(AiOutlineCloseCircle)`
  position: absolute;
  right: 1rem;
  top: 0.8rem;
  font-size: 1.7rem;
  cursor: pointer;
`;

const UploadButton = styled.div`
  background-color: #eb6440;
  color: white;
  width: 15rem;
  height: 2rem;
  border-radius: 5px;
  margin: 0.7rem auto;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    background-color: #eb6440;
  }
`;
