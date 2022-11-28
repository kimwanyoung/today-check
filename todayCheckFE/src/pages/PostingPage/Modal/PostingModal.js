import styled from "styled-components";

const PostingModal = () => {
  const [postInfo, setPostInfo]= useState({
    title:'',
    userId:'',
    description:'',
    thumbnail:'',
    date:'',
    postKey:'',
  });

  const handlePostInfo = e => {
    const {name, value} = e.target;
    setPostInfo(prev => {
      const newInfo = {
        ...prev,
        name: value,
      }
    })
  }
  return (

  );
}

export default PostingModal;