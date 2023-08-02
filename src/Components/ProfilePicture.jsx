import axios from "axios";
import { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';

function ProfilePicture({ imageDimension, imageSource, thumbnail }) {
  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
    /*--------Get User Data--------*/
    const getUserData = async () => {
      setIsLoading(true);
      try {
  
        const response = await axios.get("http://localhost:3000/users/me/", {
          withCredentials: true,
        });
        // console.log(response.data.user)
        setUser(response.data.user);
        setIsError(false);
        // console.log(response.data.user._id);
        setIsLoading(false)
      } catch (error) {
        // console.log(error);
        setIsError(true);
        setIsLoading(false)
        // setResponseMessage(error.response.data.Error);
      }
    };
    useEffect(() => {
      getUserData();
    }, []);
    /*--------Get User Avatar--------*/
    const getUserAvatar = async () => {
      setIsLoading(true);
      try {
        // To wait for user data to be fetched to use `user._id` to get avatar
        if (!user._id) {
          return;
        }
        const response = await axios.get(
          `http://localhost:3000/users/${user._id}/avatar`,
          {
            responseType: "arraybuffer",
            withCredentials: true,
          }
        );
        // Convert the binary data to a Blob
        const blob = new Blob([response.data], { type: "image/png" });
        const profilePicUrl = URL.createObjectURL(blob);
        setProfilePic(profilePicUrl);
        // console.log(profilePic);
        setIsLoading(false); 
      } catch (error) {
        setProfilePic("./src/assets/images/pepega.png");
        setIsLoading(false)
      }
    };
      useEffect(() => {
    getUserAvatar();
    }, [user._id]);
  return (
    <div className="p-0">
      <Image src={profilePic} roundedCircle style={imageDimension} thumbnail={thumbnail ? true : false} />
    </div>
  );
}

export default ProfilePicture;