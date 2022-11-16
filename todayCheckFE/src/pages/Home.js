import styled from 'styled-components';
import Navigation from '../components/Navigation';

// images
import codingTest from '../images/codingTest.png';
import dog from '../images/dog.jpeg';
import englishStudy from '../images/englishStudy.jpeg';
import cat from '../images/cat.jpeg';

//components
import HomeBox from '../components/home/homeBox';

// 예시 데이터 추후 삭제할 예정
const homeData = [
  {
    postPicture: codingTest,
    adminName: '이예진',
    adminPicture: dog,
    participants: 3,
    postTitle: '코딩테스트 공부하실 분',
    postContent: '코딩테스트 매일 하나씩 풀 예정입니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
  {
    postPicture: englishStudy,
    adminName: '홍길동',
    adminPicture: cat,
    participants: 10,
    postTitle: '영어 스터디 모집합니다!!!',
    postContent: '영어 공부 하루에 한시간씩 하실 분 구합니다.',
  },
];

const Home = () => {
  return (
    <MainContainer>
      <RightSection>
        <HomeBoxContainer>
          {homeData.map((data, index) => (
            <HomeBox
              key={index}
              postPicture={data.postPicture}
              adminName={data.adminName}
              adminPicture={data.adminPicture}
              participants={data.participants}
              postTitle={data.postTitle}
              postContent={data.postContent}
            />
          ))}
        </HomeBoxContainer>
      </RightSection>
    </MainContainer>
  );
};

export default Home;

const MainContainer = styled.div`
  display: flex;
  width: 83vw;
  margin-left: 16vw;
  background-color: #eeeeff;
`;

const RightSection = styled.div`
  display: fixed;
  left: 225px;
  width: 100%;
`;

const HomeBoxContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  justify-content: space-evenly;
  align-content: center;
  flex-flow: row wrap;
  flex-grow: 2;
`;
