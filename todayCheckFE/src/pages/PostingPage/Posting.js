import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import axios from 'axios';
import PostingModal from './Modal/PostingModal';
import { getAccessToken, setAccessToken } from '../../cookie/Cookie';
import { useNavigate } from 'react-router-dom';

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
  console.log(posts);

  return (
    <PostingWrapper>
      {posts?.map((props, idx) => (
        <PostCard
          key={idx}
          onClick={() => navigate('/postingDetail', { state: props })}
        >
          <img
            src={`data:image/;base64,${props.image.body}`}
            onError={onErrorImage}
            alt="thumbnail"
          />
          <PostCardContent>
            <PostTitle>{props.title}</PostTitle>
            <PostDesc>{props.description}</PostDesc>
          </PostCardContent>
          <PostUser>{props.writer}</PostUser>
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
  background-color: #eeeeff;
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
    width: 350px;
    height: 200px;
  }
`;

const PostCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
`;

const PostTitle = styled.h2`
  color: black;
  font-size: 1.3rem;
`;

const PostUser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding-left: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  bottom: 0;
`;

const PostDesc = styled.p`
  color: grey;
  margin-top: 1rem;
`;
