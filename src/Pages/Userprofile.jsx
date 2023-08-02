import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Spinner} from "react-bootstrap";
import ProfilePicture from "../Components/ProfilePicture";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Userprofile(props) {
  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age || '',
    password: user.password || ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  /*--------Clear Error Message--------*/
  useEffect(() => {
    let timer;
    if (responseMessage) {
      timer = setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [responseMessage]);

  /*--------Get User Data--------*/
  const getUserData = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get("http://localhost:3000/users/me/", {
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsError(false);
      // console.log(response.data.user._id);
      setIsLoading(false)
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsLoading(false)
      setResponseMessage(error.response.data.Error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleProfilePicture = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      //   setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  /*--------Upload Avatar--------*/
  const handleUploadAvatar = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      if (!selectedFile) {
        // console.log("Please select a file.");
        setIsError(true);
        setResponseMessage("Please select a file!");
        setIsLoading(false);
        return;
      }

      // Create a FormData object and append the selected file to it
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      
      const response = await axios.post(
        "http://localhost:3000/users/me/avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for FormData
          },
        }
      );
      // console.log(response.data.message);
      setIsError(false);
      setResponseMessage(response.data.message);
      getUserAvatar();
      setIsLoading(false);
      setIsEditMode(false);
    } catch (error) {
      // console.log(error.response.data.error);
      setIsError(true);
      setResponseMessage(error.response.data.error);
      setIsEditMode(true);
    }
  };

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
      setIsLoading(false); 
    } catch (error) {
      setProfilePic("./src/assets/images/pepega.png");
      setIsLoading(false);
    }
  };
    useEffect(() => {
  getUserAvatar();
  }, [user._id]);

  /*---------Update user data---------*/
const handleUserDataUpdate = async (event) => {
  setIsLoading(true)
  event.preventDefault();
    try {
      const updatedData = {}
      // Check if each property in formData has a value and add it to updatedData
    if (formData.name.trim() !== "") {
      updatedData.name = formData.name;
    }
    
    if (formData.age.trim() !== "") {
      updatedData.age = formData.age;
    }
    
    if (formData.password.trim() !== "") {
      updatedData.password = formData.password;
    }
    // Check if there are any changes to be updated
    if (Object.keys(updatedData).length === 0) {
      // console.log("No changes made.");
      setIsError(true);
      setIsLoading(false);
      setResponseMessage("No changes made!");
      return;
    }
      const response = await axios.patch("http://localhost:3000/users/me", updatedData, {
        withCredentials: true,
      });
      console.log(response);
      setFormData({
        name: '',
        age: '',
        password: ''
      })
      getUserData();
      setIsError(false)
      setIsLoading(false)
      // console.log(response.data.message)
      setResponseMessage(response.data.message)
    } catch (error) {
        // console.log(error.response.data.error);
        setIsError(true)
        setIsLoading(false);
        setResponseMessage(error.response.data.error)
    }
  };

  const handleDeleteProfilePicture = async () => {
    setIsLoading(true)
    try {
      if (!user._id) {
        return;
      }
      await axios.delete(`http://localhost:3000/users/me/avatar`, {
          withCredentials: true,
        });
        setProfilePic("./src/assets/images/pepega.png");
        setIsError(true)
        setIsLoading(false)
        setResponseMessage("Profile picture deleted successfully")
      } catch (error) {
      setIsError(true)
      setIsLoading(false)
      setResponseMessage("Profile picture failed to delete")      
    }
  }


  return (
    <div className="">
      {
        isLoading &&
            <div className="loader-profile d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed">
              <Spinner animation="border" role="status" >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            }
               <Header {...props}/>
      {/* Show loader if loading state is true */}
      <div className="px-3 px-sm-5">
        <div className="mt-5">
          <div className="d-flex align-items-end">
            <ProfilePicture
              imageDimension={{ width: "10rem", height: "10rem" }}
              imageSource={
                profilePic ? profilePic : "./src/assets/images/pepega.png"
              }
              thumbnail={true}
            />

            <Button
              type="button"
              className="rounded-circle position-absolute"
              disabled={isEditMode}
            >
              <PencilSquare onClick={() => setIsEditMode(true)} />
            </Button>
          </div>

          <div className="d-flex flex-column">
            <span className="fs-1 fw-bold">{user?.name}</span>
            <span className="">{user?.email}</span>
          </div>

          {responseMessage && (
            <div
              className={
                isError
                  ? "text-danger d-flex justify-content-center pt-5"
                  : "text-success d-flex justify-content-center pt-5"
              }
            >
              <h6>{responseMessage}</h6>
            </div>
          )}
          
        </div>
        <div className="py-5">
          {isEditMode && (
            <Form onSubmit={handleUploadAvatar} className="mb-5">
              <Form.Group controlId="profilepicture" className="mb-3">
                <Form.Label>Upload New Profile Picture</Form.Label>
                <Form.Control
                  accept=".jpg,.jpeg,.png"
                  type="file"
                  onChange={(e) => handleProfilePicture(e)}
                />
              </Form.Group>

              <Form.Group>
                <Button type="submit" onSubmit={handleUploadAvatar}>
                  Save changes
                </Button>
                <Button
                  type="button"
                  className="btn-secondary ms-3"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancle
                </Button>
              </Form.Group>
            </Form>
          )}

          <Form onSubmit={handleUserDataUpdate}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="name" placeholder={user?.name} value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" placeholder={user?.age} value={formData.age} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter New Password" value={formData.password} onChange={handleChange} />
            </Form.Group>
              <Form.Group>
                <Button type="submit" onSubmit={handleUserDataUpdate}>
                  Save changes
                </Button>
            </Form.Group>
          </Form>
          <Button type="button" className="btn-danger  mt-4"  onClick={handleDeleteProfilePicture}>
              <Trash3 className="pb-1"/>&nbsp;&nbsp;&nbsp;&nbsp;Delete Profile Picture
            </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Userprofile;