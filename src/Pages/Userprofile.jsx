import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ProfilePicture from "../Components/ProfilePicture";
import { PencilSquare } from "react-bootstrap-icons";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Userprofile(props) {
    const [user, setUser] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
        /*--------Get User Data--------*/
        const getUserData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/users/me/", {
              withCredentials: true,
            });
            setUser(response.data.user);
            // console.log(response.data.user._id);
          } catch (error) {
            console.log(error);
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
  const uploadAvatar = async () => {
    try {
      if (!selectedFile) {
        console.log("Please select a file.");
        return;
      }

      // Create a FormData object and append the selected file to it
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await axios.post(
        "http://localhost:3000/users/me/avatar",
        formData,
        { withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for FormData
            },
        }   
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadAvatar();
  };

      /*--------Get User Avatar--------*/

          const getUserAvatar = async () => {
              try {
              if (!user._id) {
                return;
                }
              const response = await axios.get(`http://localhost:3000/users/${user._id}/avatar`, {
                responseType: 'arraybuffer',
                  withCredentials: true,
                });
                console.log(response);
                // Convert the binary data to a Blob
                const blob = new Blob([response.data], { type: 'image/png' });
                const profilePicUrl = URL.createObjectURL(blob); 
                setProfilePic(profilePicUrl);
                console.log(profilePicUrl)
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {        
          getUserAvatar();
      },[user._id])

  return (
    <div className="">
      <Header {...props} />
      <div className="px-3 px-sm-5">
        <div className="mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <ProfilePicture
              imageDimension={{ width: "10rem", height: "10rem" }}
              imageSource={
                profilePic ? profilePic : "./src/assets/images/pepega.png"
              }
              thumbnail={true}
            />
            <img src={profilePic}/>
            <div className="">
              <Form onSubmit={handleSubmit}>
                <Button type="submit" onSubmit={handleSubmit}>
                  Save changes
                </Button>
                <Button>
                  <PencilSquare />
                </Button>
              </Form>
            </div>
          </div>
          <div className="d-flex flex-column">
            <span className="fs-1 fw-bold">{user?.name}</span>
            <span className="">{user?.email}</span>
          </div>
        </div>
        <div className="py-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="profilepicture" className="mb-3">
              <Form.Label>Upload New Profile Picture</Form.Label>
              <Form.Control
                accept=".jpg,.jpeg,.png"
                type="file"
                onChange={(e) => handleProfilePicture(e)}
              />
            </Form.Group>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Userprofile;
