import { useState, useEffect } from 'react';
import axios from 'axios';

const UserImage = ({ userId }) => {
  const [userImage, setUserImage] = useState('');

  const handleImgError = e => {
    e.target.src = 'https://via.placeholder.com/150';
  };

  useEffect(() => {
    axios
      .get(`/profile/profile/${userId}`)
      .then(res => {
        console.log(res.data);
        setUserImage(res.data.profileImages.body);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <img
      src={`data:image/;base64,${userImage}`}
      alt="userImage"
      onError={handleImgError}
    />
  );
};

export default UserImage;
