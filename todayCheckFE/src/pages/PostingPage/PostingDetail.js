import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../../cookie/Cookie';
import { GrFormTrash } from 'react-icons/gr';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import UserImage from '../../components/UserImage';

const PostingDetail = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const location = useLocation();

  const getPostConfig = {
    method: 'get',
    url: `/post/onePost?number=${location.state.postKey}`,
  };

  useEffect(() => {
    axios(getPostConfig)
      .then(res => {
        setCommentList(res.data.comment);
      })
      .catch(err => console.log(err));
  }, []);
  const postConfig = {
    method: 'post',
    url: `/post/comment/${location.state.postKey}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAccessToken(),
    },
    data: comment,
  };

  const handleComment = e => {
    setComment(e.target.value);
  };

  const handleDelete = id => {
    const deleteConfig = {
      method: 'delete',
      url: `/post/comment/${id}`,
      headers: {
        Authorization: getAccessToken(),
      },
    };

    setCommentList(prev =>
      prev.filter(comment => {
        return comment.commentId !== id;
      })
    );

    axios(deleteConfig)
      .then(res => {
        alert('댓글 삭제완료!');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCommentList(prev => [...prev, comment]);
    axios(postConfig)
      .then(res => {
        setComment('');
        window.location.reload();
        if (res.data.code === '-5') {
          axios
            .get('/refreshToken')
            .then(data => {
              setAccessToken(data.data.message);
              axios(postConfig).then(res => {
                console.log(res);
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <DetailWrapper>
      <DetailContentWrapper>
        <Title>
          <p>{location.state.title}</p>
          <DateBox>
            <h3>{location.state.writer} </h3>
            <Date>{location.state.date}</Date>
          </DateBox>
        </Title>
        <PostingImage
          src={`data:image/;base64,${location.state.image.body}`}
          alt="post imag"
        />
        <UserInfo>
          <Name>글 작성자 : {location.state.writer}</Name>
          <Name>
            <Thumbs /> 추천 수 : {location.state.recommendation}
          </Name>
        </UserInfo>
        <Desc>
          <p>{location.state.description}</p>
        </Desc>
        <CommentTtitle>{commentList?.length}개의 댓글 </CommentTtitle>
        <Comment onSubmit={handleSubmit}>
          <CommentBox>
            {commentList?.map((prop, idx) => (
              <CommentContent key={idx}>
                <User>
                  <UserImage userId={prop.writer} />
                  <UserCommentInfo>
                    <p>{prop.writer}</p>
                    <h2>{prop.date}</h2>
                  </UserCommentInfo>
                </User>
                <UserCommentLine>
                  <UserComment>{prop.content}</UserComment>
                  <Trash onClick={() => handleDelete(prop.commentId)} />
                </UserCommentLine>
              </CommentContent>
            ))}
          </CommentBox>
          <CommentInput onChange={handleComment} value={comment} />
        </Comment>
      </DetailContentWrapper>
    </DetailWrapper>
  );
};

export default PostingDetail;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding-left: 15rem;
  background-color: #efefef;
  overflow-y: scroll;
`;

const DetailContentWrapper = styled.div`
  width: 40rem;
  height: 100%;
  background-color: #fefefe;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  p {
    font-size: 1.8rem;
  }
`;

const Date = styled.h3`
  font-size: 0.9rem;
  color: grey;
`;

const PostingImage = styled.img`
  width: 100%;
  height: 20rem;
  padding-bottom: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1rem 0 1rem;
`;

const Name = styled.p`
  font-size: 1rem;
  color: black;
`;

const Thumbs = styled(FaRegThumbsUp)``;

const Desc = styled.div`
  width: 100%;
  height: 3rem;
  padding: 0 1rem 0 1rem;
`;

const Comment = styled.form`
  position: relative;
  width: 100%;
  height: 30rem;
  padding-top: 3rem;
  background-color: white;
`;

const CommentInput = styled.input`
  position: absolute;
  top: 0;
  width: 90%;
  height: 3rem;
  margin-left: 2rem;
  font-size: 1rem;
  text-indent: 1rem;
  border: 0.5px solid lightgray;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  margin-top: 2rem;
`;

const CommentContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding-left: 1rem;
  padding-bottom: 2rem;
  padding-top: 1rem;
  border-bottom: 0.4px solid lightgray;
`;

const CommentTtitle = styled.h2`
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  color: grey;
`;

const Trash = styled(GrFormTrash)`
  width: 1.3rem;
  height: 1.3rem;
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  h3 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-right: 1rem;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  p {
    font-size: 1rem;
    font-weight: 700;
  }

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

const UserCommentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;

  h2 {
    font-size: 0.8rem;
    color: gray;
  }
`;

const UserComment = styled.p`
  margin-left: 2rem;
  font-size: 1rem;
  font-weight: 600;
`;

const UserCommentLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;
