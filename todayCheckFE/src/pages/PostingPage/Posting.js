import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import axios from 'axios';
import PostingModal from './Modal/PostingModal';

const Posting = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/post`)
      .then(data => {
        console.log(data);
        // setPosts(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOpenModal = () => {
    setOpenModal(prev => !prev);
  };

  const testData = [
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 1,
    },
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 2,
    },
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 3,
    },
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 4,
    },
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 5,
    },
    {
      title: 'title test',
      userId: 'wanyoung',
      description: '이것은 런던에서 시작하여 지구 한바퀴를 돌아 ....',
      thumbnail: 'https://via.placeholder.com/350x200',
      date: '2022-11-10',
      postKey: 6,
    },
  ];

  return (
    <PostingWrapper>
      {testData.map((props, idx) => (
        <PostCard key={idx}>
          <img src={props.thumbnail} alt="thumbnail" />
          <PostCardContent>
            <PostTitle>{props.title}</PostTitle>
            <PostDesc>{props.description}</PostDesc>
          </PostCardContent>
          <PostUser>{props.userId}</PostUser>
        </PostCard>
      ))}
      {openModal && <PostingModal />}
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
  justify-content: center;
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
