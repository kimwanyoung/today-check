import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import { getAccessToken, setAccessToken } from '../../cookie/Cookie';
import { GrFormTrash } from 'react-icons/gr';
import { useEffect } from 'react';

const PostingDetail = () => {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const location = useLocation();
  console.log(location.state);

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

    axios(deleteConfig)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios(postConfig)
      .then(res => {
        console.log(res);
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
    setCommentList(prev => {
      return [...prev, comment];
    });
    setComment('');
  };
  return (
    <DetailWrapper>
      <DetailContentWrapper>
        <Title>
          <p>{location.state.title}</p>
          <Date>{location.state.date}</Date>
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
        <Comment onSubmit={handleSubmit}>
          <CommentTtitle>댓글 수 {location.state.comment.length}</CommentTtitle>
          <CommentBox>
            {location.state.comment.map((prop, idx) => (
              <CommentContent key={idx}>
                {prop.content}
                <Trash onClick={() => handleDelete(prop.commentId)} />
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
  background-color: #eeeeff;
  overflow-y: scroll;
`;

const DetailContentWrapper = styled.div`
  width: 40rem;
  background-color: #fefefe;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Date = styled.p`
  font-size: 0.9rem;
  color: grey;
`;

const PostingImage = styled.img`
  width: 100%;
  height: 20rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Comment = styled.form`
  position: relative;
  width: 100%;
  height: 30rem;
  background-color: white;
`;

const CommentInput = styled.input`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  text-indent: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
`;

const CommentContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding-left: 1rem;
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
  color: red;
`;
