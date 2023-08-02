// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProfilePicture from './ProfilePicture';
import MenuList from './MenuList';

function SidebarMenu({ show, toggleShow, handleClose, imageSource, profilePic }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const toggleShow = () => setShow((s) => !s);
  // console.log({ show, toggleShow, handleClose, imageSource, profilePic })

  return (
    <div id="sidebar">
      <Button className="p-0 border-0 rounded-5" variant="primary" onClick={toggleShow} >
        <div className='rounded-circle bg-primary' style={{ padding: "3px" }}>
          <ProfilePicture onClick={toggleShow} imageDimension={{ width: "45px", height: "45px" }}/>
        </div>
      </Button>
      <Offcanvas className="" placement='start' show={show} onHide={handleClose} backdrop={false} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className='d-flex align-items-center'>
            <div className='border rounded-circle p-1'>
              <ProfilePicture imageDimension={{ width: "45px", height: "45px" }} imageSource={profilePic ? profilePic : imageSource} />
            </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <MenuList />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SidebarMenu;