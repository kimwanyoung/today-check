import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import axios from 'axios';
import PostingModal from './Modal/PostingModal';
import { getAccessToken, setAccessToken } from '../../cookie/Cookie';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';

const Posting = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `/post/wholePost?page=0&size=20&sort=postKey,desc
      `
      )
      .then(res => {
        setPosts(res.data);

        if (res.data.code === '-5') {
          axios
            .get('/refreshToken')
            .then(data => {
              setAccessToken(data.data.message);
              axios
                .get('/post/wholePost?page=0&size=20&sort=postKey,desc')
                .then(res => {
                  setPosts(res.data);
                });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleOpenModal = () => {
    setOpenModal(prev => !prev);
  };

  const onErrorImage = e => {
    e.target.src = 'https://via.placeholder.com/350x200';
  };

  return (
    <PostingWrapper>
      {posts?.map((props, idx) => (
        <PostCard
          key={idx}
          onClick={() => navigate('/postingDetail', { state: props })}
        >
          <img
            src={`data:image/;base64,${props?.image?.body}`}
            onError={onErrorImage}
            alt="thumbnail"
          />
          <PostCardContent>
            <PostTitle>{props?.title}</PostTitle>
            <PostDesc>{props?.description}</PostDesc>
            <PostDate>{props?.date.slice(0, 10)}</PostDate>
          </PostCardContent>
          <PostUser>
            <p>{props?.writer}</p>
            <p>
              <AiFillHeart />
              {props?.recommendation}
            </p>
          </PostUser>
        </PostCard>
      ))}
      {openModal && <PostingModal setOpenModal={setOpenModal} />}
      <AddIcon onClick={handleOpenModal} />
    </PostingWrapper>
  );
};

export default Posting;

const AddIcon = styled(GrAddCircle)`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  width: 3rem;
  height: 3rem;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: rotate(45deg);
  }
`;

const PostingWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  padding-left: 15rem;
  background-color: #efefef;
  overflow: scroll;
`;

const PostCard = styled.div`
  position: relative;
  height: 24rem;
  margin: 1rem;
  border-radius: 0.3rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: white;
  transition: all 0.5s ease-in-out;
  :hover {
    transform: translateY(-1rem);
  }
  img {
    width: 23rem;
    height: 10rem;
  }
`;

const PostCardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
  height: 10rem;
  overflow-y: hidden;
`;

const PostTitle = styled.h2`
  color: black;
  font-size: 1.3rem;
`;

const PostUser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: 700;
  bottom: 0;

  p {
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5rem;
      margin-bottom: 0.2rem;
    }
  }
`;

const PostDesc = styled.p`
  color: grey;
  margin-top: 1rem;
`;

const PostDate = styled.p`
  position: absolute;
  color: grey;
  bottom: 0;
`;
